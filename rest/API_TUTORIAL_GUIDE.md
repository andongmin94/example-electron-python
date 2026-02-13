# 🚀 API 통신 자습서 - 시작하기

이 자습서는 API 통신의 **기본부터 심화까지**를 **실제 코드**로 배울 수 있도록 구성되었습니다.

---

## 📚 학습 구조

### **Step 1: GET 요청**
- **개념**: 서버에서 데이터를 '조회'할 때 사용
- **특징**: 요청 본문이 없고 URL로만 데이터 전달
- **HTTP 상태 코드**: 200 OK
- **실제 예제**: 게시글 목록, 사용자 프로필 조회
- **학습 코드**: `GET /api/step1/hello`

### **Step 2: POST 요청**
- **개념**: 서버에 새로운 데이터를 '생성'할 때 사용
- **특징**: 요청 본문(body)에 데이터를 포함
- **HTTP 상태 코드**: 201 Created
- **실제 예제**: 게시글 작성, 회원 가입
- **학습 코드**: `POST /api/step2/create-data`
- **요청 형식**:
  ```json
  {
    "name": "홍길동",
    "age": 25
  }
  ```

### **Step 3: 에러 처리와 상태 코드**
- **개념**: HTTP 상태 코드로 요청 결과를 표현
- **주요 상태 코드**:
  - `200`: OK (성공)
  - `201`: Created (생성됨)
  - `400`: Bad Request (잘못된 요청)
  - `404`: Not Found (찾을 수 없음)
  - `500`: Internal Server Error
- **학습 코드**: `GET /api/step3/users/:id`
- **테스트**:
  - 존재하는 사용자: `/api/step3/users/1` → 200
  - 존재하지 않는 사용자: `/api/step3/users/99` → 404

### **Step 4: 쿼리 파라미터**
- **개념**: URL에 `?key=value` 형식으로 파라미터 전달
- **사용 사례**: 검색, 정렬, 필터링, 페이지네이션
- **학습 코드**: `GET /api/step4/search?keyword=홍&page=1&limit=10`
- **요청 예**:
  ```
  GET /api/step4/search?keyword=홍길동
  GET /api/step4/search?keyword=이순신&page=2&limit=5
  ```
- **프론트엔드에서 사용**:
  ```javascript
  const params = new URLSearchParams({
    keyword: '홍길동',
    page: 1,
    limit: 10
  });
  axios.get(`/api/step4/search?${params}`);
  ```

### **Step 5: 완전한 CRUD 작업**
- **개념**: 데이터 조작의 4가지 기본 작업
- **CRUD란**:
  - **C**reate (생성): POST - 새로운 데이터 생성
  - **R**ead (조회): GET - 데이터 조회
  - **U**pdate (수정): PUT/PATCH - 데이터 수정
  - **D**elete (삭제): DELETE - 데이터 삭제

#### **POST - 데이터 생성**
```javascript
axios.post('/api/step5/users', {
  name: '홍길동',
  email: 'hong@example.com'
})
.then(res => console.log('생성됨:', res.data))
.catch(err => console.error('실패:', err));
```

#### **GET - 데이터 조회**
```javascript
// 모든 사용자 조회
axios.get('/api/step5/users')

// 특정 사용자 조회
axios.get('/api/step5/users/1')
```

#### **PUT - 전체 데이터 수정** (모든 필드 필요)
```javascript
axios.put('/api/step5/users/1', {
  name: '신규길동',
  email: 'shin@example.com'
})
// 모든 필드를 지정해야 함
```

#### **PATCH - 부분 데이터 수정** (필요한 필드만)
```javascript
axios.patch('/api/step5/users/1', {
  name: '신규길동'
  // 이메일은 유지됨
})
// 필요한 필드만 지정 가능
```

#### **DELETE - 데이터 삭제**
```javascript
axios.delete('/api/step5/users/1')
.then(res => console.log('삭제됨:', res.data))
.catch(err => console.error('실패:', err));
```

---

## 🎯 실행 방법

### **1단계: 필요한 패키지 설치**

#### 백엔드
```bash
cd backend
npm install express http socket.io cors
```

#### 프론트엔드
```bash
cd frontend
npm install axios
```

### **2단계: 백엔드 서버 시작**

```bash
# 자습서 버전 실행 (권장)
cd backend
node index_tutorial.js

# 또는 기존 파일 실행
node index.js
```

**출력 예**:
```
╔════════════════════════════════════════╗
║  🚀 API 자습서 서버 실행 중 (4000번 포트) ║
║                                        ║
║  📚 학습 순서:                           ║
║  Step 1: GET /api/step1/hello          ║
║  Step 2: POST /api/step2/create-data   ║
║  Step 3: GET /api/step3/users/:id      ║
║  Step 4: GET /api/step4/search         ║
║  Step 5: GET /api/step5/users          ║
║  Step 6: PUT/PATCH/DELETE              ║
╚════════════════════════════════════════╝
```

### **3단계: 프론트엔드 개발 서버 시작**

```bash
cd frontend
npm start
```

브라우저에서 `http://localhost:3000` 열기

---

## 💡 배워야 할 핵심 개념

### 1. **HTTP 메서드 (Methods)**

| 메서드 | 목적 | 요청 본문 | 응답 코드 |
|--------|------|---------|---------|
| GET | 데이터 조회 | ❌ | 200 |
| POST | 데이터 생성 | ✅ | 201 |
| PUT | 전체 데이터 수정 | ✅ | 200 |
| PATCH | 부분 데이터 수정 | ✅ | 200 |
| DELETE | 데이터 삭제 | ❌ | 200/204 |

### 2. **HTTP 상태 코드 (Status Codes)**

