# roslibjs + actionlib 웹 클라이언트 실습

roslibjs를 활용해서 웹 브라우저에서 ROS의 `actionlib` 서버와 통신해봄. 예제는 `move_base` 액션 서버를 기준으로 구성됨. 웹에서 goal을 보내고, 중간 피드백과 결과를 받아오는 구조임.

## 📂 프로젝트 구조

```
roslibjs-actionlib/
├── public/
│   ├── index.html     ← 웹 클라이언트 화면
│   └── app.js         ← roslibjs 로직
├── server.js          ← Node.js 웹 서버
└── package.json       ← npm 설정
```

## 🚀 실행 방법

1. ROS core 실행  
   ```bash
   roscore
   ```

2. move_base 액션 서버 실행  
   ```bash
   rosrun move_base move_base
   ```

3. rosbridge 서버 실행  
   ```bash
   roslaunch rosbridge_server rosbridge_websocket.launch
   ```

4. Node.js 웹 서버 실행  
   ```bash
   node server.js
   ```

5. 웹 브라우저에서 접속  
   ```
   http://localhost:3000
   ```

## ✅ 확인할 토픽

```bash
rostopic list
```

- `/move_base/goal`
- `/move_base/feedback`
- `/move_base/result`
- `/move_base/status`
- 등등…

`/move_base`가 base 토픽이고, actionlib 구조에 따라 `goal`, `feedback`, `result` 등이 자동으로 생성됨.

## 🧩 핵심 개념

- `goal.send()` 호출 시, `/move_base/goal` 토픽으로 메시지가 발행됨
- 액션 서버가 실행 중이면 `/move_base/feedback`, `/move_base/result` 등을 통해 피드백이 들어옴
