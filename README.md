- HOW TO CONNECT WITH SOCKETIO SERVER =

url = http://<ipaddress>:3000/inference


- HOW TO REGIST LINE = 
1. send event : system:register 
with payload :
{
  "lineId" : "<lineId>"
}

2. you will receive ack : { subscribed: messageBody.lineId }
3. register success
4. you should register the line first before you send crossing line event

- HOW TO SEND EVENT CROSSING LINE=
1. send event : line:crossed
with payload :
{
  "lineId" : "<lineId>",
  "direction":"<"in"|"out">"
}
2. you will receive ack : 
{
  "lineId" : "<lineId>",
  "direction":"<"in"|"out">"
}
3. event sent