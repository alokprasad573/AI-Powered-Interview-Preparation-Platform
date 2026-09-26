//@func To validate email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

//@func To setCookie
export const setCookie = (name, value, days = 7) => {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000,
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax`;
};

//@func To get Cookie
export const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

//@func Get Initials Letter of words
export const getInitials = (title) => {
  if (!title || !title.trim()) return "";

  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";

  const initials = words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return initials;
};
