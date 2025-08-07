export function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.id || payload.sub || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
