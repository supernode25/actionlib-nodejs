🧠 주요 코드 설명
roslib 연결
js
Copy
Edit
const ros = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
});
ActionClient 설정
js
Copy
Edit
const fibonacciClient = new ROSLIB.ActionClient({
  ros: ros,
  serverName: '/fibonacci',
  actionName: 'actionlib_tutorials/FibonacciAction'
});
목표 전송
js
Copy
Edit
let goal = new ROSLIB.Goal({
  actionClient: fibonacciClient,
  goalMessage: { order: 7 }
});

goal.on('feedback', function(feedback) {
  console.log('Feedback: ', feedback.sequence);
});

goal.on('result', function(result) {
  console.log('Result: ', result.sequence);
});

goal.send();
📡 토픽 정보
rostopic list 출력
bash
Copy
Edit
/fibonacci/goal  
/fibonacci/feedback  
/fibonacci/result  
/fibonacci/status  
/fibonacci/cancel  
/fibonacci/goal: 목표 전송

/fibonacci/feedback: 피드백 수신

/fibonacci/result: 최종 결과 수신

/fibonacci/status: 현재 진행 상태

