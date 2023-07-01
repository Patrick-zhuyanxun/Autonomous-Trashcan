from django.shortcuts import render
import re
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import User_Serializer, TrashCan_Serializer, TodoWork_Serializer
from .models import User, TrashCan, TodoWork
from . import tools
import time


@api_view(['GET'])
def api_overview(request):
    api_urls = {
        '一鍵清除': '(POST)/total_delete',
        '注意事項':{
            'data的部分': '指令有要的再寫就好',
            '程式post寫法': 'r = request.post(url+"指令", data = {})',
            '程式get寫法': 'r = request.get(url+"指令", data = {})',
            "ex": "r = requests.get(url+'/get_work')",
            '瀏覽器寫法': 'url/指令 不用打get或post',
            '瀏覽器注意事項': '沒辦法直接打data，所以用瀏覽器大多是直接看xxx_list',
        },
        'user相關':{
            '刪除指定使用者': '(POST)/user_delete',
            '更新使用者、垃圾桶資訊': '(POST)/user_update',
            '丟的垃圾量排名': '(GET)/get_rank',
            '取得/創建指定user': '(GET)/get_user',
        },
        'trash can相關':{
            '更新垃圾桶狀態': '(POST)/trash_update',
            '刪除指定垃圾桶': '(POST)/trash_delete',
        },
        '代辦工作相關':{
            '新增代辦工作至清單': '(POST)/upload_work',
            '清除所有工作': '(POST)/rearrange_work',
            '回傳下個該做工作': '(GET)/get_work',
        },
        'debug用(能顯示在瀏覽器中)':{
            '列出所有使用者': '(GET)/user_list',
            '列出所有垃圾桶': '(GET)/trash_list',
            '列出所有代辦工作': '(GET)/work_list',
        },
    }
    return Response(api_urls)

# arrange user by weight
@api_view(['GET'])
def get_rank(request):
    user = User.objects.all()
    serializer = User_Serializer(user, many=True)
    ranking = tools.user_rank(serializer)
    return Response(ranking)

@api_view(['GET'])
def get_trash_state(request):
    trash = TrashCan.objects.get(can_id=request.data["can_id"])
    serializer = TrashCan_Serializer(trash)
    state = {"state": serializer.data["state"]}
    return Response(state)

@api_view(['GET'])
def get_user(request):
    # if user exists
    try:
        user = User.objects.get(user_id=request.data["user_id"])
        serializer = User_Serializer(user)

    # if user does not exist -> create user
    except:
        register_data = tools.create_user(request)
        serializer = User_Serializer(data=register_data)
        if serializer.is_valid():
            serializer.save()

    trash = TrashCan.objects.all()
    serializer_trash = TrashCan_Serializer(trash, many=True)
    cap = tools.calculate_capacity(serializer_trash)  # get percentage of trashcan's capacity
    output = serializer.data  # serializer.data : user's detail
    output["can_cap"] = cap
    return Response(output)  # return user's detail and trashcan capacity

