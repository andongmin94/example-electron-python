# 📚 API 통신 자습서 - 완전 가이드

## 🎯 개요

이 자습서는 **REST API 통신**의 모든 것을 **Step by Step**으로 학습할 수 있도록 구성되어 있습니다.

### 학습 내용
- ✅ HTTP 메서드 (GET, POST, PUT, PATCH, DELETE)
- ✅ REST API 설계 원칙
- ✅ 요청/응답 구조
- ✅ HTTP 상태 코드
- ✅ 에러 처리
- ✅ 쿼리 파라미터와 URL 파라미터
- ✅ CRUD 작업 (Create, Read, Update, Delete)
- ✅ axios 라이브러리 사용법
- ✅ 실제 프로젝트 적용 사례

---

## 📁 프로젝트 구조

```
TEST/
├── backend/
│   ├── index.js                 # 기존 서버 (원본)
│   ├── index_tutorial.js        # 자습서 서버 (권장) ⭐
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PracticeComponent.jsx      # 기존 컴포넌트
│   │   │   ├── TutorialComponent.jsx      # 자습서 컴포넌트 (권장) ⭐
│   │   │   └── TutorialComponent.css      # 스타일
│   │   ├── api/
│   │   │   └── axiosExamples.js          # axios 활용법 예제
│   │   ├── App.js               # 메인 앱
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── README.md
├── QUICK_START.md               # 빠른 시작 가이드 ⭐
├── API_TUTORIAL_GUIDE.md        # 완전 가이드 ⭐
├── test-api.sh                  # API 테스트 스크립트
└── README.md                    # 프로젝트 설명
```

---

## 🚀 즉시 시작하기

### 1단계: 백엔드 시작

```bash
cd backend
npm install express http socket.io cors
node index_tutorial.js
```

**기대 결과**:
```
🚀 API 자습서 서버 실행 중 (4000번 포트)
```

### 2단계: 프론트엔드 시작

```bash
cd frontend
npm install axios
npm start
```

**기대 결과**: 브라우저에서 `http://localhost:3000` 자동 열기

### 3단계: 학습 시작

- Step 1부터 Step 5까지 차례대로 클릭해서 진행
- 각 단계에서 코드 실행 → 응답 확인 → 개념 이해

---

## 📖 Step별 학습 내용

### **Step 1: GET 요청** (기본)

#### 개념
- 서버에서 데이터를 **조회**할 때 사용
- 요청 본문 없음
- 멱등성 보장 (같은 요청 = 같은 결과)

#### 코드
```javascript
// 프론트엔드
const response = await axios.get('/api/step1/hello');
console.log(response.data);

// 백엔드
app.get('/api/step1/hello', (req, res) => {
  res.json({ message: 'GET 요청 성공' });
});
```

#### 학습 포인트
- GET은 데이터 조회용
- URL로만 정보 전달
- 멀티플 요청 가능

---

### **Step 2: POST 요청** (데이터 생성)

#### 개념
- 서버에 새로운 데이터를 **생성**할 때 사용
- 요청 본문에 데이터 포함
- 상태 코드 201 반환 (Created)

#### 코드
```javascript
// 프론트엔드
const response = await axios.post('/api/step2/create-data', {
  name: '홍길동',
  age: 25
});

// 백엔드
app.post('/api/step2/create-data', (req, res) => {
  const { name, age } = req.body;
  res.status(201).json({
    createdData: { id: 1, name, age }
  });
});
```

#### 학습 포인트
- 요청 본문에 JSON 데이터 포함
- 201 상태 코드는 리소스 생성 의미
- 데이터 검증 필수

---

### **Step 3: 상태 코드와 에러 처리**

#### 개념
- HTTP 상태 코드로 요청 결과 표현
- 에러 핸들링의 기초

#### 주요 상태 코드

| 코드 | 의미 | 예시 |
|------|------|------|
| 200 | OK | 요청 성공 |
| 201 | Created | 리소스 생성됨 |
| 204 | No Content | 성공했지만 반환 데이터 없음 |
| 400 | Bad Request | 잘못된 요청 (필수 필드 누락 등) |
| 401 | Unauthorized | 인증 필요 |
| 403 | Forbidden | 권한 없음 |
| 404 | Not Found | 리소스를 찾을 수 없음 |
| 500 | Server Error | 서버 오류 |

#### 코드
```javascript
// 프론트엔드
try {
  const response = await axios.get('/api/step3/users/1');
  console.log('성공:', response.data);
} catch (error) {
  if (error.response?.status === 404) {
    console.log('사용자를 찾을 수 없습니다');
  } else if (error.response?.status === 500) {
    console.log('서버 오류');
  }
}

// 백엔드
app.get('/api/step3/users/:id', (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
  }
  res.status(200).json(user);
});
```

