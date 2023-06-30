#include "Servo.h"   //載入函式庫，這是內建的，不用安裝
#include "ArduinoJson.h"
#include "HX711.h"
//pin setting
//HC-SR04
const byte trigPin_1 = D6; //超音波測距的 觸發腳
const byte echoPin_1 = D7; //超音波測距的 回應腳
const byte trigPin_2 = D8; //超音波測距的 觸發腳
const byte echoPin_2 = D9; //超音波測距的 回應腳
//hx711
const int DT_PIN_1 = D2;   //重量感測器1
const int SCK_PIN_1 = D3;
const int DT_PIN_2 = D4;   //重量感測器2
const int SCK_PIN_2 = D5;

const int buzzerPin = D11;
const int motorPin = D10;

const int scale_factor_1 = 437; //比例參數，從校正程式中取得 左
const int scale_factor_2 = 446; //比例參數，從校正程式中取得 右

int CAN_ID=1;   //trashcan id
String command;
int trash_weight=0;
int recycle_weight=0;
int opentime_count=0;
int change_count=0;
int trash_bias = 0;
int recycle_bias = 0;

HX711 scale_1; // 建立load sensor物件
HX711 scale_2;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin_1, OUTPUT);
  pinMode(echoPin_1, INPUT); 
  pinMode(trigPin_2, OUTPUT);
  pinMode(echoPin_2, INPUT); 
  pinMode(buzzerPin, OUTPUT);
  pinMode(motorPin, OUTPUT);
  scale_1.begin(DT_PIN_1, SCK_PIN_1);
  scale_2.begin(DT_PIN_2, SCK_PIN_2);
  scale_1.set_scale(scale_factor_1);       // 設定比例參數
  scale_2.set_scale(scale_factor_2);       // 設定比例參數
  scale_1.tare();               // 歸零
  scale_2.tare();               // 歸零
}

void loop() {   
  while (Serial.available()){
    command = Serial.readString();
    //傳送重量
    if(command == "open"){    
      digitalWrite(motorPin, HIGH);   //trashcan open
      delay(5500);
      scale_1.tare();               // 歸零
      scale_2.tare();               // 歸零
      tone(buzzerPin, 523);
      delay(100);
      tone(buzzerPin, 784);
      delay(200);
      noTone(buzzerPin);
      while(true){
        opentime_count += 1;
        recycle_weight = scale_1.get_units(10)*(-1);
        trash_weight = scale_2.get_units(10)*(-1);
        //Serial.print(trash_weight);
        //Serial.print(",");
        //Serial.println(recycle_weight);
        if((trash_weight>3)or(recycle_weight>3)){   //計算重量改變次數
          change_count += 1;
        }
        else{
          change_count = 0;
        }
        if((change_count>5)or(opentime_count==60)){   //重量改變或超過秒數關閉垃圾桶
          change_count = 0;
          tone(buzzerPin, 784);
          delay(100);
          tone(buzzerPin, 523);
          delay(200);
          noTone(buzzerPin);
          if(trash_weight<4){
            trash_weight = 0;
          }
          if(recycle_weight<4){
            recycle_weight = 0;
          }
          break;
        }
      }
      
      //capcity
      int cap_recycle = sr04(trigPin_1, echoPin_1) * 0.017; 
      int cap_trash = sr04(trigPin_2, echoPin_2) * 0.017;
      digitalWrite(motorPin, LOW);  //trashcan close
      delay(5000);
      // Create the JSON document
      StaticJsonDocument<200> doc;
      doc["can_id"] = CAN_ID;
      doc["weight_trash"] = trash_weight;
      doc["weight_recy"] = recycle_weight;
      doc["cap_trash"] = cap_trash;
      doc["cap_recy"] = cap_recycle;
      // Send the JSON document over the "link" serial port
      serializeJson(doc, Serial);
      Serial.println();
    }
  }
}


//超音波測距函式  
//送 10μs 脈波給 HC-SR04 觸發腳(trigger pin)，並計算 回應腳(echo)變成高電位的時間
unsigned long sr04(const byte trigPin, const byte echoPin) { 
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);  
  digitalWrite(trigPin, LOW);
  return pulseIn(echoPin, HIGH);
}
