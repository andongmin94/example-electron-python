/**
 * ================================================================
 * API 통신 자습서 - Step by Step
 * ================================================================
 * 
 * 이 파일은 REST API와 WebSocket 통신의 기본부터 심화까지를 
 * 단계별로 학습할 수 있도록 구성되어 있습니다.
 * 
 * 학습 순서:
 * 1. Step 1 - 기본 REST API (GET)
 * 2. Step 2 - POST 요청 처리
 * 3. Step 3 - 에러 처리와 상태 코드
 * 4. Step 4 - URL 파라미터와 쿼리 파라미터
 * 5. Step 5 - 표준화된 응답 구조
 * 6. Step 6 - WebSocket 기본
 * 7. Step 7 - WebSocket 고급 (방 기능)
 * ================================================================
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // JSON 요청 본문 파싱

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// ================================================================
// STEP 1: 기본 REST API - GET 요청
// ================================================================
/**
 * 개념: 클라이언트가 서버에서 데이터를 '조회'할 때 사용
 * 특징: 요청 본문이 없고, URL로만 데이터를 전달
 * 예제: 게시글 목록 조회, 사용자 정보 조회 등
 */
app.get('/api/step1/hello', (req, res) => {
  res.json({
    message: '🎓 Step 1: GET 요청 성공!',
    concept: 'GET 메서드는 서버의 데이터를 조회할 때 사용합니다'
  });
});

// ================================================================
// STEP 2: POST 요청 처리하기
// ================================================================
/**
 * 개념: 클라이언트가 서버에 데이터를 '생성'할 때 사용
 * 특징: 요청 본문에 데이터를 포함, 상태 코드 201 반환
 * 예제: 게시글 작성, 사용자 가입 등
 */
app.post('/api/step2/create-data', (req, res) => {
  // req.body: 클라이언트가 보낸 데이터
  const { name, age } = req.body;

  // 데이터 검증
  if (!name || !age) {
    return res.status(400).json({
      error: '이름과 나이가 필요합니다'
    });
  }

  // 생성된 데이터 반환 (실제로는 DB에 저장)
  res.status(201).json({
    message: '🎓 Step 2: POST 요청 성공!',
    createdData: {
      id: 1,
      name,
      age,
      createdAt: new Date()
    }
  });
});

// ================================================================
// STEP 3: 에러 처리와 HTTP 상태 코드
// ================================================================
/**
 * HTTP 상태 코드:
 * - 200 OK: 요청 성공
 * - 201 Created: 리소스 생성 성공
 * - 400 Bad Request: 잘못된 요청
 * - 404 Not Found: 리소스를 찾을 수 없음
 * - 500 Internal Server Error: 서버 오류
 */

// 데이터베이스 예시
const users = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
  { id: 2, name: '이순신', email: 'lee@example.com' },
  { id: 3, name: '장보고', email: 'jang@example.com' }
];

app.get('/api/step3/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      error: '사용자를 찾을 수 없습니다',
      code: 'USER_NOT_FOUND'
    });
  }

  res.status(200).json({
    message: '🎓 Step 3: 상태 코드 활용!',
    data: user
  });
});

// ================================================================
// STEP 4: URL 파라미터와 쿼리 파라미터
// ================================================================
/**
 * URL 파라미터: /api/users/123 - 특정 리소스 식별
 *   예: /api/step4/users/:id
 *   req.params.id = '123'
 *
 * 쿼리 파라미터: /api/users?page=1&limit=10 - 필터링/정렬
 *   예: GET /api/step4/search?keyword=홍&page=1
 *   req.query.keyword = '홍'
 *   req.query.page = '1'
 */

app.get('/api/step4/search', (req, res) => {
  const { keyword, page = 1, limit = 10 } = req.query;

  if (!keyword) {
    return res.status(400).json({
      error: '검색 키워드가 필요합니다'
    });
  }

  // 검색 로직
  const filtered = users.filter(u => u.name.includes(keyword));

  res.json({
    message: '🎓 Step 4: 쿼리 파라미터 활용!',
    query: {
      keyword,
      page: parseInt(page),
      limit: parseInt(limit)
    },
    results: filtered,
    count: filtered.length
  });
});

// 예제 요청:
// GET /api/step4/search?keyword=홍
// GET /api/step4/search?keyword=홍&page=2&limit=5

// ================================================================
// STEP 5: 표준화된 응답 구조
// ================================================================
/**
 * 개념: API의 모든 응답을 일관된 형식으로 통일
 * 장점:
 * - 클라이언트에서 응답 처리가 쉬움
 * - 에러 처리가 일관됨
 * - 유지보수가 쉬움
 */

// 표준화된 응답 유틸리티 함수
const sendStandardResponse = (res, statusCode, success, data, message) => {
  res.status(statusCode).json({
    success,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

app.get('/api/step5/users', (req, res) => {
  try {
    sendStandardResponse(res, 200, true, users, '사용자 목록 조회 성공');
  } catch (error) {
    sendStandardResponse(res, 500, false, null, error.message);
  }
});

app.get('/api/step5/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return sendStandardResponse(res, 404, false, null, '사용자를 찾을 수 없습니다');
    }

    sendStandardResponse(res, 200, true, user, '사용자 조회 성공');
  } catch (error) {
    sendStandardResponse(res, 500, false, null, error.message);
  }
});

