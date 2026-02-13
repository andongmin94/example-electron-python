# 🎯 API 통신 자습서 - 학습 로드맵

## 📋 개요

이 문서는 API 통신을 **체계적으로 학습**할 수 있는 순서를 제시합니다.

---

## 🗺️ 학습 로드맵

### **Phase 1: 기초 이해 (1시간)**

#### 1️⃣ HTTP 메서드 이해 (15분)
- [ ] GET: 데이터 조회
- [ ] POST: 데이터 생성
- [ ] PUT/PATCH: 데이터 수정 (차이점 이해)
- [ ] DELETE: 데이터 삭제

**학습 파일**: `README_TUTORIAL.md` Step 1-5 섹션

#### 2️⃣ HTTP 상태 코드 이해 (15분)
- [ ] 2xx (성공): 200, 201, 204
- [ ] 4xx (클라이언트 오류): 400, 401, 404
- [ ] 5xx (서버 오류): 500

**학습 파일**: `README_TUTORIAL.md` 상태 코드 섹션

#### 3️⃣ 요청/응답 구조 이해 (15분)
- [ ] HTTP 요청 구조
- [ ] HTTP 응답 구조
- [ ] 헤더와 본문의 역할

**학습 파일**: `README_TUTORIAL.md` 요청/응답 구조 섹션

#### 4️⃣ REST API 원칙 (15분)
- [ ] RESTful 설계
- [ ] URL 구조
- [ ] 메서드와 URL의 관계

**학습 파일**: `README_TUTORIAL.md` 설계 원칙 섹션

---

### **Phase 2: 실습 (2시간)**

#### 5️⃣ 환경 설정 (10분)
```bash
# 백엔드
cd backend
npm install
node index_tutorial.js

# 프론트엔드 (새 터미널)
cd frontend
npm install
npm start
```

#### 6️⃣ Step 1 실습: GET 요청 (20분)
- [ ] 프론트엔드에서 Step 1 버튼 클릭
- [ ] 응답 데이터 확인
- [ ] `curl http://localhost:4000/api/step1/hello` 실행
- [ ] GET의 특징 정리

**학습 코드**: `backend/index_tutorial.js` Step 1 섹션

#### 7️⃣ Step 2 실습: POST 요청 (20분)
- [ ] 프론트엔드에서 이름, 나이 입력 후 제출
- [ ] 응답 데이터 확인
- [ ] `curl -X POST ... -d '{...}'` 실행
- [ ] POST와 GET의 차이점 정리

**학습 코드**: `backend/index_tutorial.js` Step 2 섹션

#### 8️⃣ Step 3 실습: 에러 처리 (20분)
- [ ] 사용자 1 조회 (200 성공)
- [ ] 사용자 99 조회 (404 에러)
- [ ] 에러 응답 데이터 확인
- 상태 코드별 처리 방법 정리

**학습 코드**: `backend/index_tutorial.js` Step 3 섹션

#### 9️⃣ Step 4 실습: 쿼리 파라미터 (20분)
- [ ] 검색어 입력 후 검색
- [ ] 쿼리 파라미터 확인
- [ ] 페이지, limit 파라미터 변경
- [ ] URL 구조 분석

**학습 코드**: `backend/index_tutorial.js` Step 4 섹션

#### 🔟 Step 5 실습: CRUD 완전 마스터 (40분)

**CREATE (생성)**
- [ ] 새로운 사용자 생성
- [ ] 201 상태 코드 확인
- [ ] 생성된 데이터 확인

**READ (조회)**
- [ ] 모든 사용자 조회
- [ ] 특정 사용자 조회
- [ ] 테이블에서 데이터 확인

**UPDATE (수정)**
- [ ] 사용자 수정 (PUT - 전체)
- [ ] 사용자 부분 수정 (PATCH)
- [ ] PUT과 PATCH의 차이 확인

**DELETE (삭제)**
- [ ] 사용자 삭제
- [ ] 목록에서 제거 확인

