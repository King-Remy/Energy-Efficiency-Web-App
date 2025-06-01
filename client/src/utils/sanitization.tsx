
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Basic sanitization to prevent XSS
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim(); // Remove leading/trailing whitespace
};

export const sanitizeEmail = (email: string): string => {
  const sanitized = sanitizeInput(email);
  // Convert to lowercase for consistency
  return sanitized.toLowerCase();
};

export const sanitizeUsername = (username: string): string => {
  const sanitized = sanitizeInput(username);
  // Remove any potentially dangerous characters for usernames
  return sanitized.replace(/[^\w\s.-]/g, '');
};