#### 학습 포인트
- 2xx: 성공
- 4xx: 클라이언트 오류
- 5xx: 서버 오류
- 에러 응답도 JSON으로

---

### **Step 4: 쿼리 파라미터**

#### 개념
- URL에 `?key=value` 형식으로 파라미터 전달
- 검색, 필터링, 정렬, 페이지네이션에 사용
- GET 요청에서 주로 사용

#### URL 구조
```
/api/step4/search?keyword=홍&page=1&limit=10
                  └─────────────────────────┘
                    쿼리 파라미터
```

#### 코드
```javascript
// 프론트엔드
const params = {
  keyword: '홍길동',
  page: 1,
  limit: 10
};
const response = await axios.get('/api/step4/search', { params });
// 실제 URL: /api/step4/search?keyword=홍길동&page=1&limit=10

// 백엔드
app.get('/api/step4/search', (req, res) => {
  const { keyword, page, limit } = req.query;
  // keyword = '홍길동'
  // page = '1'
  // limit = '10'
  
  const results = searchData(keyword, page, limit);
  res.json(results);
});
```

#### 학습 포인트
- URL에 보이므로 민감한 정보는 피할 것
- 여러 조건의 필터링에 사용
- 북마크 가능 (GET의 장점)

---

### **Step 5: 완전한 CRUD**

#### 개념
- **C**reate: POST로 데이터 생성
- **R**ead: GET으로 데이터 조회
- **U**pdate: PUT/PATCH로 데이터 수정
- **D**elete: DELETE로 데이터 삭제

#### 5-1. CREATE (POST)
```javascript
// 프론트엔드
const response = await axios.post('/api/step5/users', {
  name: '홍길동',
  email: 'hong@example.com'
});
// 201 Created 반환

// 백엔드
app.post('/api/step5/users', (req, res) => {
  const newUser = { id: 1, ...req.body };
  res.status(201).json(newUser);
});
```

#### 5-2. READ (GET)
```javascript
// 프론트엔드
// 모든 데이터
const allUsers = await axios.get('/api/step5/users');

// 특정 데이터
const user = await axios.get('/api/step5/users/1');

// 백엔드
app.get('/api/step5/users', (req, res) => {
  res.json(allUsers);
});

app.get('/api/step5/users/:id', (req, res) => {
  const user = findUser(req.params.id);
  res.json(user);
});
```

#### 5-3. UPDATE (PUT vs PATCH)

**PUT - 전체 수정 (모든 필드 필요)**
```javascript
// 프론트엔드
await axios.put('/api/step5/users/1', {
  name: '변경된이름',
  email: 'new@example.com'
  // 모든 필드를 지정해야 함
});

// 백엔드
app.put('/api/step5/users/:id', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: '모든 필드 필요' });
  }
  res.json(updatedUser);
});
```

**PATCH - 부분 수정 (필요한 필드만)**
```javascript
// 프론트엔드
await axios.patch('/api/step5/users/1', {
  name: '변경된이름'
  // email은 유지됨
});

// 백엔드
app.patch('/api/step5/users/:id', (req, res) => {
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(updatedUser);
});
```

#### 5-4. DELETE
```javascript
// 프론트엔드
await axios.delete('/api/step5/users/1');

// 백엔드
app.delete('/api/step5/users/:id', (req, res) => {
  deleteUser(req.params.id);
  res.status(200).json({ message: '삭제됨' });
});
```

---

## 💻 실전 패턴

### 패턴 1: 기본 데이터 조회
```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await axios.get('/api/data');
    setData(response.data);
    setError(null);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []);
```

### 패턴 2: 폼 제출
```javascript
const [formData, setFormData] = useState({ name: '', email: '' });
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await axios.post('/api/users', formData);
    setFormData({ name: '', email: '' });
    // 목록 새로고침
  } catch (err) {
    alert('제출 실패: ' + err.message);
  } finally {
    setLoading(false);
  }
};
```

### 패턴 3: 데이터 수정
```javascript
const handleEdit = async (userId, updates) => {
  try {
    // PUT: 전체 수정
    await axios.put(`/api/users/${userId}`, fullData);
    
    // 또는 PATCH: 부분 수정
    await axios.patch(`/api/users/${userId}`, partialData);
    
    // 목록 새로고침
  } catch (err) {
    alert('수정 실패: ' + err.message);
  }
};
```

### 패턴 4: 데이터 삭제
```javascript
const handleDelete = async (userId) => {
  if (!window.confirm('정말 삭제하시겠습니까?')) return;
  
  try {
    await axios.delete(`/api/users/${userId}`);
    // 목록에서 제거 또는 새로고침
  } catch (err) {
    alert('삭제 실패: ' + err.message);
  }
};
```

