/**
 * ================================================================
 * axios 활용법 - 실전 예제 모음
 * ================================================================
 * 
 * 이 파일은 axios를 사용한 API 통신의
 * 다양한 실전 예제를 포함하고 있습니다.
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

// ================================================================
// 1. 기본 설정
// ================================================================

// API 인스턴스 생성 (권장)
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,  // 5초 타임아웃
  headers: {
    'Content-Type': 'application/json'
  }
});

// ================================================================
// 2. 요청 인터셉터 (Request Interceptor)
// ================================================================
/**
 * 모든 요청 전에 실행되는 로직
 * 용도: 토큰 추가, 로깅, 권한 검증 등
 */
api.interceptors.request.use(
  config => {
    console.log('📤 요청 시작:', {
      method: config.method.toUpperCase(),
      url: config.url,
      data: config.data
    });
    
    // 예: 토큰이 있으면 헤더에 추가
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  error => {
    console.error('❌ 요청 준비 실패:', error);
    return Promise.reject(error);
  }
);

// ================================================================
// 3. 응답 인터셉터 (Response Interceptor)
// ================================================================
/**
 * 모든 응답을 받을 때 실행되는 로직
 * 용도: 에러 처리, 상태 코드별 처리, 로깅 등
 */
api.interceptors.response.use(
  response => {
    console.log('📥 응답 성공:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('❌ 응답 실패:', error.response?.status);
    
    // 상태 코드별 처리
    if (error.response?.status === 401) {
      // 인증 실패 → 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // 권한 없음
      alert('접근 권한이 없습니다');
    } else if (error.response?.status === 500) {
      // 서버 오류
      alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도하세요');
    }
    
    return Promise.reject(error);
  }
);

// ================================================================
// 4. API 함수들
// ================================================================

// ---- GET 요청 ----

/**
 * 모든 사용자 조회
 */
export const getAllUsers = async () => {
  try {
    const response = await api.get('/step5/users');
    return response.data;
  } catch (error) {
    console.error('사용자 조회 실패:', error);
    throw error;
  }
};

/**
 * 특정 사용자 조회
 * @param {number} userId 사용자 ID
 */
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/step3/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`사용자 ${userId} 조회 실패:`, error);
    throw error;
  }
};

/**
 * 검색 기능
 * @param {object} params 검색 파라미터
 */
export const searchUsers = async (params) => {
  try {
    const response = await api.get('/step4/search', { params });
    return response.data;
  } catch (error) {
    console.error('검색 실패:', error);
    throw error;
  }
};

// ---- POST 요청 ----

/**
 * 새로운 사용자 생성
 * @param {object} userData 사용자 정보
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post('/step5/users', userData);
    return response.data;
  } catch (error) {
    console.error('사용자 생성 실패:', error);
    throw error;
  }
};

// ---- PUT 요청 (전체 수정) ----

/**
 * 사용자 정보 전체 수정 (모든 필드 필요)
 * @param {number} userId 사용자 ID
 * @param {object} userData 수정할 사용자 정보
 */
export const updateUserFull = async (userId, userData) => {
  try {
    const response = await api.put(`/step5/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`사용자 ${userId} 수정 실패:`, error);
    throw error;
  }
};

// ---- PATCH 요청 (부분 수정) ----

/**
 * 사용자 정보 부분 수정 (필요한 필드만)
 * @param {number} userId 사용자 ID
 * @param {object} userData 수정할 필드만 포함
 */
export const updateUserPartial = async (userId, userData) => {
  try {
    const response = await api.patch(`/step5/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`사용자 ${userId} 부분 수정 실패:`, error);
    throw error;
  }
};

// ---- DELETE 요청 ----

/**
 * 사용자 삭제
 * @param {number} userId 사용자 ID
 */
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/step5/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`사용자 ${userId} 삭제 실패:`, error);
    throw error;
  }
};

// ================================================================
// 5. 고급 예제: 순차 요청 (Sequential Requests)
// ================================================================

/**
 * 여러 요청을 순차적으로 실행
 * 예: 사용자 생성 → 데이터 조회 → 확인
 */
