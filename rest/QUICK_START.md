# ⚡ 빠른 시작 가이드 (Quick Start)

## 🚀 5분 안에 시작하기

### 1️⃣ 백엔드 서버 시작

```bash
cd backend
npm install express http socket.io cors
node index_tutorial.js
```

**성공 메시지**:
```
🚀 API 자습서 서버 실행 중 (4000번 포트)
```

### 2️⃣ 프론트엔드 앱 시작

**새로운 터미널에서**:
```bash
cd frontend
npm install axios
npm start
```

**브라우저 자동 열기**: `http://localhost:3000`

---

## 📚 학습 순서

### Step 1: 기본 GET 요청 (1분)
```javascript
// 버튼 클릭 → GET /api/step1/hello 호출
// 💡 배우는 것: 가장 기본적인 API 호출
```

### Step 2: POST 요청으로 데이터 생성 (2분)
```javascript
// 이름과 나이를 입력 → POST 요청 → 서버가 데이터 생성
// 💡 배우는 것: 요청 본문에 데이터 포함하기
```

### Step 3: 에러 처리와 상태 코드 (2분)
```javascript
// 존재하는 사용자 조회 → 200 OK
// 존재하지 않는 사용자 조회 → 404 Not Found
// 💡 배우는 것: HTTP 상태 코드의 의미
```

### Step 4: 쿼리 파라미터로 검색 (2분)
```javascript
// 검색어 입력 → ?keyword=검색어 파라미터 추가
// 💡 배우는 것: URL에 파라미터 전달하기
```

### Step 5: CRUD 완전 마스터 (3분)
```javascript
// ✅ CREATE (생성) → POST
// ✅ READ (조회) → GET
// ✅ UPDATE (수정) → PUT/PATCH
// ✅ DELETE (삭제) → DELETE
// 💡 배우는 것: 데이터 조작의 모든 기본 작업
```

---

## 📝 핵심 개념 3줄 요약

| 개념 | 설명 | 예제 |
|------|------|------|
| **HTTP 메서드** | 무엇을 할지 지정 | GET(조회), POST(생성), PUT(수정), DELETE(삭제) |
| **URL** | 어디로 요청할지 지정 | `/api/users/1` |
| **상태 코드** | 결과가 무엇인지 표현 | 200(성공), 404(없음), 500(에러) |

---

## 💻 프론트엔드 코드 패턴

### 기본 패턴
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

// GET 요청
const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/endpoint`);
    console.log('✅ 성공:', response.data);
  } catch (error) {
    console.error('❌ 실패:', error.response?.data || error.message);
  }
};

// POST 요청
const createData = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/endpoint`, data);
    console.log('✅ 생성됨:', response.data);
  } catch (error) {
    console.error('❌ 실패:', error.response?.data || error.message);
  }
};

// PUT 요청 (전체 수정)
const updateDataFull = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/endpoint/${id}`, data);
    console.log('✅ 수정됨:', response.data);
  } catch (error) {
    console.error('❌ 실패:', error.response?.data || error.message);
  }
};

// PATCH 요청 (부분 수정)
const updateDataPartial = async (id, data) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/endpoint/${id}`, data);
    console.log('✅ 부분 수정됨:', response.data);
  } catch (error) {
    console.error('❌ 실패:', error.response?.data || error.message);
  }
};

// DELETE 요청
const deleteData = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/endpoint/${id}`);
    console.log('✅ 삭제됨:', response.data);
  } catch (error) {
    console.error('❌ 실패:', error.response?.data || error.message);
  }
};
```

---

## 🔧 백엔드 코드 패턴

### 기본 패턴
```javascript
const express = require('express');
const app = express();

app.use(express.json());  // JSON 파싱

// 표준화된 응답 함수
const sendResponse = (res, statusCode, data, message) => {
  res.status(statusCode).json({
    success: statusCode < 400,
    data,
    message,
    timestamp: new Date().toISOString()
  });
};

// GET 엔드포인트
app.get('/api/users', (req, res) => {
  try {
    const users = [/* ... */];
    sendResponse(res, 200, users, '조회 성공');
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
});

// POST 엔드포인트
app.post('/api/users', (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return sendResponse(res, 400, null, '이름과 이메일 필요');
    }
    
    const newUser = { id: 1, name, email };
    sendResponse(res, 201, newUser, '생성 성공');
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
});

// PUT 엔드포인트 (전체 수정)
app.put('/api/users/:id', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return sendResponse(res, 400, null, '모든 필드 필요');
  }
  
  const user = { id: req.params.id, name, email };
  sendResponse(res, 200, user, '수정 성공');
});

// PATCH 엔드포인트 (부분 수정)
app.patch('/api/users/:id', (req, res) => {
  const { name, email } = req.body;
  
  if (!name && !email) {
    return sendResponse(res, 400, null, '수정할 내용 필요');
  }
  
  const user = { id: req.params.id, name, email };
  sendResponse(res, 200, user, '부분 수정 성공');
});

// DELETE 엔드포인트
app.delete('/api/users/:id', (req, res) => {
  sendResponse(res, 200, { id: req.params.id }, '삭제 성공');
});

app.listen(4000, () => console.log('서버 실행 중'));
```

---

## 🧪 API 테스트하기

### Option 1: 프론트엔드 앱 (추천)
- http://localhost:3000에서 직접 클릭해서 테스트

### Option 2: curl 명령어
```bash
# GET
curl http://localhost:4000/api/step1/hello

# POST
curl -X POST http://localhost:4000/api/step2/create-data \
  -H "Content-Type: application/json" \
  -d '{"name":"홍길동","age":25}'

# 쿼리 파라미터
curl "http://localhost:4000/api/step4/search?keyword=홍"
```

### Option 3: Postman (앱)
1. Postman 다운로드 & 설치
2. 요청 생성: GET/POST/PUT/DELETE
3. URL 입력: `http://localhost:4000/api/...`
4. Send 클릭

### Option 4: VS Code REST Client 확장
```
파일명: test.http

GET http://localhost:4000/api/step1/hello

###

POST http://localhost:4000/api/step2/create-data
Content-Type: application/json

{
  "name": "홍길동",
  "age": 25
}
```

---

## ⚠️ 흔한 실수와 해결법

| 문제 | 원인 | 해결책 |
|------|------|--------|
| `Cannot GET /api/...` | 백엔드 서버 미실행 | `node index_tutorial.js` 실행 |
| CORS 에러 | 도메인 불일치 | 백엔드에서 CORS 활성화 |
| `404 Not Found` | 잘못된 엔드포인트 | URL 확인 |
| `400 Bad Request` | 필수 필드 누락 | 요청 데이터 확인 |
| 응답이 없음 | 요청 중단 | 네트워크 탭 확인 |

---

## 🎯 오늘의 목표

- [ ] Step 1: GET 요청 이해
- [ ] Step 2: POST 요청 이해
- [ ] Step 3: 상태 코드 이해
- [ ] Step 4: 쿼리 파라미터 이해
- [ ] Step 5: CRUD 완전 마스터

---

## 📚 추가 자료

- **완전한 가이드**: `API_TUTORIAL_GUIDE.md` 읽기
- **백엔드 코드**: `backend/index_tutorial.js`
- **프론트엔드 코드**: `frontend/src/components/TutorialComponent.jsx`

---

**이제 시작하세요! 🚀**
