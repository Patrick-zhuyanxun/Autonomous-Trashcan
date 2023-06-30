#!/usr/bin/env python
# license removed for brevity
import rospy
from std_msgs.msg import String
import socketio
import json
import serial
import time
import re
from geometry_msgs.msg import PointStamped, PoseStamped
from move_base_msgs.msg import MoveBaseActionResult

# sudo chmod 666 /dev/ttyACM2    #open port

CAN_ID = 1
DEBUG = False

sio = socketio.Client()

if DEBUG == False:
	connection = serial.Serial('/dev/ttyACM1', baudrate=9600)
	connection.reset_input_buffer()

############################## publisher ##############################

pub = rospy.Publisher('/move_base_simple/goal', PoseStamped, queue_size=10) # geometry_ms/PoseStamped
#pub = rospy.Publisher('chatter', String, queue_size=10)
rospy.init_node('talker', anonymous=True)
rate = rospy.Rate(10) # 10hz
USER='0'
POSITION = [0.0,0.0]


def main():

    @sio.event
    def connect():
        print('Connected to server')

    @sio.event
    def disconnect():
        print('Disconnected from server')

    @sio.event
    def moving_req(can_id, user_id, position):
	global USER
	global POSITION
	USER = user_id
	POSITION = position
	print(POSITION, USER)
        #can_id = info['can_id']
        #user_id = info['user_id']
        #position = info['position']
        #print(can_id, user_id, position)
        if(can_id == CAN_ID):
        # moving to user position
            sio.emit('can_state', {'can_id': CAN_ID, 'state': 'moving'})
            print('rsp (can_state)===> socket', {'user_id':user_id, 'can_id': CAN_ID, 'state': 'moving'})
            #b = re.split('\[|\]|\,', position)
            #x = float(b[1])
            #y = float(b[2])
            pose = PoseStamped()
            pose.header.frame_id = 'map'
            pose.pose.position.x = position[0]
            pose.pose.position.y = position[1]
            pose.pose.orientation.z = 0.0
            pose.pose.orientation.w = 1.0
            print('rsp (/move_base_simple/goal)', pose) 
            talker(pose)
            #time.sleep(3)
            #if((position[0] != 0.0)&(position[1] != 0.0)):
            #	open(user_id)   

    @sio.event
    def open_req(user_info):
        if(user_info['can_id'] == CAN_ID):
            open_trashcan(user_info['user_id'])

    def open_trashcan(user_id):
    # open trash can
            sio.emit('can_state', {'user_id':user_id, 'can_id': CAN_ID, 'state': 'opening'})
            print('rsp (can_state)===> socket', {'user_id': user_id, 'can_id': CAN_ID, 'state': 'opening'})
            # serial send "open"
            command = 'open'
            if DEBUG == False:
                connection.write(command.encode())
            print('rsp (serial)==> stm32', command)
            # return by serail
            while True:
                if DEBUG == False:
                    data = connection.readline() #.decode("utf-8")
                    # print(data)
                    try:
                        data = json.loads(data)
                        print('stm32 (serial)==> rsp', data)
                        #data['weight_trash'] = round(data['weight_trash'], 2)
                        #data['weight_recy'] = round(data['weight_recy'], 2)
                        #data['cap_trash'] = round(data['cap_trash'], 2)
                        #data['cap_recy'] = round(data['cap_recy'], 2)
                        data['user_id']=user_id
                        break
                    #except json.JSONDecodeError as e:
                    #    print("JSON:", e)
                    except:
                        print("except error", data)
                        data = data[:-2]
                        #data = data.replace("u'","\{\"")
                        data = "{" + data
                        print("except error2", data)
                        data = json.loads(data)
                        print('stm32 (serial)==> rsp', data)
                        print("except error", data)
                        data['user_id']=user_id
                        break
                else:
		    time.sleep(10)
                    data = {'can_id':1, 'weight_trash':11,'weight_recy':22, 'cap_trash': 33.33, 'cap_recy': 44.44, 'user_id': user_id}
	    	break

            # update can data
            sio.emit('can_data', data)  
            print('rsp (can_data)===> socket', data)
        # update state
	    time.sleep(2)
            sio.emit('can_state', {'user_id':user_id, 'can_id': CAN_ID, 'state': 'stop'})
            print('rsp (can_state)===> socket', {'user_id':user_id, 'can_id': CAN_ID, 'state': 'stop'})

    def goal_result_callback(result):
	print("in goal_result_callback")
    	position = POSITION
    	if result.status.status == result.status.SUCCEEDED:
            rospy.loginfo("Goal reached successfully!")
            print(position) 
            if((position[0] != 0.0)|(position[1] != 0.0)):
                open_trashcan(USER)
            else:
                sio.emit('can_state', {'user_id':USER, 'can_id': CAN_ID, 'state': 'stop'})
        else:
            rospy.loginfo("Navigation failed!")
	    sio.emit('can_state', {'user_id':USER, 'can_id': CAN_ID, 'state': 'failed'})
            time.sleep(2)
	    sio.emit('can_state', {'user_id':USER, 'can_id': CAN_ID, 'state': 'stop'})

    def talker(send):
	print("in talker")
        rospy.loginfo(send)
        pub.publish(send)
        rate.sleep()
        #rospy.Subscriber('/move_base/result', MoveBaseActionResult, goal_result_callback)
    sub  = rospy.Subscriber('/move_base/result', MoveBaseActionResult, goal_result_callback)
    sio.connect('http://192.168.74.156:4040')
    sio.wait()

#sub  = rospy.Subscriber('/move_base/result', MoveBaseActionResult, goal_result_callback)
 
if __name__ == '__main__':
    main()
