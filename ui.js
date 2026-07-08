window.renderLoginOverlay = async function() {
  // 중복 생성 방지
  if (document.getElementById('loginOverlay')) {
    return;
  }

  // 이미 로그인되어 있으면 오버레이 없이 바로 시작
  if (window.isLoggedIn()) {
    if (typeof window.initialize === 'function') {
      window.initialize();
    }
    return;
  }

  // 로그인/회원가입 오버레이 HTML
  const overlay = document.createElement('div');
  overlay.id = 'loginOverlay';
  
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = '999999999';
  overlay.style.background = 'rgba(0,0,0,0.7)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.pointerEvents = 'auto';
  
  overlay.innerHTML = `
    <div style="background:#fff;padding:40px;border-radius:16px;max-width:400px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
      <h2 style="margin-bottom:20px;color:#1a1a2e;">🔐 SAT 로그인</h2>
      
      <!-- 로그인 폼 -->
      <div id="loginForm">
        <input id="loginEmail" type="email" placeholder="이메일을 입력해주세요" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <input id="loginPin" type="password" placeholder="PIN (4자리)를 입력해주세요" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <div id="loginError" style="color:red;font-size:14px;margin-bottom:12px;display:none;"></div>
        <button id="loginBtn" style="width:100%;padding:14px;background:#f5a623;color:#fff;border:none;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer;">로그인</button>
      </div>
      
      <!-- 회원가입 폼 (숨김) -->
      <div id="signupForm" style="display:none;">
        <input id="signupEmail" type="email" placeholder="이메일을 입력해주세요" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <input id="signupName" type="text" placeholder="이름을 입력해주세요" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <input id="signupPin" type="password" placeholder="PIN (4자리)를 입력해주세요" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <input id="signupPinConfirm" type="password" placeholder="PIN을 다시 입력해주세요" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <div id="signupError" style="color:red;font-size:14px;margin-bottom:12px;display:none;"></div>
        <button id="signupBtn" style="width:100%;padding:14px;background:#27ae60;color:#fff;border:none;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer;">회원가입</button>
      </div>
      
      <!-- 전환 버튼 -->
      <div style="margin-top:12px;font-size:14px;color:#666;">
        <span id="toggleText">계정이 없으신가요? <a href="#" id="toggleLink" style="color:#f5a623;font-weight:600;text-decoration:none;">회원가입</a></span>
      </div>
      
      <!-- PIN 변경 폼 (숨김) -->
      <div id="changePinForm" style="display:none;margin-top:15px;border-top:1px solid #eee;padding-top:15px;">
        <h3 style="font-size:16px;color:#1a1a2e;">🔑 PIN 변경</h3>
        <input id="oldPin" type="password" placeholder="현재 PIN" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <input id="newPin" type="password" placeholder="새 PIN (4자리)" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <input id="newPinConfirm" type="password" placeholder="새 PIN 확인" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <div id="changePinError" style="color:red;font-size:14px;margin-bottom:12px;display:none;"></div>
        <button id="changePinBtn" style="width:100%;padding:14px;background:#3498db;color:#fff;border:none;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer;">PIN 변경</button>
        <button id="changePinCancelBtn" style="width:100%;padding:10px;margin-top:8px;background:#e74c3c;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;">취소</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);

  // 로그인 버튼 이벤트
  document.getElementById('loginBtn').addEventListener('click', handleLogin);
  document.getElementById('loginPin').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
  document.getElementById('loginEmail').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });

  // 회원가입 버튼 이벤트
  document.getElementById('signupBtn').addEventListener('click', handleSignup);
  document.getElementById('signupPinConfirm').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSignup();
  });

  // 전환 버튼 이벤트
  document.getElementById('toggleLink').addEventListener('click', toggleForm);

  // PIN 변경 버튼 이벤트
  document.getElementById('changePinBtn').addEventListener('click', handleChangePin);
  document.getElementById('changePinCancelBtn').addEventListener('click', () => {
    document.getElementById('changePinForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('toggleText').style.display = 'block';
  });
}

// 로그인 처리
async function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pin = document.getElementById('loginPin').value.trim();
  const errorEl = document.getElementById('loginError');

  if (!email || !pin) {
    errorEl.textContent = '이메일과 PIN을 모두 입력해주세요.';
    errorEl.style.display = 'block';
    return;
  }

  try {
    const result = await window.login(email, pin);
    if (result.success) {
      window.saveSession(email, result.name);
      const overlay = document.getElementById('loginOverlay');
      if (overlay) overlay.remove();
      if (typeof window.initialize === 'function') {
        window.initialize();
      }
    } else {
      errorEl.textContent = result.message || '로그인 실패했습니다.';
      errorEl.style.display = 'block';
    }
  } catch (err) {
    errorEl.textContent = '서버 연결 오류가 발생했습니다.';
    errorEl.style.display = 'block';
  }
}

// 회원가입 처리
async function handleSignup() {
  const email = document.getElementById('signupEmail').value.trim();
  const name = document.getElementById('signupName').value.trim();
  const pin = document.getElementById('signupPin').value.trim();
  const pinConfirm = document.getElementById('signupPinConfirm').value.trim();
  const errorEl = document.getElementById('signupError');

  if (!email || !name || !pin || !pinConfirm) {
    errorEl.textContent = '모든 항목을 입력해주세요.';
    errorEl.style.display = 'block';
    return;
  }

  if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
    errorEl.textContent = 'PIN은 4자리 숫자여야 합니다.';
    errorEl.style.display = 'block';
    return;
  }

  if (pin !== pinConfirm) {
    errorEl.textContent = 'PIN이 일치하지 않습니다.';
    errorEl.style.display = 'block';
    return;
  }

  try {
    const result = await window.signup(email, pin, name);
    if (result.success) {
      errorEl.style.display = 'none';
      alert('회원가입이 완료되었습니다. 관리자 승인 후 로그인이 가능합니다.');
      // 로그인 폼으로 전환
      document.getElementById('signupForm').style.display = 'none';
      document.getElementById('loginForm').style.display = 'block';
      document.getElementById('toggleText').style.display = 'block';
      document.getElementById('loginEmail').value = email;
      document.getElementById('loginPin').value = '';
    } else {
      errorEl.textContent = result.message || '회원가입 실패했습니다.';
      errorEl.style.display = 'block';
    }
  } catch (err) {
    errorEl.textContent = '서버 연결 오류가 발생했습니다.';
    errorEl.style.display = 'block';
  }
}

// 폼 전환 (로그인 ↔ 회원가입)
function toggleForm(e) {
  e.preventDefault();
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const toggleText = document.getElementById('toggleText');
  const loginError = document.getElementById('loginError');
  const signupError = document.getElementById('signupError');

  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    toggleText.innerHTML = '계정이 없으신가요? <a href="#" id="toggleLink" style="color:#f5a623;font-weight:600;text-decoration:none;">회원가입</a>';
    loginError.style.display = 'none';
    signupError.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    toggleText.innerHTML = '이미 계정이 있으신가요? <a href="#" id="toggleLink" style="color:#f5a623;font-weight:600;text-decoration:none;">로그인</a>';
    loginError.style.display = 'none';
    signupError.style.display = 'none';
  }

  // 새 toggleLink에 이벤트 다시 연결
  document.getElementById('toggleLink').addEventListener('click', toggleForm);
}

// PIN 변경 처리
async function handleChangePin() {
  const session = window.getSession();
  if (!session) {
    alert('로그인이 필요합니다.');
    return;
  }

  const oldPin = document.getElementById('oldPin').value.trim();
  const newPin = document.getElementById('newPin').value.trim();
  const newPinConfirm = document.getElementById('newPinConfirm').value.trim();
  const errorEl = document.getElementById('changePinError');

  if (!oldPin || !newPin || !newPinConfirm) {
    errorEl.textContent = '모든 항목을 입력해주세요.';
    errorEl.style.display = 'block';
    return;
  }

  if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
    errorEl.textContent = '새 PIN은 4자리 숫자여야 합니다.';
    errorEl.style.display = 'block';
    return;
  }

  if (newPin !== newPinConfirm) {
    errorEl.textContent = '새 PIN이 일치하지 않습니다.';
    errorEl.style.display = 'block';
    return;
  }

  try {
    const result = await window.changePin(session.email, oldPin, newPin);
    if (result.success) {
      errorEl.style.display = 'none';
      alert('PIN이 변경되었습니다.');
      document.getElementById('changePinForm').style.display = 'none';
      document.getElementById('loginForm').style.display = 'block';
      document.getElementById('signupForm').style.display = 'none';
      document.getElementById('toggleText').style.display = 'block';
      // 로그아웃 후 재로그인 유도
      window.logout();
    } else {
      errorEl.textContent = result.message || 'PIN 변경 실패했습니다.';
      errorEl.style.display = 'block';
    }
  } catch (err) {
    errorEl.textContent = '서버 연결 오류가 발생했습니다.';
    errorEl.style.display = 'block';
  }
}

// 로그아웃 버튼 (퀴즈 화면에 추가)
window.addLogoutButton = function() {
  // 이미 로그아웃 버튼이 있으면 추가하지 않음
  if (document.getElementById('logoutButton')) return;

  // 퀴즈 메인 영역 상단에 로그아웃 버튼 추가
  const quizMain = document.getElementById('quizMain');
  if (!quizMain) return;

  const logoutBtn = document.createElement('button');
  logoutBtn.id = 'logoutButton';
  logoutBtn.textContent = '🚪 로그아웃';
  logoutBtn.style.cssText = `
    position: fixed;
    top: 70px;
    right: 20px;
    padding: 10px 18px;
    background: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    z-index: 9999;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.2s;
  `;
  logoutBtn.onmouseover = function() { this.style.background = '#c0392b'; };
  logoutBtn.onmouseout = function() { this.style.background = '#e74c3c'; };
  logoutBtn.addEventListener('click', function() {
    if (confirm('로그아웃하시겠습니까? 진행 상황은 저장됩니다.')) {
      window.logout();
    }
  });

  document.body.appendChild(logoutBtn);
};

// 기존 renderLoginOverlay 덮어쓰기 방지
console.log('✅ ui.js loaded (with logout button support)');

// SAT 엔진 실행 후 로그아웃 버튼 추가
const originalInit = window.initialize;
window.initialize = function() {
  if (typeof originalInit === 'function') {
    originalInit();
  }
  setTimeout(window.addLogoutButton, 500);
};
