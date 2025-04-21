# ROSLibJS 실습 가이드

## 프로젝트 구조

roslibjs-actionlib/ ├── public/ │ ├── index.html ← 웹 클라이언트 화면 │ └── app.js ← 로직 (roslibjs 사용) ├── server.js ← Node.js 웹 서버 └── package.json ← npm 설정

markdown
Copy
Edit

### **server.js**
`server.js`는 Node.js로 만든 웹 서버 코드. 서버를 실행하려면 아래 명령어를 입력하면 됨:

```bash
node server.js
public/index.html
웹 페이지 UI를 담당하는 HTML 파일. 여기서 app.js가 포함돼 브라우저에서 실행됨.

public/app.js
roslibjs를 이용해 ROS와 연결하고 액션 클라이언트를 설정하는 JavaScript 코드. 이 파일에서 목표 전송, 피드백 및 결과를 처리함.

설치 및 설정
필요한 패키지 설치
npm 패키지 설치해야 함. 프로젝트 폴더에서 아래 명령어를 실행하면 roslibjs와 express 설치됨:

bash
Copy
Edit
npm install roslibjs express
ROS 설정
ROS와 rosbridge_websocket 서버 실행해야 함. roscore를 먼저 실행하고 rosbridge_websocket으로 웹소켓 연결을 설정해야 함.

bash
Copy
Edit
roscore
roslaunch rosbridge_server rosbridge_websocket.launch
코드 설명
roslibjs 연결
웹에서 ROS와 연결하려면 roslibjs를 사용함. 아래처럼 연결하면 됨:

javascript
Copy
Edit
var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'  // ROS 브리지 웹소켓 서버 URL
});
ros 객체가 ROS와의 연결을 관리함.

url은 ROS 브리지 웹소켓 서버의 주소임. 로컬에서 실행할 경우 ws://localhost:9090 사용.

ActionClient 설정
roslibjs로 액션 클라이언트를 설정하는 코드:

javascript
Copy
Edit
var fibonacciClient = new ROSLIB.ActionClient({
    ros: ros,
    serverName: '/fibonacci',
    actionName: 'actionlib_tutorials/FibonacciAction'
});
serverName: 액션 서버 이름 (/fibonacci 등)

actionName: 액션 서버가 사용하는 액션 메시지 이름 (actionlib_tutorials/FibonacciAction)

목표 전송 및 피드백 받기
웹 클라이언트에서 목표를 전송하고, 피드백과 결과를 받는 방식은 이렇게 됨:

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
goalMessage: 목표 값 설정, 여기선 Fibonacci 계산의 순서.

feedback: 계산 중간 결과를 실시간으로 받아서 출력.

result: 계산 완료 후 최종 결과를 받음.

실습 방법
웹 페이지 실행
server.js 실행해서 웹 서버를 시작함:

bash
Copy
Edit
node server.js
index.html을 브라우저에서 열면 웹 클라이언트가 실행됨.

ROS와 연결 확인
roscore와 rosbridge_websocket을 실행하고, 브라우저에서 웹 클라이언트를 열면 웹소켓 연결이 설정됨.

개발자 도구(콘솔)에서 연결 상태, 피드백, 결과를 확인할 수 있음.

토픽과 액션 서버
rostopic list로 확인한 토픽들
실행 후 rostopic list로 확인한 토픽은 아래와 같음:

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

/fibonacci/result: 목표가 완료되면 결과를 반환하는 토픽.

JSON 형식
goalMessage는 JSON 형식으로 서버로 전송됨. feedback과 result도 JSON 형식으로 받음.

goalMessage: 목표를 설정하는 데이터 구조, 예를 들어 Fibonacci 계산의 순서(order)가 포함됨.

피드백: 계산 중간 결과를 실시간으로 받음.

결과: 계산 완료 후 최종 결과를 받음.

에러 처리
ERR_NAME_NOT_RESOLVED 오류
이 오류는 웹 브라우저가 ROS 브리지 서버에 연결되지 않아서 발생함.

확인할 점: rosbridge_websocket이 정상적으로 실행되고 웹 클라이언트가 올바른 URL로 연결되는지 확인해야 함.

ROSLIB is not defined 오류
roslib.js 라이브러리를 제대로 로드하지 못했을 때 발생하는 오류.

확인할 점: index.html에서 <script src="roslib.js"></script> 경로가 올바른지 확인.

GitHub에 올리기 위한 준비
프로젝트를 GitHub에 올릴 때는 .gitignore 파일을 추가해서 node_modules 폴더를 제외하고 업로드할 수 있음.

package.json, server.js, public/ 폴더는 그대로 올리면 됨.

.gitignore 예시
gitignore
Copy
Edit
node_modules/
*.log
결론
이 실습에서는 roslibjs를 사용하여 웹에서 ROS Actionlib 서버와 통신하는 방법을 학습할수있음
웹에서 목표 전송, 피드백 받기, 결과 받기를 실시간으로 처리할 수 있고,이 방식은 자율주행과 같은 더 복잡한 시스템에도 적용할 수 있음.
