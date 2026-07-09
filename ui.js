window.renderLoginOverlay = async function() {
  // Prevent duplicate overlay
  if (document.getElementById('loginOverlay')) {
    return;
  }

  // If already logged in, skip overlay
  if (window.isLoggedIn()) {
    if (typeof window.initialize === 'function') {
      window.initialize();
    }
    return;
  }

  // Login/Signup Overlay HTML
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
      <h2 style="margin-bottom:20px;color:#1a1a2e;">🔐 SAT Login</h2>
      
      <!-- Login Form -->
      <div id="loginForm">
        <input id="loginEmail" type="email" placeholder="Enter your email" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <input id="loginPin" type="password" placeholder="Enter your PIN (4 digits)" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <div id="loginError" style="color:red;font-size:14px;margin-bottom:12px;display:none;"></div>
        <button id="loginBtn" style="width:100%;padding:14px;background:#f5a623;color:#fff;border:none;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer;">Login</button>
      </div>
      
      <!-- Signup Form (hidden) -->
      <div id="signupForm" style="display:none;">
        <input id="signupEmail" type="email" placeholder="Enter your email" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <input id="signupName" type="text" placeholder="Enter your name" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <input id="signupPin" type="password" placeholder="Create PIN (4 digits)" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <input id="signupPinConfirm" type="password" placeholder="Confirm PIN" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <div id="signupError" style="color:red;font-size:14px;margin-bottom:12px;display:none;"></div>
        <button id="signupBtn" style="width:100%;padding:14px;background:#27ae60;color:#fff;border:none;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer;">Sign Up</button>
      </div>
      
      <!-- Toggle Link -->
      <div style="margin-top:12px;font-size:14px;color:#666;">
        <span id="toggleText">Don't have an account? <a href="#" id="toggleLink" style="color:#f5a623;font-weight:600;text-decoration:none;">Sign Up</a></span>
      </div>
      
      <!-- PIN Change Form (hidden) -->
      <div id="changePinForm" style="display:none;margin-top:15px;border-top:1px solid #eee;padding-top:15px;">
        <h3 style="font-size:16px;color:#1a1a2e;">🔑 Change PIN</h3>
        <input id="oldPin" type="password" placeholder="Current PIN" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <input id="newPin" type="password" placeholder="New PIN (4 digits)" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <input id="newPinConfirm" type="password" placeholder="Confirm new PIN" style="width:100%;padding:12px;margin-bottom:12px;border:2px solid #ddd;border-radius:8px;font-size:16px;box-sizing:border-box;">
        <div id="changePinError" style="color:red;font-size:14px;margin-bottom:12px;display:none;"></div>
        <button id="changePinBtn" style="width:100%;padding:14px;background:#3498db;color:#fff;border:none;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer;">Change PIN</button>
        <button id="changePinCancelBtn" style="width:100%;padding:10px;margin-top:8px;background:#e74c3c;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;">Cancel</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);

  // Login button event
  document.getElementById('loginBtn').addEventListener('click', handleLogin);
  document.getElementById('loginPin').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
  document.getElementById('loginEmail').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });

  // Signup button event
  document.getElementById('signupBtn').addEventListener('click', handleSignup);
  document.getElementById('signupPinConfirm').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSignup();
  });

  // Toggle event
  document.getElementById('toggleLink').addEventListener('click', toggleForm);

  // PIN Change button events
  document.getElementById('changePinBtn').addEventListener('click', handleChangePin);
  document.getElementById('changePinCancelBtn').addEventListener('click', () => {
    document.getElementById('changePinForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('toggleText').style.display = 'block';
  });
}

// Helper: set button loading state
function setButtonLoading(btn, loading) {
  if (loading) {
    btn.disabled = true;
    btn.textContent = '⏳ Processing...';
    btn.style.opacity = '0.6';
    btn.style.cursor = 'wait';
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.originalText || 'Submit';
    btn.style.opacity = '1';
    btn.style.cursor = 'pointer';
  }
}

// Login handler
async function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pin = document.getElementById('loginPin').value.trim();
  const errorEl = document.getElementById('loginError');
  const btn = document.getElementById('loginBtn');

  if (!email || !pin) {
    errorEl.textContent = 'Please enter both email and PIN.';
    errorEl.style.display = 'block';
    return;
  }

  // Save original text and disable button
  if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent;
  setButtonLoading(btn, true);

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
      errorEl.textContent = result.message || 'Login failed.';
      errorEl.style.display = 'block';
      setButtonLoading(btn, false);
    }
  } catch (err) {
    errorEl.textContent = 'Server connection error.';
    errorEl.style.display = 'block';
    setButtonLoading(btn, false);
  }
}

