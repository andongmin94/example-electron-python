/**
 * ================================================================
 * API 통신 자습서 - 프론트엔드 (Step by Step)
 * ================================================================
 * 
 * 이 컴포넌트는 백엔드의 각 단계와 대응되며,
 * 실제로 API를 호출하고 테스트할 수 있습니다.
 */

import { useState } from 'react';
import axios from 'axios';
import './TutorialComponent.css'; // 스타일 파일

const API_BASE_URL = 'http://localhost:4000/api';

function TutorialComponent() {
  // ================================================================
  // 상태 관리
  // ================================================================
  const [activeStep, setActiveStep] = useState(1);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Step 2 - POST 데이터
  const [step2Data, setStep2Data] = useState({ name: '', age: '' });

  // Step 4 - 검색 데이터
  const [step4Search, setStep4Search] = useState({ keyword: '', page: 1, limit: 10 });

  // Step 5 - CRUD 데이터
  const [step5Users, setStep5Users] = useState([]);
  const [step5Form, setStep5Form] = useState({ name: '', email: '' });
  const [step5EditId, setStep5EditId] = useState(null);

  // ================================================================
  // 유틸리티 함수
  // ================================================================

  const resetState = () => {
    setResponseData(null);
    setError(null);
  };

  const displayResult = (data) => {
    setResponseData(data);
    setError(null);
  };

  const displayError = (err) => {
    setError(err.response?.data || err.message);
    setResponseData(null);
  };

  // ================================================================
  // API 호출 함수들 (Step별)
  // ================================================================

  // STEP 1: GET 요청
  const handleStep1 = async () => {
    resetState();
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/step1/hello`);
      displayResult(response.data);
    } catch (err) {
      displayError(err);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: POST 요청
  const handleStep2 = async () => {
    resetState();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/step2/create-data`, step2Data);
      displayResult(response.data);
      setStep2Data({ name: '', age: '' }); // 폼 초기화
    } catch (err) {
      displayError(err);
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: 특정 사용자 조회 (에러 처리)
  const handleStep3 = async (userId) => {
    resetState();
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/step3/users/${userId}`);
      displayResult(response.data);
    } catch (err) {
      displayError(err);
    } finally {
      setLoading(false);
    }
  };

  // STEP 4: 검색 (쿼리 파라미터)
  const handleStep4Search = async () => {
    resetState();
    setLoading(true);
    try {
      const params = new URLSearchParams({
        keyword: step4Search.keyword,
        page: step4Search.page,
        limit: step4Search.limit
      });
      const response = await axios.get(`${API_BASE_URL}/step4/search?${params}`);
      displayResult(response.data);
    } catch (err) {
      displayError(err);
    } finally {
      setLoading(false);
    }
  };

  // STEP 5: 모든 사용자 조회
  const handleStep5GetAll = async () => {
    resetState();
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/step5/users`);
      displayResult(response.data);
      setStep5Users(response.data.data);
    } catch (err) {
      displayError(err);
    } finally {
      setLoading(false);
    }
  };

  // STEP 5: 사용자 생성
  const handleStep5Create = async () => {
    if (!step5Form.name || !step5Form.email) {
      setError('이름과 이메일을 입력하세요');
      return;
    }
    resetState();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/step5/users`, step5Form);
      displayResult(response.data);
      setStep5Form({ name: '', email: '' }); // 폼 초기화
      handleStep5GetAll(); // 목록 새로고침
    } catch (err) {
      displayError(err);
    } finally {
      setLoading(false);
    }
  };

  // STEP 5: 사용자 수정 (PUT)
  const handleStep5UpdateFull = async (userId) => {
    if (!step5Form.name || !step5Form.email) {
      setError('모든 필드를 입력하세요');
      return;
    }
    resetState();
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/step5/users/${userId}`,
        step5Form
      );
      displayResult(response.data);
      setStep5Form({ name: '', email: '' });
      setStep5EditId(null);
      handleStep5GetAll(); // 목록 새로고침
    } catch (err) {
      displayError(err);
    } finally {
      setLoading(false);
    }
  };

  // STEP 5: 사용자 부분 수정 (PATCH)
  const handleStep5UpdatePartial = async (userId) => {
    if (!step5Form.name && !step5Form.email) {
      setError('수정할 내용을 입력하세요');
      return;
    }
    resetState();
    setLoading(true);
    try {
      const updateData = {};
      if (step5Form.name) updateData.name = step5Form.name;
      if (step5Form.email) updateData.email = step5Form.email;

      const response = await axios.patch(
        `${API_BASE_URL}/step5/users/${userId}`,
        updateData
      );
      displayResult(response.data);
      setStep5Form({ name: '', email: '' });
      setStep5EditId(null);
      handleStep5GetAll();
    } catch (err) {
      displayError(err);
    } finally {
      setLoading(false);
    }
  };

  // STEP 5: 사용자 삭제
  const handleStep5Delete = async (userId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    resetState();
    setLoading(true);
    try {
      const response = await axios.delete(`${API_BASE_URL}/step5/users/${userId}`);
      displayResult(response.data);
      handleStep5GetAll(); // 목록 새로고침
    } catch (err) {
      displayError(err);
    } finally {
      setLoading(false);
    }
  };

  // ================================================================
  // 렌더링
  // ================================================================

  const steps = [
    {
      number: 1,
      title: '📖 Step 1: GET 요청',
      description: '가장 기본적인 데이터 조회',
      content: (
        <div className="step-content">
          <p>
            GET 요청은 서버에서 데이터를 <strong>조회</strong>할 때 사용합니다.
          </p>
          <button onClick={handleStep1} disabled={loading}>
            {loading ? '로딩 중...' : 'GET /api/step1/hello 호출'}
          </button>
        </div>
      )
    },
    {
      number: 2,
      title: '📝 Step 2: POST 요청',
      description: '서버에 새로운 데이터 생성',
      content: (
        <div className="step-content">
          <p>
            POST 요청은 서버에 새로운 데이터를 <strong>생성</strong>할 때 사용합니다.
            요청 본문(body)에 데이터를 포함시킵니다.
          </p>
          <div className="form-group">
            <input
              type="text"
              placeholder="이름"
              value={step2Data.name}
              onChange={(e) =>
                setStep2Data({ ...step2Data, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="나이"
              value={step2Data.age}
              onChange={(e) =>
                setStep2Data({ ...step2Data, age: e.target.value })
              }
            />
            <button onClick={handleStep2} disabled={loading}>
              {loading ? '로딩 중...' : 'POST /api/step2/create-data'}
            </button>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: '⚠️ Step 3: 에러 처리와 상태 코드',
      description: 'HTTP 상태 코드로 응답 상태 표현',
      content: (
        <div className="step-content">
          <p>
            HTTP 상태 코드는 요청 결과를 나타냅니다:
          </p>
          <ul>
            <li>
              <strong>200</strong> - OK (성공)
            </li>
            <li>
              <strong>201</strong> - Created (생성됨)
            </li>
            <li>
              <strong>400</strong> - Bad Request (잘못된 요청)
            </li>
            <li>
              <strong>404</strong> - Not Found (찾을 수 없음)
            </li>
            <li>
              <strong>500</strong> - Server Error (서버 오류)
            </li>
          </ul>
          <div className="button-group">
            <button onClick={() => handleStep3(1)} disabled={loading}>
              사용자 1 조회 (성공)
            </button>
            <button onClick={() => handleStep3(99)} disabled={loading}>
              사용자 99 조회 (404 에러)
            </button>
          </div>
        </div>
      )
    },
    {
      number: 4,
      title: '🔍 Step 4: 쿼리 파라미터',
      description: 'URL에 파라미터를 포함하여 조회',
      content: (
        <div className="step-content">
          <p>
            쿼리 파라미터는 URL뒤에 <code>?key=value</code> 형식으로 추가됩니다.
            검색, 정렬, 페이지네이션 등에 사용합니다.
          </p>
          <div className="form-group">
            <input
              type="text"
              placeholder="검색 키워드 (예: 홍, 이순신)"
              value={step4Search.keyword}
              onChange={(e) =>
                setStep4Search({ ...step4Search, keyword: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="페이지"
              value={step4Search.page}
              onChange={(e) =>
                setStep4Search({ ...step4Search, page: parseInt(e.target.value) })
              }
            />
            <button onClick={handleStep4Search} disabled={loading}>
              {loading ? '검색 중...' : '검색 실행'}
            </button>
          </div>
          <small>
            실제 URL: /api/step4/search?keyword=홍&page=1&limit=10
          </small>
        </div>
      )
    },
    {
      number: 5,
      title: '⚙️ Step 5: 완전한 CRUD 작업',
      description: 'Create(생성), Read(조회), Update(수정), Delete(삭제)',
      content: (
        <div className="step-content">
          <p>
            CRUD는 데이터 조작의 기본 4가지 작업입니다:
          </p>
          <ul>
            <li>
              <strong>C</strong>reate - POST로 데이터 생성
            </li>
            <li>
              <strong>R</strong>ead - GET으로 데이터 조회
            </li>
            <li>
              <strong>U</strong>pdate - PUT/PATCH로 데이터 수정
            </li>
            <li>
              <strong>D</strong>elete - DELETE로 데이터 삭제
            </li>
          </ul>

          <div className="form-group">
            <input
              type="text"
              placeholder="이름"
              value={step5Form.name}
              onChange={(e) =>
                setStep5Form({ ...step5Form, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="이메일"
              value={step5Form.email}
              onChange={(e) =>
                setStep5Form({ ...step5Form, email: e.target.value })
              }
            />
          </div>

          <div className="button-group">
            <button onClick={handleStep5GetAll} disabled={loading}>
              📋 조회 (READ)
            </button>
            <button onClick={handleStep5Create} disabled={loading}>
              ➕ 생성 (CREATE)
            </button>
            {step5EditId ? (
              <>
                <button
                  onClick={() => handleStep5UpdateFull(step5EditId)}
                  disabled={loading}
                  className="update-full"
                >
                  🔄 전체 수정 (PUT)
                </button>
                <button
                  onClick={() => handleStep5UpdatePartial(step5EditId)}
                  disabled={loading}
                  className="update-partial"
                >
                  ✏️ 부분 수정 (PATCH)
                </button>
                <button
                  onClick={() => {
                    setStep5EditId(null);
                    setStep5Form({ name: '', email: '' });
                  }}
                  className="cancel"
                >
                  취소
                </button>
              </>
            ) : null}
          </div>

          {step5Users.length > 0 && (
            <div className="user-list">
              <h4>사용자 목록</h4>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>작업</th>
                  </tr>
                </thead>
                <tbody>
                  {step5Users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          onClick={() => {
                            setStep5EditId(user.id);
                            setStep5Form({
                              name: user.name,
                              email: user.email
                            });
                          }}
                          className="edit-btn"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleStep5Delete(user.id)}
                          className="delete-btn"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="tutorial-container">
      <header className="tutorial-header">
        <h1>🚀 API 통신 자습서</h1>
        <p>Step by Step으로 REST API의 모든 것을 배워보세요</p>
      </header>

      <div className="tutorial-content">
        {/* 스텝 선택 버튼 */}
        <nav className="step-navigation">
          {steps.map((step) => (
            <button
              key={step.number}
              className={`step-btn ${activeStep === step.number ? 'active' : ''}`}
              onClick={() => setActiveStep(step.number)}
            >
              Step {step.number}
            </button>
          ))}
        </nav>

        {/* 현재 스텝 내용 */}
        <section className="step-section">
          {(() => {
            const currentStep = steps.find((s) => s.number === activeStep);
            return (
              <>
                <div className="step-header">
                  <h2>{currentStep.title}</h2>
                  <p className="step-description">{currentStep.description}</p>
                </div>
                {currentStep.content}
              </>
            );
          })()}
        </section>

        {/* 응답/에러 표시 */}
        {responseData && (
          <section className="response-section success">
            <h3>✅ 응답 결과</h3>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </section>
        )}

        {error && (
          <section className="response-section error">
            <h3>❌ 에러 발생</h3>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </section>
        )}
      </div>
    </div>
  );
}

export default TutorialComponent;