- **2xx**: 성공
  - `200`: OK
  - `201`: Created
  - `204`: No Content
- **4xx**: 클라이언트 오류
  - `400`: Bad Request
  - `401`: Unauthorized
  - `404`: Not Found
- **5xx**: 서버 오류
  - `500`: Internal Server Error

### 3. **요청/응답 구조**

#### 요청 (Request)
```javascript
{
  "method": "POST",           // HTTP 메서드
  "url": "/api/users",        // 엔드포인트
  "headers": {                // HTTP 헤더
    "Content-Type": "application/json"
  },
  "body": {                   // 요청 본문 (선택사항)
    "name": "홍길동",
    "email": "hong@example.com"
  }
}
```

#### 응답 (Response)
```javascript
{
  "success": true,            // 성공 여부
  "statusCode": 201,          // HTTP 상태 코드
  "message": "사용자 생성 성공",  // 메시지
  "data": {                   // 실제 데이터
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com"
  },
  "timestamp": "2024-02-02T10:30:00Z"  // 타임스탐프
}
```

### 4. **URL 구조**

```
GET /api/step5/users?keyword=홍&page=1&limit=10
    │   │            │              │
    │   │            │              └── 쿼리 파라미터 (선택사항)
    │   │            └── 엔드포인트 (경로)
    │   └── 기본 경로
    └── HTTP 메서드
```

---

## 🔧 프론트엔드 코드 예제

### axios를 사용한 API 호출

```javascript
import axios from 'axios';

// GET 요청
const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/step5/users');
    console.log('조회 성공:', response.data);
  } catch (error) {
    console.error('조회 실패:', error.response?.data || error.message);
  }
};

// POST 요청
const createUser = async (name, email) => {
  try {
    const response = await axios.post('http://localhost:4000/api/step5/users', {
      name,
      email
    });
    console.log('생성 성공:', response.data);
  } catch (error) {
    console.error('생성 실패:', error.response?.data || error.message);
  }
};

// PUT 요청 (전체 수정)
const updateUserFull = async (id, name, email) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/step5/users/${id}`,
      { name, email }
    );
    console.log('수정 성공:', response.data);
  } catch (error) {
    console.error('수정 실패:', error.response?.data || error.message);
  }
};

// PATCH 요청 (부분 수정)
const updateUserPartial = async (id, updates) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/api/step5/users/${id}`,
      updates  // { name: '변경이름' } 또는 { email: '변경이메일' }
    );
    console.log('부분 수정 성공:', response.data);
  } catch (error) {
    console.error('부분 수정 실패:', error.response?.data || error.message);
  }
};

// DELETE 요청
const deleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/step5/users/${id}`
    );
    console.log('삭제 성공:', response.data);
  } catch (error) {
    console.error('삭제 실패:', error.response?.data || error.message);
  }
};
```

---

## 🧪 터미널에서 테스트하기

### curl 명령어 예제

```bash
# GET 요청
curl http://localhost:4000/api/step1/hello

# POST 요청
curl -X POST http://localhost:4000/api/step2/create-data \
  -H "Content-Type: application/json" \
  -d '{"name":"홍길동","age":25}'

# GET with URL 파라미터
curl "http://localhost:4000/api/step3/users/1"

# GET with 쿼리 파라미터
curl "http://localhost:4000/api/step4/search?keyword=홍"

# PUT 요청
curl -X PUT http://localhost:4000/api/step5/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"신규길동","email":"shin@example.com"}'

# PATCH 요청
curl -X PATCH http://localhost:4000/api/step5/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"변경이름"}'

# DELETE 요청
curl -X DELETE http://localhost:4000/api/step5/users/1
```

---

## 📖 추가 학습 자료

### API 설계 Best Practice

1. **일관된 URL 구조 사용**
   ```
   ❌ /getUser, /addUser, /deleteUser
   ✅ /users (GET, POST, DELETE)
   ```

2. **버전 관리**
   ```
   /api/v1/users      # 버전 1
   /api/v2/users      # 버전 2 (변경사항 있을 때)
   ```

3. **에러 응답 표준화**
   ```javascript
   {
     "success": false,
     "error": {
       "code": "VALIDATION_ERROR",
       "message": "사용자 이름이 필요합니다",
       "details": ["name is required"]
     }
   }
   ```

4. **요청/응답 로깅**
   ```javascript
   console.log('요청:', {
     method: 'POST',
     url: '/api/users',
     data: { name: '홍길동' }
   });
   console.log('응답:', response.data);
   ```

---

## 🎓 다음 단계 학습 주제

1. **인증 & 인가**
   - JWT 토큰
   - OAuth 2.0

2. **데이터 검증**
   - Input validation
   - Schema validation

3. **캐싱**
   - HTTP 캐싱
   - Redis

4. **파일 업로드**
   - FormData 사용
   - Multipart 요청

5. **GraphQL**
   - Query, Mutation
   - Subscription

6. **WebSocket 심화**
   - 실시간 채팅
   - 게임 멀티플레이

---

## ❓ 자주 묻는 질문

### Q: GET과 POST의 차이는?
**A**: GET은 서버 데이터를 조회할 때, POST는 새로운 데이터를 생성할 때 사용합니다.

### Q: PUT과 PATCH의 차이는?
**A**: PUT은 모든 필드를 교체, PATCH는 필요한 필드만 업데이트합니다.

### Q: 상태 코드 201과 200의 차이는?
**A**: 201은 새로운 리소스가 생성됨을, 200은 요청이 성공했음을 나타냅니다.

### Q: 에러 처리는 어떻게 하나요?
**A**: try-catch로 감싸고, error.response?.status로 상태 코드를 확인합니다.

---

**Happy Learning! 🎉**