**학습 코드**: `backend/index_tutorial.js` Step 5 섹션

---

### **Phase 3: 심화 (1시간)**

#### 1️⃣1️⃣ axios 활용법 (20분)
- [ ] `frontend/src/api/axiosExamples.js` 읽기
- [ ] 요청 인터셉터 이해
- [ ] 응답 인터셉터 이해
- [ ] 에러 처리 패턴 학습

**학습 파일**: `frontend/src/api/axiosExamples.js`

#### 1️⃣2️⃣ 실전 패턴 (20분)
- [ ] 데이터 조회 패턴
- [ ] 폼 제출 패턴
- [ ] 데이터 수정 패턴
- [ ] 데이터 삭제 패턴

**학습 파일**: `README_TUTORIAL.md` 실전 패턴 섹션

#### 1️⃣3️⃣ 고급 기능 (20분)
- [ ] 순차 요청 (Sequential)
- [ ] 병렬 요청 (Parallel)
- [ ] 재시도 로직 (Retry)
- [ ] 캐싱 (Caching)

**학습 파일**: `frontend/src/api/axiosExamples.js` 고급 예제 섹션

---

### **Phase 4: 검증 (30분)**

#### 1️⃣4️⃣ 스스로 API 만들기
- [ ] 새로운 엔드포인트 만들기
- [ ] GET, POST, PUT, DELETE 모두 구현
- [ ] 에러 처리 추가
- [ ] 프론트엔드에서 호출

#### 1️⃣5️⃣ 테스트 실행
```bash
# 자동 테스트 스크립트 실행
bash test-api.sh

# 또는 curl 직접 실행
curl http://localhost:4000/api/step1/hello
```

#### 1️⃣6️⃣ 작은 프로젝트 만들기
- [ ] 간단한 TODO 앱
- [ ] 게시판 앱
- [ ] 연락처 관리 앱

---

## 📚 각 단계별 핵심 개념

### Step 1: GET 요청
```
개념: 조회
메서드: GET
상태코드: 200 (성공)
본문: 없음 (URL에만 데이터)
예: 게시글 목록, 사용자 정보 조회
```

### Step 2: POST 요청
```
개념: 생성
메서드: POST
상태코드: 201 (생성됨)
본문: JSON 데이터
예: 게시글 작성, 회원 가입
```

### Step 3: 상태 코드와 에러
```
성공: 200 (OK), 201 (Created)
클라이언트 오류: 400, 401, 404
서버 오류: 500
처리: try-catch + 상태코드 확인
```

### Step 4: 쿼리 파라미터
```
형식: /api/search?keyword=값&page=값
용도: 검색, 필터링, 정렬, 페이지네이션
전달: GET 요청과 함께
예: /api/users?search=홍&page=2&limit=10
```

### Step 5: CRUD
```
CREATE: POST   /api/users
READ:   GET    /api/users 또는 /api/users/1
UPDATE: PUT    /api/users/1 (전체) 또는 PATCH (부분)
DELETE: DELETE /api/users/1
```

---

## ✅ 학습 체크리스트

### Phase 1: 기초
- [ ] HTTP 메서드 5가지 이해
- [ ] HTTP 상태 코드 주요 코드 이해
- [ ] 요청/응답 구조 이해
- [ ] REST API 원칙 이해

### Phase 2: 실습
- [ ] Step 1 (GET) 실습 완료
- [ ] Step 2 (POST) 실습 완료
- [ ] Step 3 (상태 코드) 실습 완료
- [ ] Step 4 (쿼리 파라미터) 실습 완료
- [ ] Step 5 (CRUD) 실습 완료

### Phase 3: 심화
- [ ] axios 기본 사용법 학습
- [ ] 요청/응답 인터셉터 학습
- [ ] 실전 패턴 학습
- [ ] 고급 기능 학습