// Signup handler
async function handleSignup() {
  const email = document.getElementById('signupEmail').value.trim();
  const name = document.getElementById('signupName').value.trim();
  const pin = document.getElementById('signupPin').value.trim();
  const pinConfirm = document.getElementById('signupPinConfirm').value.trim();
  const errorEl = document.getElementById('signupError');
  const btn = document.getElementById('signupBtn');

  if (!email || !name || !pin || !pinConfirm) {
    errorEl.textContent = 'Please fill in all fields.';
    errorEl.style.display = 'block';
    return;
  }

  if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
    errorEl.textContent = 'PIN must be 4 digits.';
    errorEl.style.display = 'block';
    return;
  }

  if (pin !== pinConfirm) {
    errorEl.textContent = 'PINs do not match.';
    errorEl.style.display = 'block';
    return;
  }

  // Save original text and disable button
  if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent;
  setButtonLoading(btn, true);

  try {
    const result = await window.signup(email, pin, name);
    if (result.success) {
      errorEl.style.display = 'none';
      alert('Signup complete. Awaiting admin approval.');
      // Switch to login form
      document.getElementById('signupForm').style.display = 'none';
      document.getElementById('loginForm').style.display = 'block';
      document.getElementById('toggleText').style.display = 'block';
      document.getElementById('loginEmail').value = email;
      document.getElementById('loginPin').value = '';
      setButtonLoading(btn, false);
    } else {
      errorEl.textContent = result.message || 'Signup failed.';
      errorEl.style.display = 'block';
      setButtonLoading(btn, false);
    }
  } catch (err) {
    errorEl.textContent = 'Server connection error.';
    errorEl.style.display = 'block';
    setButtonLoading(btn, false);
  }
}

// Toggle between Login and Signup forms
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
    toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggleLink" style="color:#f5a623;font-weight:600;text-decoration:none;">Sign Up</a>';
    loginError.style.display = 'none';
    signupError.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    toggleText.innerHTML = 'Already have an account? <a href="#" id="toggleLink" style="color:#f5a623;font-weight:600;text-decoration:none;">Login</a>';
    loginError.style.display = 'none';
    signupError.style.display = 'none';
  }

  // Re-attach event to new toggleLink
  document.getElementById('toggleLink').addEventListener('click', toggleForm);
}

// PIN Change handler
async function handleChangePin() {
  const session = window.getSession();
  if (!session) {
    alert('Please login first.');
    return;
  }

  const oldPin = document.getElementById('oldPin').value.trim();
  const newPin = document.getElementById('newPin').value.trim();
  const newPinConfirm = document.getElementById('newPinConfirm').value.trim();
  const errorEl = document.getElementById('changePinError');
  const btn = document.getElementById('changePinBtn');

  if (!oldPin || !newPin || !newPinConfirm) {
    errorEl.textContent = 'Please fill in all fields.';
    errorEl.style.display = 'block';
    return;
  }

  if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
    errorEl.textContent = 'New PIN must be 4 digits.';
    errorEl.style.display = 'block';
    return;
  }

  if (newPin !== newPinConfirm) {
    errorEl.textContent = 'New PINs do not match.';
    errorEl.style.display = 'block';
    return;
  }

  // Save original text and disable button
  if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent;
  setButtonLoading(btn, true);

  try {
    const result = await window.changePin(session.email, oldPin, newPin);
    if (result.success) {
      errorEl.style.display = 'none';
      alert('PIN changed successfully.');
      document.getElementById('changePinForm').style.display = 'none';
      document.getElementById('loginForm').style.display = 'block';
      document.getElementById('signupForm').style.display = 'none';
      document.getElementById('toggleText').style.display = 'block';
      setButtonLoading(btn, false);
      // Logout and redirect to login
      window.logout();
    } else {
      errorEl.textContent = result.message || 'PIN change failed.';
      errorEl.style.display = 'block';
      setButtonLoading(btn, false);
    }
  } catch (err) {
    errorEl.textContent = 'Server connection error.';
    errorEl.style.display = 'block';
    setButtonLoading(btn, false);
  }
}

// Add Logout Button to quiz screen
window.addLogoutButton = function() {
  if (document.getElementById('logoutButton')) return;

  const quizMain = document.getElementById('quizMain');
  if (!quizMain) return;

  const logoutBtn = document.createElement('button');
  logoutBtn.id = 'logoutButton';
  logoutBtn.textContent = '🚪 Logout';
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
    if (confirm('Logout? Your progress will be saved.')) {
      window.logout();
    }
  });

  document.body.appendChild(logoutBtn);
};

// Override initialize to add logout button after SAT engine loads
console.log('✅ ui.js loaded (with button feedback)');

const originalInit = window.initialize;
window.initialize = function() {
  if (typeof originalInit === 'function') {
    originalInit();
  }
  setTimeout(window.addLogoutButton, 500);
};

