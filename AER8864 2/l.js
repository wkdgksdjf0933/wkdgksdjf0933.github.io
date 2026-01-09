const express = require('express');
const app = express();
const PORT = 5000;

// [미들웨어] 모든 요청에 대해 실행됨
app.use((req, res, next) => {
    // x-forwarded-for는 프록시나 로드밸런서를 거칠 때 실제 IP를 담고 있습니다.
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // 콘솔에 접속 정보 출력
    console.log(`[접속 기록] IP: ${ip} | 시간: ${new Date().toLocaleString()}`);
    
    next(); // 다음 처리(라우터)로 넘겨줌
});

// 메인 페이지 라우트
app.get('/', (req, res) => {
    res.send('<h1>IP 기록 중...</h1><p>당신의 접속 정보가 서버 콘솔에 기록되었습니다.</p>');
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});