### Phase 4: 검증
- [ ] 새 엔드포인트 구현
- [ ] 테스트 실행
- [ ] 자동 테스트 스크립트 실행
- [ ] 작은 프로젝트 완성

---

## 🎯 학습 팁

### 1. 차근차근 진행
- 급할 필요 없음
- 각 단계를 완전히 이해한 후 다음으로
- 코드를 직접 작성해보기

### 2. 손으로 코드 작성
- 복사-붙여넣기보다는 직접 입력
- 오타를 만들면서 배움
- 실수를 통해 깊이 있게 학습

### 3. 테스트하기
- 매 단계마다 실제로 작동 확인
- 브라우저 개발자 도구 활용 (F12)
- 네트워크 탭에서 요청/응답 확인

### 4. 정리하기
- 각 개념을 노트에 정리
- 코드 예제를 직접 작성해보기
- 생각을 글로 표현해보기

### 5. 반복하기
- 몇 번 반복해서 익숙해지기
- 새로운 상황에 적용해보기
- 패턴을 인식하기

---

## 🔗 파일별 사용 가이드

| 파일 | 용도 | 학습 시간 |
|------|------|---------|
| `QUICK_START.md` | 빠르게 시작 | 5분 |
| `README_TUTORIAL.md` | 완전한 설명 | 30분 |
| `API_TUTORIAL_GUIDE.md` | 상세 가이드 | 1시간 |
| `backend/index_tutorial.js` | 서버 코드 | 실습용 |
| `frontend/src/components/TutorialComponent.jsx` | 클라이언트 코드 | 실습용 |
| `frontend/src/api/axiosExamples.js` | axios 예제 | 심화학습 |
| `test-api.sh` | API 테스트 | 검증용 |

---

## 📊 예상 학습 시간

- **Phase 1 (기초)**: 1시간
- **Phase 2 (실습)**: 2시간
- **Phase 3 (심화)**: 1시간
- **Phase 4 (검증)**: 30분

**총 예상 시간: 4시간 30분**

---

## 🎓 학습 완료 후

### 할 수 있는 것
- ✅ REST API 설계 및 구현
- ✅ axios를 사용한 API 호출
- ✅ 에러 처리 및 상태 코드 활용
- ✅ CRUD 작업 완벽 이해
- ✅ 요청/응답 구조 이해

### 다음 학습 주제
1. **인증 & 보안**
   - JWT 토큰
   - OAuth 2.0

2. **데이터 검증**
   - Input validation
   - Schema validation

3. **데이터베이스**
   - MongoDB, PostgreSQL
   - ORM (Sequelize, Prisma)

4. **고급 API 기능**
   - 페이지네이션
   - 캐싱
   - Rate limiting

5. **GraphQL**
   - Query, Mutation
   - Subscription

---

## 💡 자주 하는 실수 방지

### ❌ 하지 말아야 할 것
- 이해하지 않고 코드 복사하기
- 프레임워크를 먼저 배우기
- 한 번에 모든 것 배우려고 하기
- 오류를 무시하고 진행하기

### ✅ 해야 할 것
- 개념부터 이해하기
- 기초를 탄탄히 하기
- 단계를 따라 진행하기
- 오류를 읽고 해결하기

---

## 📞 도움 받기

### 문제가 생겼을 때
1. 에러 메시지 전체 읽기
2. 브라우저 개발자 도구 확인 (F12)
3. 서버 터미널 로그 확인
4. 다시 한 번 차근차근 따라하기

### 자주 나는 문제

**문제**: "Cannot GET /api/..."
**해결**: 백엔드 서버 `node index_tutorial.js` 실행 확인

**문제**: CORS 에러
**해결**: 백엔드에서 CORS 설정 확인 (이미 설정됨)

**문제**: 응답이 안 보임
**해결**: 브라우저 개발자 도구 → Network 탭 확인

---

**화이팅! 🚀 You got this!**

Last Updated: 2024년 2월 2일
