// /member/ui.js
import { login } from './api.js';
import { saveSession, isLoggedIn } from './auth.js';

export function renderLoginOverlay() {
  // 이미 로그인되어 있으면 오버레이 없이 바로 시작
  if (isLoggedIn()) {
    if (typeof window.initialize === 'function') {
      window.initialize();
    }
    return;
  }

  // 로그인 오버레이 HTML
  const overlay = document.createElement('div');
  overlay.id = 'loginOverlay';
  overlay.innerHTML = `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9999;display:flex;justify-content:center;align-items:center;">
      <div style="background:#fff;padding:40px;border-radius:16px;max-width:400px;width:90%;text-align:center;">
        <h2 style="margin-bottom:20px;">🔐 SAT 로그인</h2>
        <input id="loginEmail" type="email" placeholder="이메일을 입력해주세요" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;">
        <input id="loginPin" type="password" placeholder="PIN (4자리)를 입력해주세요" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;">
        <div id="loginError" style="color:red;font-size:14px;margin-bottom:12px;display:none;"></div>
        <button id="loginBtn" style="width:100%;padding:14px;background:#f5a623;color:#fff;border:none;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer;">로그인</button>
      </div>
    </div>
  `;
  document.body.prepend(overlay);

  // 로그인 버튼 이벤트
  document.getElementById('loginBtn').addEventListener('click', handleLogin);
  document.getElementById('loginPin').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
  document.getElementById('loginEmail').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
}

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
    const result = await login(email, pin);
    if (result.success) {
      saveSession(email, result.name);
      document.getElementById('loginOverlay').remove();
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
