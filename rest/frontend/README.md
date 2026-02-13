# 풀스택 웹소켓 & API 프랙티스 샘플

## 구성
- React 프론트엔드: src/components/PracticeComponent.jsx
- Node.js/Express 백엔드: server/index.js
- socket.io 웹소켓 서버

## 실행 방법

### 1. 백엔드 서버 실행
```
cd server
npm install express socket.io cors
node index.js
```

### 2. 프론트엔드 실행
```
npm install axios socket.io-client
npm start
```

## 기능
- REST API: `/api/data`에서 JSON 데이터 반환
- 웹소켓: 실시간 메시지 전송 및 수신

## 연동 흐름
1. 프론트에서 API 요청 → 백엔드에서 응답
2. 프론트에서 웹소켓 연결 → 서버에서 실시간 메시지 수신

---
테스트 및 추가 구현이 필요하면 언제든 요청하세요!
