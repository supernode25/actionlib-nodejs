// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 정적 파일 서빙 (index.html, app.js)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