---

## 🧪 테스트 방법

### 1. 프론트엔드 UI (가장 쉬움)
http://localhost:3000에서 직접 클릭

### 2. curl 명령어
```bash
# Windows PowerShell에서
curl http://localhost:4000/api/step1/hello | ConvertFrom-Json

# macOS/Linux 터미널에서
curl http://localhost:4000/api/step1/hello | jq .
```

### 3. Postman (앱)
1. Postman 다운로드
2. 새 요청 생성
3. URL 입력 및 메서드 선택
4. Send 클릭

### 4. VS Code REST Client 확장
```rest
GET http://localhost:4000/api/step1/hello

###

POST http://localhost:4000/api/step2/create-data
Content-Type: application/json

{
  "name": "테스트",
  "age": 25
}
```

---

## 📚 추가 개념

### API 설계 Best Practice

1. **RESTful URL 설계**
   ```
   ✅ GET    /api/users           (목록)
   ✅ POST   /api/users           (생성)
   ✅ GET    /api/users/1         (조회)
   ✅ PUT    /api/users/1         (수정)
   ✅ DELETE /api/users/1         (삭제)
   
   ❌ GET /getUser, POST /addUser (메서드를 URL에)
   ❌ GET /user/id=1 (파라미터 표기)
   ```

2. **버전 관리**
   ```
   /api/v1/users    (버전 1)
   /api/v2/users    (버전 2 - 큰 변화)
   ```

3. **에러 응답 표준화**
   ```javascript
   {
     "success": false,
     "error": {
       "code": "VALIDATION_ERROR",
       "message": "입력값이 유효하지 않습니다",
       "details": ["name is required"]
     },
     "timestamp": "2024-02-02T10:30:00Z"
   }
   ```

4. **CORS 설정**
   ```javascript
   const cors = require('cors');
   app.use(cors()); // 모든 출처 허용
   
   // 또는 특정 출처만
   app.use(cors({
     origin: ['http://localhost:3000'],
     credentials: true
   }));
   ```

---

## 🔐 보안 고려사항

### 1. 민감한 정보
```javascript
// ❌ 쿼리 파라미터에 비밀번호 전송
GET /api/users/login?password=secret123

// ✅ POST 요청의 본문에 전송
POST /api/users/login
{
  "username": "user",
  "password": "secret123"
}
```

### 2. 인증/인가
```javascript
// 요청 헤더에 토큰 포함
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

// 백엔드에서 검증
const token = req.headers.authorization?.split(' ')[1];
if (!token) {
  return res.status(401).json({ error: '인증 필요' });
}
```

### 3. 입력 검증
```javascript
// 항상 사용자 입력 검증
if (!req.body.email || !req.body.email.includes('@')) {
  return res.status(400).json({ error: '유효한 이메일 필요' });
}
```

---

## 🎓 다음 학습 주제

1. **인증**
   - JWT (JSON Web Token)
   - OAuth 2.0
   - 세션 기반 인증

2. **데이터 검증**
   - 입력 검증
   - 스키마 검증

3. **캐싱**
   - HTTP 캐싱
   - Redis 캐시

4. **고급 API 기능**
   - 페이지네이션
   - 정렬 및 필터링
   - 검색

5. **GraphQL**
   - Query
   - Mutation
   - Subscription

6. **WebSocket**
   - 실시간 채팅
   - 실시간 알림

---

## ❓ FAQ

**Q: POST와 PUT의 차이는?**
A: POST는 서버가 리소스를 생성 (ID 자동 할당), PUT은 클라이언트가 리소스 위치를 지정하고 전체를 교체합니다.

**Q: PUT과 PATCH의 차이는?**
A: PUT은 모든 필드를 교체, PATCH는 필요한 필드만 업데이트합니다.

**Q: GET으로 데이터를 생성할 수 있나?**
A: 기술적으로는 가능하지만, REST 원칙상 하면 안 됩니다. GET은 조회용입니다.

**Q: 상태 코드 200과 201의 차이는?**
A: 200은 일반적인 성공, 201은 새로운 리소스가 생성됨을 나타냅니다.

**Q: 에러는 어떻게 처리해야 하나?**
A: try-catch로 감싸고, error.response?.status로 상태 코드를 확인합니다.

---

## 📖 참고 자료

- [MDN - HTTP 개요](https://developer.mozilla.org/ko/docs/Web/HTTP)
- [REST API 설계 가이드](https://restfulapi.net/)
- [HTTP 상태 코드](https://http.cat/)
- [axios 문서](https://axios-http.com/)

---

**Happy Learning! 🎉**

마지막 수정: 2024년 2월 2일
