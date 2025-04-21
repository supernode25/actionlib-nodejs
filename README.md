1. 프로젝트 구조
프로젝트 폴더 구조는 아래와 같이 구성됨:

pgsql
Copy
Edit
roslibjs-actionlib/
├── public/
│   ├── index.html    ← 웹 클라이언트 화면
│   └── app.js        ← 로직 (roslibjs 사용)
├── server.js         ← Node.js 웹 서버
└── package.json      ← npm 설정
1.1 server.js
server.js는 웹 서버를 실행시키는 Node.js 코드임. 아래 명령어로 서버 실행됨:

bash
Copy
Edit
node server.js
1.2 public/index.html
웹 페이지의 UI를 구성하는 HTML 파일임. 이 파일에서 app.js를 포함시켜서 브라우저에서 실행됨.

1.3 public/app.js
roslibjs를 사용해 ROS와 연결하는 JavaScript 로직을 처리하는 파일임. ROS 브리지와의 연결 설정, 액션 클라이언트 생성 및 목표 전송 등을 처리함.

2. 설치 및 설정
2.1 필요한 패키지 설치
필요한 npm 패키지들을 설치해야 함. 프로젝트 폴더에서 아래 명령어를 실행하면 roslibjs와 express를 설치함:

bash
Copy
Edit
npm install roslibjs express
2.2 ROS 설정
ROS와 rosbridge_websocket 서버를 실행해야 함.

roscore 실행 후, rosbridge_websocket을 통해 웹소켓 연결을 설정함.

bash
Copy
Edit
roscore
roslaunch rosbridge_server rosbridge_websocket.launch
3. 코드 설명
3.1 roslibjs 연결
roslibjs를 사용해 웹에서 ROS와 연결하는 방법은 다음과 같음:

javascript
Copy
Edit
var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'  // ROS 브리지 웹소켓 서버 URL
});
ros 객체는 ROS와의 연결을 관리함.

url은 ROS 브리지 웹소켓 서버의 주소임. 로컬에서 실행할 경우 ws://localhost:9090을 사용함.

3.2 ActionClient 설정
roslibjs를 사용해서 액션 클라이언트를 설정함:

javascript
Copy
Edit
var fibonacciClient = new ROSLIB.ActionClient({
    ros: ros,
    serverName: '/fibonacci',
    actionName: 'actionlib_tutorials/FibonacciAction'
});
serverName: 액션 서버 이름 (/fibonacci 등)

actionName: 액션 서버가 사용하는 액션 메시지의 이름 (actionlib_tutorials/FibonacciAction)

3.3 목표 전송 및 피드백 받기
웹 클라이언트에서 목표를 전송하고, 피드백과 결과를 받는 방식은 다음과 같음:

javascript
Copy
Edit
var goal = new ROSLIB.Goal({
    actionClient: fibonacciClient,
    goalMessage: {
        order: 7  // Fibonacci 계산의 목표값
    }
});

goal.on('feedback', function(feedback) {
    console.log('Feedback: ' + feedback.sequence);
});

goal.on('result', function(result) {
    console.log('Final Result: ' + result.sequence);
});

goal.send();
goalMessage: 서버로 전송할 목표 값임 (예: Fibonacci 계산의 순서).

feedback: 목표 진행 중에 서버로부터 피드백을 받음.

result: 목표가 완료된 후, 서버로부터 최종 결과를 받음.

4. 실습 방법
4.1 웹 페이지 실행
1단계: server.js 실행해서 웹 서버를 실행.

bash
Copy
Edit
node server.js
2단계: index.html을 브라우저에서 열어서 웹 클라이언트 실행.

4.2 ROS와 연결 확인
roscore와 rosbridge_websocket을 실행하고, 브라우저에서 웹 클라이언트를 실행하면 웹소켓 연결이 설정됨.

개발자 도구(콘솔)에서 로그를 확인하여 연결 상태와 피드백, 결과를 출력할 수 있음.

5. 토픽과 액션 서버
5.1 rostopic list로 확인한 토픽들
실행 후 rostopic list로 확인한 결과는 다음과 같음:

bash
Copy
Edit
/client_count
/connected_clients
/fibonacci/cancel
/fibonacci/feedback
/fibonacci/goal
/fibonacci/result
/fibonacci/status
/rosout
/rosout_agg
/fibonacci/goal: 목표 값을 서버로 전달하는 토픽.

/fibonacci/feedback: 서버가 진행 중인 피드백을 전송하는 토픽.

/fibonacci/result: 목표가 완료된 후, 결과를 서버가 반환하는 토픽.

5.2 JSON 형식
goalMessage를 JSON 형식으로 전달하고, feedback과 result도 JSON 형식으로 받음.

goalMessage는 목표를 설정하는 데이터 구조로, 예를 들어 Fibonacci 계산의 순서(order)를 설정할 수 있음.

피드백은 계산 중간 결과를 실시간으로 받음.

결과는 계산이 완료된 후 최종 결과를 받음.

6. 에러 처리
6.1 ERR_NAME_NOT_RESOLVED 오류
웹 브라우저가 ROS 브리지 서버에 연결되지 않으면 이 오류가 발생함.

확인 사항: rosbridge_websocket이 정상적으로 실행되고, 웹 클라이언트가 올바른 URL로 연결되고 있는지 체크.

6.2 ROSLIB is not defined 오류
roslib.js 라이브러리를 제대로 로드하지 못했을 때 발생.

확인 사항: index.html에서 <script src="roslib.js"></
