// public/app.js

let ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
  });
  
  ros.on('connection', () => {
    console.log('✅ rosbridge에 연결됨');
  });
  
  ros.on('error', (err) => {
    console.error('🚫 연결 에러:', err);
  });
  
  ros.on('close', () => {
    console.log('🔌 연결 종료됨');
  });
  
  let fibonacciClient = new ROSLIB.ActionClient({
    ros: ros,
    serverName: '/fibonacci',
    actionName: 'actionlib_tutorials/FibonacciAction'
  });
  
  function sendGoal() {
    const output = document.getElementById('output');
    output.textContent = '';
  
    let goal = new ROSLIB.Goal({
      actionClient: fibonacciClient,
      goalMessage: {
        order: 7
      }
    });
  
    goal.on('feedback', function(feedback) {
      output.textContent += `📩 피드백: ${feedback.sequence}\n`;
    });
  
    goal.on('result', function(result) {
      output.textContent += `✅ 최종 결과: ${result.sequence}\n`;
    });
  
    goal.send();
  }
  