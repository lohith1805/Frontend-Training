// auth.js — handles login/logout and session management

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export function login(username, password) {
  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    sessionStorage.setItem(
      "session",
      JSON.stringify({
        username,
        loginTime: new Date().toISOString(),
        isLoggedIn: true,
      })
    );
    return { success: true };
  }
  return { success: false, message: "Invalid username or password." };
}

export function logout() {
  sessionStorage.removeItem("session");
}

export function isLoggedIn() {
  const session = sessionStorage.getItem("session");
  if (!session) return false;
  try {
    return JSON.parse(session).isLoggedIn === true;
  } catch {
    return false;
  }
}

export function getSession() {
  const session = sessionStorage.getItem("session");
  try {
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}
