export function validateEmail(email){
  const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function hashPassword(password){
  return `hashed_${password}`;
}

export function generateToken(){
  return Math.random().toString(36).substring(2);
}

export function formatDate(date){
  return new Date(date).toISOString();
}
