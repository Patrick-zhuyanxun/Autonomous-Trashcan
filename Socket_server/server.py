import eventlet
import socketio
import requests
import json
DEBUG = False   # default: False
url = 'http://192.168.74.156:8000/'

#sio = socketio.Server()
#sio = socketio.Server(ssl_cert_reqs=ssl.CERT_NONE)
sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'},
})

# connect
@sio.event
def connect(sid, environ):
    print('client connect', sid)
    
# disconnect
@sio.event
def disconnect(sid):
    print('client disconnect ', sid)

# message
@sio.event
def message(sid, data):
    print('message:', data)

@sio.event
def login(sid, user_info):  # get login request from web
    print('web (login)===> socket', user_info)
    if DEBUG == False:
        print('socket (get_user)===> django', user_info)
        data = json.loads((requests.get(url+'get_user', data=user_info)).text)  # get user data from django
        print('django (get_user)===> socket', data)
    else:   # debug mode
        data = {
        "weight_trash": 100.1,
        "weight_recy": 100.1,
        "coin": 100.1,
        "user_id": user_info['user_id']
        }
        print('django (debug)===> socket', data)
    sio.emit('update', data)
    print('socket (update)===> web', data)

@sio.event
def rank(sid):  # get rank request from web
    print('web (rank)===> socket')
    if DEBUG == False:
        print('socket (get_rank)===> django')
        rank = json.loads((requests.get(url+'get_rank')).text)  # get rank data from django
        print('django (get_rank)===> socket', rank)
    else:   # debug mode
        print('socket (debug)===> django')
        rank = {"trash":['1072B0001', '1072B0002', '1072B0003'],"recycle":['1072B0001', '1072B0002', '1072B0003']}
        print('django (debug)===> socket', rank)
    sio.emit('rank_update', rank)   # post rank data to web
    print('socket (rank_update)===> web', rank)

# user call trash can
@sio.event
def call_from_user(sid, user_info):
    print('web (call_from_user)===> socket', user_info)
    # post task to django
    print('socket (upload_work)===> django', user_info)
    user_info['position'] = str(user_info['position'])
    user_info['type'] = str(user_info['type'])
    if DEBUG == False:  
        ack = json.loads((requests.post(url+'upload_work', data=user_info)).text)
        print('django (upload_work)===> socket', ack)
    # inspect task
    work()


# user open trash can
@sio.event
def open_from_user(sid, user_info):
    print('web (open_from_user)===> socket', user_info)
    # check can state from django
    if DEBUG == False:
        print('socket (get_trash_state)===> django', user_info)
        state = json.loads((requests.get(url+'get_trash_state', data=user_info)).text)
        print('django (get_trash_state)===> socket', state)
    else:
        state = {"state": 'stop'}
        print('django (debug)===> socket', state)
    if state['state'] == 'stop':
        print('socket (open_req)===> rsp', user_info)
        sio.emit('open_req', user_info)

# user cancel task
@sio.event
def cancel_from_user(sid, user_id):
    print('web (cancel_from_user)===> socket', user_id)
    print('socket (work_delete)===> django', user_id)
    requests.post(url+'work_delete', data=user_id)

# trash can send data to django and update data to web
@sio.event
def can_data(sid, data):
    print('rsp (can_data)===> socket', data)
    if DEBUG == False:
        # update can data to django
        print('socket (user_update)===> django', data)
        update = json.loads((requests.post(url+'user_update', data=data)).text)
        print('django (user_update)===> socket', update)
    else:
        update = {
        "weight_trash": 100.0,
        "weight_recy": 100.0,
        "coin": 100.0,
        "user_id": data['user_id']
        }  
        print('django (debug)===> socket', update)
    # update data to web
    sio.emit('update', update)
    print('socket (update)===> web', update)

# trash can update can state to django and web
@sio.event
def can_state(sid, state):
    print('rsp (can_state)===> socket', state)
    if DEBUG == False:
        print('socket (trash_update)===> django', state)
        ack = json.loads((requests.post(url+'trash_update', data=state)).text)
        print('django (trash_update)===> socket', ack)
        sio.emit('can_state_update', state)
        print('socket (can_state_update)===> web', state)
    if state['state'] == 'stop':
        # inspect work
        if DEBUG == False:
            work()
        else:
            print('work()')


def work():
    # get task from django
    if DEBUG == False:
        task = json.loads((requests.get(url+'get_work')).text)
        print('django (get_work)===> socket', task)
    else: # debug mode
        task = {
                "go":True,
                "can_id":[1],
                "user_id": 'thomas920611@gmail.com',
                "position": [15.0,15.0]
                }
        print('django (debug)===> socket', task)
    if task['go'] == True:      
        # call trash can
        for can_id in task['can_id']:
            sio.emit('moving_req', data=(can_id, task['user_id'], task['position']))
            print('socket (moving_req)===> rsp', (can_id, task['user_id'], task['position']))
        #task = {}

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('192.168.74.30', 4040)), app, log_output=False) # default log_output=True