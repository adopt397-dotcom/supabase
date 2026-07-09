// ======================================================================
// API-0100: GAS API 통신 (대분류)
// ======================================================================

// ==================================================
// API-0110: 로그인 (login) - 중분류
// ==================================================
// 🔍 찾기: API-0110
// 📝 설명: 이메일과 비밀번호로 로그인 요청
// 🛠️ 수정 시: API 응답 형식이 바뀌면 함께 수정
// ==================================================
window.login = async function(email, password) {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'login', email, password })
    });
    return await response.json();
  } catch(e) {
    console.error('Login API error:', e);
    return { success: false, message: 'Network error' };
  }
};

// ==================================================
// API-0120: 회원가입 (signup) - 중분류
// ==================================================
// 🔍 찾기: API-0120
// 📝 설명: 새 사용자 등록 요청 (관리자 승인 필요)
// 🛠️ 수정 시: 가입 필드 변경 시 함께 수정
// ==================================================
window.signup = async function(email, password, name) {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'signup', email, password, name })
    });
    return await response.json();
  } catch(e) {
    console.error('Signup API error:', e);
    return { success: false, message: 'Network error' };
  }
};

// ==================================================
// API-0130: 비밀번호 변경 (changePassword) - 중분류
// ==================================================
// 🔍 찾기: API-0130
// 📝 설명: 기존 비밀번호를 새 비밀번호로 변경 요청
// 🛠️ 수정 시: 비밀번호 정책 변경 시 함께 수정
// ==================================================
window.changePassword = async function(email, oldPassword, newPassword) {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'changePassword', email, oldPassword, newPassword })
    });
    return await response.json();
  } catch(e) {
    console.error('Change Password API error:', e);
    return { success: false, message: 'Network error' };
  }
};

// ==================================================
// API-0200: 에러 처리 - 중분류
// ==================================================
// 🔍 찾기: API-0200
// 📝 설명: API 호출 실패 시 일관된 에러 응답 반환
// 🛠️ 수정 시: 에러 메시지 형식 변경 시 수정
// ==================================================
console.log('✅ api.js loaded.');
