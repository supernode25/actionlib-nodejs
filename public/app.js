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

// move_base 액션 클라이언트로 변경
let moveBaseClient = new ROSLIB.ActionClient({
  ros: ros,
  serverName: '/move_base',
  actionName: 'move_base_msgs/MoveBaseAction'
});

function sendGoal() {
  const output = document.getElementById('output');
  output.textContent = '';

  let goal = new ROSLIB.Goal({
    actionClient: moveBaseClient,
    goalMessage: {
      target_pose: {
        header: {
          frame_id: 'map',  // 보통 map 또는 odom 프레임
          stamp: { secs: 0, nsecs: 100 }
        },
        pose: {
          position: { x: 1.549, y: -0.094, z: 0.0 },
          orientation: { x: 0.0117, y: 0.0005, z: -0.0028, w: 0.9999 }  // 직진 방향
        }
      }
    }
  });

  goal.on('feedback', function(feedback) {
    output.textContent += `📩 피드백 위치: x=${feedback.base_position.pose.position.x.toFixed(2)}, y=${feedback.base_position.pose.position.y.toFixed(2)}\n`;
  });

  goal.on('result', function(result) {
    output.textContent += `✅ 도착 완료\n`;
  });

  goal.send();
}
