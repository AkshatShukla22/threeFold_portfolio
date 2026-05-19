export const truncate = (s, n) => s?.length > n ? s.slice(0, n) + '...' : s;
export const isValidEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
export const validateContact = ({ name, email, subject, message }) => {
  const err = {};
  if (!name?.trim())     err.name    = 'Required';
  if (!email?.trim())    err.email   = 'Required';
  else if (!isValidEmail(email)) err.email = 'Invalid email';
  if (!subject?.trim())  err.subject = 'Required';
  if (!message?.trim())  err.message = 'Required';
  else if (message.length < 20) err.message = 'At least 20 characters';
  return err;
};
