# 🧠 roslibjs + actionlib 웹 클라이언트 실습

roslibjs를 활용해서 웹 브라우저에서 ROS의 `actionlib` 서버와 통신해봄. 예제는 `fibonacci` 액션 서버를 기준으로 구성됨. 웹에서 goal을 보내고, 중간 피드백과 결과를 받아오는 구조임.

## 📂 프로젝트 구조

roslibjs-actionlib/ ├── public/ │ ├── index.html ← 웹 클라이언트 화면 │ └── app.js ← roslibjs 로직 ├── server.js ← Node.js 웹 서버 └── package.json ← npm 설정

markdown
Copy
Edit

## 🚀 실행 방법

1. ROS core 실행  
   ```bash
   roscore
Fibonacci 액션 서버 실행

bash
Copy
Edit
rosrun actionlib_tutorials fibonacci_server
rosbridge 서버 실행

bash
Copy
Edit
roslaunch rosbridge_server rosbridge_websocket.launch
Node.js 웹 서버 실행

bash
Copy
Edit
node server.js
웹 브라우저에서 접속

arduino
Copy
Edit
http://localhost:3000
✅ 확인할 토픽
bash
Copy
Edit
rostopic list
/fibonacci/goal

/fibonacci/feedback

/fibonacci/result

/fibonacci/status

등등…

/fibonacci가 base 토픽이고, actionlib 구조에 따라 goal, feedback, result 등이 자동으로 생성됨.

🧩 핵심 개념
ActionClient를 생성할 때 기반 토픽 (/fibonacci) 과 액션 타입 (actionlib_tutorials/FibonacciAction)을 지정함

goal.send() 호출 시, /fibonacci/goal 토픽으로 메시지가 발행됨

액션 서버가 실행 중이면 /fibonacci/feedback, /fibonacci/result 등을 통해 피드백이 들어옴

/code 📜 주요 코드
📄 index.html
html
Copy
Edit
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="/eventemitter2.js"></script>
    <script src="/roslib.js"></script>
    <script src="app.js"></script>
  </head>
  <body>
    <h1>Fibonacci ActionClient Example</h1>
    <button onclick="sendGoal()">Send Goal</button>
    <pre id="output"></pre>
  </body>
</html>
📄 app.js
javascript
Copy
Edit
const ros = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
});

ros.on('connection', () => {
  console.log('Connected to ROS');
});

const fibonacciClient = new ROSLIB.ActionClient({
  ros: ros,
  serverName: '/fibonacci',
  actionName: 'actionlib_tutorials/FibonacciAction'
});

function sendGoal() {
  const output = document.getElementById('output');
  output.textContent = '';

  const goal = new ROSLIB.Goal({
    actionClient: fibonacciClient,
    goalMessage: { order: 7 }
  });

  goal.on('feedback', (feedback) => {
    output.textContent += `Feedback: ${feedback.sequence}\n`;
  });

  goal.on('result', (result) => {
    output.textContent += `Result: ${result.sequence}\n`;
  });

  goal.send();
}
📄 server.js
javascript
Copy
Edit
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
🔎 참고한 오류 및 해결
ROSLIB is not defined → roslib.js 로컬로 직접 다운받아서 사용해야 함 (CDN이 안될 수 있음)

피드백 계속 오는 이유 → 액션 서버에서 중간 계산값을 계속 feedback으로 publish 하고 있음

✍️ 느낀점
웹에서 ROS 액션 서버를 다루는 기본 구조를 이해하게 됨. 액션 기반 통신은 실시간 피드백을 주고받을 수 있어서, 자율주행의 move_base 같은 곳에서도 유사하게 사용할 수 있을 듯함.

yaml
Copy
Edit

---

그대로 붙여넣으면 코드도 예쁘게, 섹션도 깔끔하게 나오니까 바로 써도 됨. 필요하면 move_base 버전이나 UI 추가도 같이 확장 가능함.