# when the trashcan finishes the current work, socket-server would send this api to get the next work
@api_view(['GET'])
def get_work(request):
    serializer_work = TodoWork_Serializer(TodoWork.objects.all(), many=True)
    # go to next position
    if (len(serializer_work.data) != 0):
        # get the first work and check the trashcan's state
        work = TodoWork.objects.get(id=1)
        sent_can_id = []
        serializer = TodoWork_Serializer(work)
        if (serializer.data["go"]):  # True
            can = re.split('\,', serializer.data["can_id"])  # get can_id
            for i in can:
                # update trashcan's state & position
                trash = TrashCan.objects.get(can_id=i)
                trash_database = TrashCan_Serializer(trash)
                trashcan_update = trash_database.data
                trashcan_update["state"] = "moving"
                trashcan_update["position"] = serializer.data["position"]  # position of destination
                serializer_trash = TrashCan_Serializer(instance=trash, data=trashcan_update)
                if serializer_trash.is_valid():
                    serializer_trash.save()

                sent_can_id.append(int(i))
                b = re.split('\[|\]|\,', serializer.data["position"])
                #b = re.split('([\"\'])', serializer.data["position"])
                sent_position = [float(b[1]), float(b[2])]  # x, y

            #rearrange
            work_database = TodoWork_Serializer(TodoWork.objects.all(), many=True)
            todowork_update = tools.rearrange(work_database)
            for i in range(len(todowork_update) - 1):
                work = TodoWork.objects.get(id=i + 1)
                # save the todowork list
                serializer_work = TodoWork_Serializer(instance=work, data=todowork_update[i])
                if serializer_work.is_valid():
                    serializer_work.save()
            work_ = TodoWork.objects.get(id=len(work_database.data))
            work_.delete()  # delete the last work(after rearrange, todowork[n] = todowork[n-1])
            sent_can_id = list(set(sent_can_id))
            send_data={"go":serializer.data["go"], "can_id":sent_can_id, "position":sent_position, "user_id":serializer.data["user_id"], "home":False}
            #send_data = {"go": serializer.data["go"], "can_id": [1], "position": sent_position,
            #             "user_id": serializer.data["user_id"]}
        return Response(send_data)

    # go home (finish all works)
    else:
        can_id = []
        serializer_trash = TrashCan_Serializer(TrashCan.objects.all(), many=True)
        # check all trashcans' state
        for i in range(len(serializer_trash.data)):
            trash = TrashCan.objects.get(can_id=i + 1)
            serializer_trash = TrashCan_Serializer(trash)
            if ((serializer_trash.data["position"] != "[0.0,0.0]" )and(serializer_trash.data["state"] == "stop")):  # if trashcan is stop and is not at [0,0](home)
                can_id.append(int(i+1))
                trashcan_update = serializer_trash.data
                trashcan_update["position"] = "[0.0,0.0]"
                trashcan_update["state"] = "moving"
                serializer_trash = TrashCan_Serializer(instance=trash, data=trashcan_update)
                if serializer_trash.is_valid():
                    serializer_trash.save()
        # no trashcan need to go home
        if (can_id == []):
            send_data = {"go": False, "can_id": can_id, "position": [0.0, 0.0], "user_id": "", "home": False}
        # let specified trashcan go home
        else:
            send_data = {"go": True, "can_id": can_id, "position": [0.0, 0.0], "user_id": "", "home": True}
            #send_data = {"go": True, "can_id": [1], "position": [0.,0.],"user_id": "", "home": True}
        return Response(send_data)

# reset for default value
@api_view(['POST'])
def total_delete(request):
    # delete all user
    serializer_user = User_Serializer(User.objects.all(), many=True)
    if (len(serializer_user.data) != 0 ):
        for i in range(len(serializer_user.data)):
            user = User.objects.get(user_id=str(serializer_user.data[i]["user_id"]))
            user.delete()
    # reset trashcan state and position
    serializer_trash = TrashCan_Serializer(TrashCan.objects.all(), many=True)
    for i in range(len(serializer_trash.data)):
        trash = TrashCan.objects.get(can_id=i+1)
        serializer_trash = TrashCan_Serializer(trash)
        trash_ = tools.create_trash(serializer_trash)
        serializer = TrashCan_Serializer(instance=trash, data=trash_)
        if serializer.is_valid():
            serializer.save()
    # delete all work
    serializer_work = TodoWork_Serializer(TodoWork.objects.all(), many=True)
    if (len(serializer_work.data) != 0):
        for i in range(len(serializer_work.data)):
            work = TodoWork.objects.get(id=str(serializer_work.data[i]["id"]))
            work.delete()
    return Response({"ack":True})


# update trashcan's status and update TODOWORK
@api_view(['POST'])
def trash_update(request):
    flag = True
    trash = TrashCan.objects.get(can_id=str(request.data["can_id"]))
    trash_database = TrashCan_Serializer(trash)
    trashcan_update, update_todowork = tools.trash_update(request, trash_database)
    serializer_trash = TrashCan_Serializer(instance=trash, data=trashcan_update)
    if serializer_trash.is_valid():
        serializer_trash.save()

    if (update_todowork):
        try:
            # check trashcans' state which is in the first TODOWORK
            work = TodoWork.objects.get(id=1)
            work_database = TodoWork_Serializer(work)
            can = re.split('\,', work_database.data["can_id"])
            for i in can:
                trash = TrashCan.objects.get(can_id=int(i))
                trash_database = TrashCan_Serializer(trash)
                if (trash_database.data["state"] != "stop"):  # trashcan is moving or opening, cannot execute this work
                    flag = False
            if flag:  # all trashcans are stop
                new_data = work_database.data
                new_data["go"] = True  # execute the first wirk
                serializer = TodoWork_Serializer(instance=work, data=new_data)
                if serializer.is_valid():
                    serializer.save()
        except:
            pass
    return Response({"ack":True}) #Response(serializer_trash.data)

# user adds new TODOWORK
@api_view(['POST'])
def upload_work(request):
    trash = TrashCan.objects.all()
    trash_database = TrashCan_Serializer(trash, many=True)
    best_can = tools.find_best_TrashCan(trash_database, request)  # find the most suitable trashcan
    id_len = len(TodoWork_Serializer(TodoWork.objects.all(), many=True).data)+1
    register_data = tools.create_work(request, best_can,trash_database, id_len)  # create work
    serializer = TodoWork_Serializer(data=register_data)
    if serializer.is_valid():
        serializer.save()
    return Response({"ack":True})

