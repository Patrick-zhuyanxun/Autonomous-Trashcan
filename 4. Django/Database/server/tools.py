import numpy as np
import json
import re

PLASTIC_PRICE = 4
PAPER_PRICE = 18
RECY = 36.
TRASH = 36.


def create_user(request):
    # create default user data
    data = {
        "user_id":"",
        "weight_trash":0.,
        "weight_recy":0.,
        "coin":0.
    }
    data["user_id"] = request.data["user_id"]
    return data

def create_trash(request):
    # create default trash data
    data = {
        "can_id":"",
        "recycle_type":"",
        "cap_trash":TRASH,
        "cap_recy":RECY,
        "state":"stop",
        "position":"[0.0,0.0]"
    }
    data["can_id"] = request.data["can_id"]
    data["recycle_type"] = request.data["recycle_type"]
    return data

def create_work(request, best_can,trash_database, id_len):
    go = True if(id_len==1) else False
    data = {
        "id":"",
        "can_id":"",
        "user_id":"",
        "position":"",
        "go":False,
    }
    for i in best_can:
        if (trash_database.data[int(i)-1]["state"] != "stop"):
            go = False
    data["id"] = id_len
    data["can_id"] = ','.join(best_can)
    data["user_id"] = request.data["user_id"]
    data["position"] = request.data["position"]
    data["go"] = go
    return data
# 更新資料用
def user_update(update_data, user_database, trash_database):
    new_user = user_database.data
    new_trash = trash_database.data
    price = float(update_data.data["weight_recy"])*PAPER_PRICE*0.001 if (new_trash["recycle_type"]=='paper') else float(update_data.data["weight_recy"])*PLASTIC_PRICE*0.001
    price = round(price,2)
    new_user["coin"] += price
    new_user["weight_trash"] += float(update_data.data["weight_trash"])
    new_user["weight_recy"] += float(update_data.data["weight_recy"])
    new_user["weight_trash"] = round(new_user["weight_trash"], 2)
    new_user["weight_recy"] = round(new_user["weight_recy"], 2)
    new_user["coin"] = round(new_user["coin"], 2)

    new_trash["cap_trash"] = float(update_data.data["cap_trash"])
    new_trash["cap_recy"] = float(update_data.data["cap_recy"])
    return new_user, new_trash

# update the trashcan's state and position
def trash_update(update_data, trash_database):
    update_todowork = False
    new_trash = trash_database.data
    new_trash["state"] = str(update_data.data["state"])
    if (new_trash["state"] == "stop"):
        update_todowork = True
    #new_trash["recycle_type"] = update_data.data["recycle_type"]
    return new_trash, update_todowork

def work_update(work_database, trash_database):
    can = re.split('\[|\]|\,', work_database.data["can_id"])
    for i in can:
        return i
    return can

def calculate_dustance(a, b):
    b=re.split('\[|\]|\,', b)
    return np.sqrt((float(a[0]) - float(b[1]))**2 + (float(a[1]) - float(b[2]))**2)

def find_best_TrashCan(database, request):
    trash = eval(request.data["type"])["trash"]
    paper = eval(request.data["type"])["paper"]
    plastic = eval(request.data["type"])["plastic"]
    position = eval(request.data["position"])
    cap_ok = []
    correct = {}
    threshold = 5
    if (trash):
        for i in range(len(database.data)):
            if (float(database.data[i]["cap_trash"])>threshold):
                dist = calculate_dustance(position, database.data[i]["position"])
                correct.setdefault(database.data[i]["can_id"] , dist)
            #correct.setdefault(database.data[i]["can_id"] , float(database.data[i]["cap_trash"]))
        correct = sorted(correct.items(), key=lambda x:x[1], reverse=True)
        cap_ok.append(correct[0][0])
    if (paper):
        correct = {}
        for i in range(len(database.data)):
            if((database.data[i]["recycle_type"] == "paper") and (float(database.data[i]["cap_recy"])>threshold)):
                dist = calculate_dustance(position, database.data[i]["position"])
                correct.setdefault(database.data[i]["can_id"], dist)
        correct = sorted(correct.items(), key=lambda x: x[1], reverse=True)
        cap_ok.append(correct[0][0])
    if (plastic):
        correct = {}
        for i in range(len(database.data)):
            if((database.data[i]["recycle_type"] == "plastic") and (float(database.data[i]["cap_recy"])>threshold)):
                dist = calculate_dustance(position, database.data[i]["position"])
                correct.setdefault(database.data[i]["can_id"], dist)
        correct = sorted(correct.items(), key=lambda x: x[1], reverse=True)
        cap_ok.append(correct[0][0])
    return cap_ok