export const createAndFetchUser = async (userData) => {
  try {
    // 1. 사용자 생성
    console.log('1️⃣ 사용자 생성 중...');
    const createResponse = await api.post('/step5/users', userData);
    const newUserId = createResponse.data.data.id;
    
    // 2. 생성된 사용자 조회
    console.log('2️⃣ 생성된 사용자 조회 중...');
    const getResponse = await api.get(`/step3/users/${newUserId}`);
    
    // 3. 결과 반환
    console.log('3️⃣ 완료!');
    return {
      created: createResponse.data,
      fetched: getResponse.data
    };
  } catch (error) {
    console.error('순차 요청 실패:', error);
    throw error;
  }
};

// ================================================================
// 6. 고급 예제: 병렬 요청 (Parallel Requests)
// ================================================================

/**
 * 여러 요청을 동시에 실행
 * Promise.all 사용
 */
export const fetchMultipleUsers = async (userIds) => {
  try {
    const promises = userIds.map(id => api.get(`/step3/users/${id}`));
    const results = await Promise.all(promises);
    return results.map(res => res.data);
  } catch (error) {
    console.error('병렬 요청 실패:', error);
    throw error;
  }
};

// ================================================================
// 7. 고급 예제: 재시도 로직 (Retry Logic)
// ================================================================

/**
 * 실패 시 재시도하는 함수
 * @param {function} apiCall 실행할 API 함수
 * @param {number} maxRetries 최대 재시도 횟수
 */
export const withRetry = async (apiCall, maxRetries = 3) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`시도 ${i + 1}/${maxRetries}`);
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      if (i < maxRetries - 1) {
        // 재시도 전에 대기
        const delay = Math.pow(2, i) * 1000; // 지수 백오프
        console.log(`${delay}ms 후 재시도합니다...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};

// 사용 예:
// const data = await withRetry(() => getAllUsers(), 3);

// ================================================================
// 8. 고급 예제: 캐싱 (Caching)
// ================================================================

const cache = new Map();

/**
 * 캐시된 데이터를 반환하거나 API 호출
 */
export const getCachedUsers = async (cacheTime = 5 * 60 * 1000) => {
  const cacheKey = 'all-users';
  const cached = cache.get(cacheKey);
  
  // 캐시가 있고 유효하면 반환
  if (cached && Date.now() - cached.timestamp < cacheTime) {
    console.log('💾 캐시에서 데이터 반환');
    return cached.data;
  }
  
  // 없으면 API 호출
  console.log('🌐 API에서 새로운 데이터 조회');
  const data = await getAllUsers();
  
  // 캐시에 저장
  cache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
  
  return data;
};

// 캐시 초기화
export const clearCache = () => {
  cache.clear();
  console.log('캐시가 초기화되었습니다');
};

// ================================================================
// 9. 사용 예제
// ================================================================


// React 컴포넌트에서 사용

import { getAllUsers, createUser, updateUserPartial, deleteUser } from './api';

function UserComponent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 사용자 조회
  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data.data);
    } catch (error) {
      alert('사용자 조회 실패');
    } finally {
      setLoading(false);
    }
  };

  // 사용자 생성
  const handleCreate = async () => {
    try {
      await createUser({
        name: '새로운 사용자',
        email: 'new@example.com'
      });
      loadUsers(); // 새로고침
    } catch (error) {
      alert('생성 실패');
    }
  };

  // 사용자 수정
  const handleUpdate = async (userId) => {
    try {
      await updateUserPartial(userId, {
        name: '변경된 이름'
      });
      loadUsers(); // 새로고침
    } catch (error) {
      alert('수정 실패');
    }
  };

  // 사용자 삭제
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      loadUsers(); // 새로고침
    } catch (error) {
      alert('삭제 실패');
    }
  };

  return (
    <div>
      <button onClick={loadUsers} disabled={loading}>
        {loading ? '로딩 중...' : '사용자 조회'}
      </button>
      <button onClick={handleCreate}>생성</button>
      {/* ... */}
    </div>
  );
}