# update weight, capacity, calculate coins and return data
@api_view(['POST'])
def user_update(request):
    user = User.objects.get(user_id=request.data["user_id"])
    user_database = User_Serializer(user)
    trash = TrashCan.objects.get(can_id=str(request.data["can_id"]))
    trash_database = TrashCan_Serializer(trash)
    user_update, trashcan_update = tools.user_update(request, user_database, trash_database)
    serializer_user = User_Serializer(instance=user, data=user_update)
    if serializer_user.is_valid():
        serializer_user.save()
    serializer_trash = TrashCan_Serializer(instance=trash, data=trashcan_update)
    if serializer_trash.is_valid():
        serializer_trash.save()
    # calculate and return percentage of trashcan's capacity
    trash = TrashCan.objects.all()
    serializer_trash = TrashCan_Serializer(trash, many=True)
    cap = tools.calculate_capacity(serializer_trash)
    output = serializer_user.data
    output["can_cap"] = cap
    return Response(output)

@api_view(['POST'])
def work_delete(request):
    label_id = 0
    continue_ = False
    serializer_work = TodoWork_Serializer(TodoWork.objects.all(), many=True)
    # find specific TODOWORK's id
    for i in serializer_work.data:
        if i["user_id"] == request.data["user_id"]:
            label_id = i["id"]
            continue_ = True
            break
    if (continue_):
        todowork_update = tools.rearrange(serializer_work, label_id-1)  # 保留label_id前的，後面的依序往前排一順位
        for i in range(len(todowork_update) - 1):
            work = TodoWork.objects.get(id=i + 1)
            serializer_work_ = TodoWork_Serializer(instance=work, data=todowork_update[i])
            if serializer_work_.is_valid():
                serializer_work_.save()
        work_ = TodoWork.objects.get(id=len(serializer_work.data))
        work_.delete()
        if (label_id == 1):  # have to check "go" is True or False
            flag = True
            work = TodoWork.objects.get(id=1)
            work_database = TodoWork_Serializer(work)
            can = re.split('\,', work_database.data["can_id"])
            for i in can:
                trash = TrashCan.objects.get(can_id=int(i))
                trash_database = TrashCan_Serializer(trash)
                if (trash_database.data["state"] != "stop"):
                    flag = False
            if flag:
                new_data = work_database.data
                new_data["go"] = True
                serializer = TodoWork_Serializer(instance=work, data=new_data)
                if serializer.is_valid():
                    serializer.save()
    return Response({"ack": True})

########################################################################################################################
########################################################################################################################
################################################   for DEBUG   #########################################################
########################################################################################################################
########################################################################################################################
@api_view(['POST'])
def user_create(request):
    register_data = tools.create_user(request)
    serializer = User_Serializer(data=register_data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def user_delete(request):
    user = User.objects.get(user_id=request.data["user_id"])
    user.delete()
    return Response({"ack":True})

@api_view(['POST'])
def trash_delete(request):
    trash = TrashCan.objects.get(can_id=request.data["can_id"])
    trash.delete()
    return Response({"ack":True})


@api_view(['POST'])
def trash_create(request):
    register_data = tools.create_trash(request)
    serializer = TrashCan_Serializer(data=register_data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def work_list(request):
    work = TodoWork.objects.all()
    serializer = TodoWork_Serializer(work, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def trash_list(request):
    trash = TrashCan.objects.all()
    serializer = TrashCan_Serializer(trash, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_list(request):
    user = User.objects.all()
    serializer = User_Serializer(user, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_detail(request,id):
    user = User.objects.get(user_id=id)
    serializer = User_Serializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def rearrange_work(request):
    work_database = TodoWork_Serializer(TodoWork.objects.all(), many=True)
    todowork_update = tools.rearrange(work_database)
    for i in range(len(todowork_update)):
        work = TodoWork.objects.get(id=i + 1)
        work.delete()
        #serializer_work = TodoWork_Serializer(instance=work, data=todowork_update[i])
        #if serializer_work.is_valid():
        #    serializer_work.save()
    #work_ = TodoWork.objects.get(id=len(work_database.data))
    #work_.delete()
    return Response({"ack":True}) #Response(serializer_trash.data)

@api_view(['GET'])
def best_trashcan(request):
    trash = TrashCan.objects.all()
    trash_database = TrashCan_Serializer(trash, many=True)
    the_best = tools.find_best_TrashCan(trash_database, request)
    return Response(the_best)