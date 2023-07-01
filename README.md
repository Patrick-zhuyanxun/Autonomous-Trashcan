# Final Week

# Autonomous-Trashcan

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/000.png))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/000.png)

## 0.Introduction

此專案由「國立臺北科技大學 城市科學實驗室 2023 Spring UROP」開發。

### 0-1 範例影片:

https://youtu.be/4PowflGdkpY

### 0-2 動機

         台灣每年產生的垃圾量是逐年在增長的，從2001年的800萬噸，到2023以增長到1123萬噸。且根據統計，在2018年時，已經有20.4萬噸的垃圾是無法處理的，到了2021年，甚至成長到了67.9萬噸。

         本組希望透過此自動垃圾桶，使用者能夠對於在公眾場合製造的垃圾量有認知，針對回收給予回饋金以促進回收率，搭配移動底盤增加使用者的便利性。

### 0-3 使用方式

總共有3種方式可以丟垃圾

### 0-3-1 定點呼叫

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/001.jpg))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/001.jpg)

### 0-3-2 按鈕開啟

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/002.jpg))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/002.jpg)

### 0-3-3 掃描qr code

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/003.jpg))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/003.jpg)

## 1. Mechanism

   本次硬體構造分為底盤部分與垃圾桶部分，首先介紹底盤部分:

### 1-1 底盤部分:

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/004.jpg))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/004.jpg)

(1) 選用**輪趣科技**所推出之圓形常規[高配版全向輪機器人](https://wheeltec.net/product/html/?176.html)，底盤直徑為390mm，負重能力為15kg，後期在上方又加上一塊厚度3mm之壓克力板，將垃圾桶固定於底盤上方。

(2) 車體之主控版為udoo推出之[X86 II](https://www.udoo.org/docs-x86II/Introduction/Introduction.html)主機板，於車體上加裝一24 to 12V降壓器供電給主控板使用。

(3) 車上搭載之LIDAR型號為LDS-01，使用官方驅動。

### 1-2 垃圾桶

   將垃圾桶分為蓋子與主體兩塊部分進行說明:

1-2-1 **主體:**

  選用IKEA 的****[KNÖCKLA](https://www.ikea.com.tw/zh/search/?q=KN%C3%96CKLA)****垃圾桶進行改裝，容量為25公升型，內部有兩個內桶，可以放置兩種不同類型之垃圾或回收，並在垃圾桶底部開孔，安裝重量感測器量測垃圾重量。

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/005.jpg))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/005.jpg)

1-2-2 **蓋子:**

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/006.jpg))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/006.jpg)

(1) 蓋子實體圖如上圖，整體皆以3d列印製作而成，上方搭載了兩顆HC-SR04超聲波感測模組，用以量測垃圾桶容量。

(2) 開關蓋板作動方式則是透過馬達帶動螺桿轉動藉此帶動整體蓋板前後開合，並且在兩端位置加入極限開關，以達到限位的目的。

(3) 馬達選用一般常見之RF310發電機馬達，並透過自行設計之齒輪組(模數0.5，雙層齒輪，齒輪比1.0*2.4*3.0=7.2)達到降低轉速，增加扭矩之目的。

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/007.png))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/007.png)

## 2. Hardware

### 2-1 垃圾桶蓋電路
![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/008.png))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/008.png)

### 2-2 垃圾桶硬體架構

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/009.png))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/009.png)

### 2-3 使用之感測器、元件型號總整理

|  | 型號 | 數量 | 說明or購買網址 |
| --- | --- | --- | --- |
| 主控版 | UDOO X86 II | 1 | https://www.udoo.org/docs-x86II/Introduction/Introduction.html |
| LIDAR | LDS-01 | 1 | https://emanual.robotis.com/docs/en/platform/turtlebot3/appendix_lds_01/ |
| STM32 | STM32 Nucleo | 1 |  |
| Motor | RF310 | 1 |  |
| Ultrasonic Sensor | HS-SR04 | 2 |  |
| Load Sensor | 搭配晶片：HX711 | 2 | https://www.jin-hua.com.tw/webc/html/product/show.aspx?num=33618&kind=2686 |
| Limit Switch | KW11-3Z | 2 | https://www.jin-hua.com.tw/webc/html/product/show.aspx?num=2099&kind=1566 |

## 3. Front_end

使用React框架進行網站建設

### 3-1 執行前端server

Step1:使用VScode開啟Front_end資料夾

Step2:開啟terminal並cd進入’trashcan_newer_frontend’

Step3:下載下方API並指定版本

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/010.jpg))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/010.jpg)

Step4:輸入’npm start’，前端server開始運行

### 3-2 與Socket, Django server進行連線

由於本組的設定，前端只需與Socket進行連線

trashcan_newer_fronted/src/socket.js

上方路徑的檔案中

將網址換成使用者使用的Socket server的IP及Port即可

```jsx
const socket = io.connect("http://192.168.74.156:4040");
```

### 注意

若未與socket, django server進行連線，則無法完成login

## 4. trashcan_stm32

(1) 本次開發stm32韌體使用Arduino IDE進行開發

(2) 設定偏好路徑：https://github.com/stm32duino/BoardManagerFiles/raw/main/package_stmicroelectronics_index.json

(3) 選擇工具/開發板：

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/011.png))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/011.png)
(4) 編譯並燒錄即可

## 5. Django

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/012.png))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/012.png)

### Version

django==4.1.7

### 5-1 執行 Django server

cmd先進入到Database所在資料夾

```bash
cd "/yourpath/4. Django/Database"
```

(1) 執行Django server (url為127.0.0.1:8000)

```bash
python manage.py runserver 
```

(2) 執行Django server (url為your_ip:8000)

```bash
python manage.py runserver 0.0.0.0:8000
```

### 注意

若使用(2)方法，請確認網路連線為「私人網路」。

設定方式(win 11)：網路和網際網路>WiFi>”your wifi” 屬性>網路設定檔類型點選「私人網路」

### 5-2 檔案說明

server/models.py : 資料庫格式設定

server/models : 定義各功能

Database/urls.py: 定義各API的網址

## 6.  ROS

### 6-1 導航設定

(1) 修改LIDAR座標：ROS/src/turn_on_wheeltec_robot/launch/robot_model_visualization.launch (car_model: mini_omni)

(2) 建圖：

roslaunch ROS/src/turn_on_wheeltec_robot/launch/mapping.launch

啟動新終端cd到ROS/src/turn_on_wheeltec_robot/map

rosrun map_server map_saver -f $檔案名稱

(3) 啟動導航與連線：

進入ROS/src/turn_on_wheeltec_robot/launch/navigation.launch修改地圖路徑

roslaunch ROS/src/turn_on_wheeltec_robot/launch/navigation.launch 同時啟動導航與socketio連線

### 6-2 與socketio連線

修改src\turn_on_wheeltec_robot\scripts\trashcan_main.py

line 151 改為socketio server的IP

### 6-3 與stm32連線

修改 src\turn_on_wheeltec_robot\scripts\trashcan_main.py

line 32 改為stm32的串口名稱

若無法開啟請給予串口權限

## 7. Socket_server

(1) 若為Windows系統，請確認網路連線為「私人網路」。

(2) 修改程式中IP位址，包含Django Server的IP (line 6)與自己的IP(line 160)。

(3) 確認版本，測試使用python-socketio==4.6.1, python-engineio==3.14.2, JavaScript Socket.IO==2.0.2, requests==2.28.2

![https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/7.document/013.png))](https://github.com/Patrick-zhuyanxun/Autonomous-Trashcan/blob/main/7.%20document/013.png)
## 8. API格式
