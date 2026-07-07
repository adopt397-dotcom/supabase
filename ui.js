window.saveSession = function(email, name) {
  sessionStorage.setItem('user', JSON.stringify({ email, name, loggedIn: true }));
};

window.getSession = function() {
  const data = sessionStorage.getItem('user');
  return data ? JSON.parse(data) : null;
};

window.isLoggedIn = function() {
  const session = window.getSession();
  return session && session.loggedIn === true;
};

window.logout = function() {
  sessionStorage.removeItem('user');
};
