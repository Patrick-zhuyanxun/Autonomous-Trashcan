# Autonomous-Trashcan

![vlcsnap-2023-07-01-09h22m15s735.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fe29f3e7-e8d3-45ed-b9e2-e3f476d670a6/vlcsnap-2023-07-01-09h22m15s735.png)

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

![290457.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/601bae6b-6fbd-465b-8102-ab51192fd1e5/290457.jpg)

### 0-3-2 按鈕開啟

![290461.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/465d44cf-0fcc-4ec6-bcfe-1942b54a14fa/290461.jpg)

### 0-3-3 掃描qr code

![290573.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7990f683-c2b3-4d04-adc7-70eb0bacbb07/290573.jpg)

## 1. Mechanism

   本次硬體構造分為底盤部分與垃圾桶部分，首先介紹底盤部分:

### 1-1 底盤部分:

![IMG_1113.HEIC.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/013be9c2-f692-4cba-8d1c-bd6c8d1c50ae/IMG_1113.HEIC.jpg)

(1) 選用**輪趣科技**所推出之圓形常規[高配版全向輪機器人](https://wheeltec.net/product/html/?176.html)，底盤直徑為390mm，負重能力為15kg，後期在上方又加上一塊厚度3mm之壓克力板，將垃圾桶固定於底盤上方。

(2) 車體之主控版為udoo推出之[X86 II](https://www.udoo.org/docs-x86II/Introduction/Introduction.html)主機板，於車體上加裝一24 to 12V降壓器供電給主控板使用。

(3) 車上搭載之LIDAR型號為LDS-01，使用官方驅動。

### 1-2 垃圾桶

   將垃圾桶分為蓋子與主體兩塊部分進行說明:

1-2-1 **主體:**

  選用IKEA 的****[KNÖCKLA](https://www.ikea.com.tw/zh/search/?q=KN%C3%96CKLA)****垃圾桶進行改裝，容量為25公升型，內部有兩個內桶，可以放置兩種不同類型之垃圾或回收，並在垃圾桶底部開孔，安裝重量感測器量測垃圾重量。

![IMG_1511.JPG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/daa83ea2-be14-4c7a-9007-35e17ff5faf0/IMG_1511.jpg)

1-2-2 **蓋子:**

![20230613_161350.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e220a20-8db1-4d87-b46f-db58e0851901/20230613_161350.jpg)

(1) 蓋子實體圖如上圖，整體皆以3d列印製作而成，上方搭載了兩顆HC-SR04超聲波感測模組，用以量測垃圾桶容量。

(2) 開關蓋板作動方式則是透過馬達帶動螺桿轉動藉此帶動整體蓋板前後開合，並且在兩端位置加入極限開關，以達到限位的目的。

(3) 馬達選用一般常見之RF310發電機馬達，並透過自行設計之齒輪組(模數0.5，雙層齒輪，齒輪比1.0*2.4*3.0=7.2)達到降低轉速，增加扭矩之目的。
## 2. Front_end
  Use React to build up the website
## 3. trashcan_stm32
cool

## 4. Django

## 5. ROS
![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c4e8caa6-3ae1-4fbe-a35f-71a63f8b79f2/Untitled.png)
