// Fonction utilitaire pour valider un email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fonction utilitaire pour valider une date ISO 8601
export function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}/.test(dateString);
}