def user_rank(database):
    trash_rank = {}
    recycle_rank = {}
    trash_user = []
    trash_weight = []
    recycle_user = []
    recycle_weight = []

    # arrange user by trash weight (top three)
    for i in range(len(database.data)):
        trash_rank.setdefault(database.data[i]["user_id"], database.data[i]["weight_trash"])
    trash_rank = sorted(trash_rank.items(), key=lambda x: x[1])  # small to large
    if len(database.data) < 3:
        for i in range(len(database.data)):
            trash_user.append(trash_rank[i][0])  # user_id
            trash_weight.append(trash_rank[i][1])  # weight_trash
    else:
        trash_user.extend([trash_rank[0][0], trash_rank[1][0], trash_rank[2][0]])  # user_id
        trash_weight.extend([trash_rank[0][1], trash_rank[1][1], trash_rank[2][1]])  # weight_trash

    # arrange user by recycle weight (top three)
    for i in range(len(database.data)):
        recycle_rank.setdefault(database.data[i]["user_id"], database.data[i]["weight_recy"])
    recycle_rank = sorted(recycle_rank.items(), key=lambda x: x[1], reverse=True)  # large to small
    if len(database.data) < 3:
        for i in range(len(database.data)):
            recycle_user.append(recycle_rank[i][0])  # user_id
            recycle_weight.append(recycle_rank[i][1])  # weight_recycle
    else:
        recycle_user.extend([recycle_rank[0][0], recycle_rank[1][0], recycle_rank[2][0]])  # user_id
        recycle_weight.extend([recycle_rank[0][1], recycle_rank[1][1], recycle_rank[2][1]])  # weight_recycle
    #return user's id and weight
    return {"trash_user": trash_user, "trash_weight": trash_weight, "recycle_user": recycle_user, "recycle_weight": recycle_weight}

def rearrange(old_work, begin=0):
    """
    old_work：[A, B, C, D, E, F]
    (label    0, 1, 2, 3, 4, 5)

    except：[B, C, D, E, F] # no 'A'
    -->rearrange：[old_work[1], old_work[2], old_work[3], old_work[4], old_work[5]]

    new_work：[B, C, D, E, F]
    (label    0, 1, 2, 3, 4)
    """
    new_work = old_work.data
    for i in range(begin, len(new_work) - 1):
        new_work[i]["id"] = i+1
        new_work[i]["can_id"] = old_work.data[i+1]["can_id"]
        new_work[i]["user_id"] = old_work.data[i+1]["user_id"]
        new_work[i]["position"] = old_work.data[i+1]["position"]
        new_work[i]["go"] = old_work.data[i+1]["go"]
    return new_work

# return percentage of capacity
def calculate_capacity(database):
    # full capacity
    dict={}
    for i in range(len(database.data)):
        # i+1 : number of trashcan
        # calculate percentage
        trash = int((TRASH - database.data[i]["cap_trash"]) * 100 / TRASH)
        recy = int((RECY - database.data[i]["cap_recy"]) * 100 / RECY)
        num = str(i + 1)
        dict[num] = {"cap_trash":str(trash) + "%", "cap_recy":str(recy) + "%"}
    return dict