app.post('/api/step5/users', (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return sendStandardResponse(res, 400, false, null, '이름과 이메일이 필요합니다');
    }

    const newUser = {
      id: users.length + 1,
      name,
      email
    };
    users.push(newUser);

    sendStandardResponse(res, 201, true, newUser, '사용자 생성 성공');
  } catch (error) {
    sendStandardResponse(res, 500, false, null, error.message);
  }
});

// ================================================================
// STEP 6: PUT & PATCH - 데이터 업데이트
// ================================================================
/**
 * PUT: 전체 데이터를 교체 (모든 필드 필요)
 * PATCH: 부분 데이터만 업데이트 (필요한 필드만)
 */

app.put('/api/step5/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = users.find(u => u.id === userId);

  if (!user) {
    return sendStandardResponse(res, 404, false, null, '사용자를 찾을 수 없습니다');
  }

  // PUT: 모든 필드를 교체
  if (!name || !email) {
    return sendStandardResponse(res, 400, false, null, '모든 필드(name, email)가 필요합니다');
  }

  user.name = name;
  user.email = email;
  sendStandardResponse(res, 200, true, user, '사용자 전체 업데이트 완료');
});

app.patch('/api/step5/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = users.find(u => u.id === userId);

  if (!user) {
    return sendStandardResponse(res, 404, false, null, '사용자를 찾을 수 없습니다');
  }

  // PATCH: 필요한 필드만 업데이트
  if (name) user.name = name;
  if (email) user.email = email;

  sendStandardResponse(res, 200, true, user, '사용자 부분 업데이트 완료');
});

app.delete('/api/step5/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return sendStandardResponse(res, 404, false, null, '사용자를 찾을 수 없습니다');
  }

  const deletedUser = users.splice(index, 1);
  sendStandardResponse(res, 200, true, deletedUser[0], '사용자 삭제 완료');
});

// ================================================================
// STEP 7: WebSocket - 기본 실시간 통신
// ================================================================
/**
 * 개념: 웹소켓은 양방향 통신 채널을 제공
 * REST API: 클라이언트가 먼저 요청하고 서버가 응답
 * WebSocket: 서버와 클라이언트가 자유롭게 메시지를 주고받음
 */

io.on('connection', (socket) => {
  console.log(`✅ [WebSocket] 클라이언트 연결됨: ${socket.id}`);

  // 연결 시 환영 메시지 전송
  socket.emit('message', {
    type: 'WELCOME',
    message: '🎓 Step 7: WebSocket 연결 성공!',
    socketId: socket.id
  });

  // 클라이언트로부터 메시지 수신
  socket.on('sendMessage', (data) => {
    console.log(`📨 받은 메시지: ${data.message}`);

    // 메시지 반향 (echo)
    socket.emit('message', {
      type: 'ECHO',
      message: `서버가 받은 메시지: ${data.message}`,
      timestamp: new Date()
    });
  });

  // 연결 해제
  socket.on('disconnect', () => {
    console.log(`❌ [WebSocket] 클라이언트 연결 해제: ${socket.id}`);
  });
});

// ================================================================
// STEP 8: WebSocket - 고급 (브로드캐스트, 방)
// ================================================================
/**
 * broadcast: 자신을 제외한 모든 클라이언트에게 메시지 전송
 * io.emit: 모든 클라이언트에게 메시지 전송 (자신 포함)
 * room: 특정 그룹의 클라이언트들에게만 메시지 전송
 */

io.on('connection', (socket) => {
  // 특정 방(room)에 참가
  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    console.log(`👥 ${socket.id}가 방 ${roomName}에 참가했습니다`);

    // 같은 방의 다른 클라이언트들에게 알림
    socket.to(roomName).emit('notification', {
      message: `새로운 사용자가 방에 참가했습니다`,
      timestamp: new Date()
    });
  });

  // 방에 메시지 전송
  socket.on('roomMessage', (data) => {
    const { roomName, message } = data;
    console.log(`💬 [${roomName}] ${message}`);

    io.to(roomName).emit('roomMessage', {
      message,
      senderId: socket.id,
      timestamp: new Date()
    });
  });

  // 방 나가기
  socket.on('leaveRoom', (roomName) => {
    socket.leave(roomName);
    console.log(`👋 ${socket.id}가 방 ${roomName}에서 나갔습니다`);
  });
});

// ================================================================
// 에러 처리 미들웨어 (모든 에러 캐치)
// ================================================================
app.use((err, req, res, next) => {
  console.error('❌ 에러 발생:', err);
  sendStandardResponse(res, 500, false, null, err.message);
});

// ================================================================
// 서버 시작
// ================================================================
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 API 자습서 서버 실행 중 (${PORT}번 포트)    ║
║                                        ║
║  📚 학습 순서:                           ║
║  Step 1: GET /api/step1/hello          ║
║  Step 2: POST /api/step2/create-data   ║
║  Step 3: GET /api/step3/users/:id      ║
║  Step 4: GET /api/step4/search         ║
║  Step 5: GET /api/step5/users          ║
║  Step 6: PUT/PATCH/DELETE              ║
║  Step 7-8: WebSocket 테스트             ║
╚════════════════════════════════════════╝
  `);
});
