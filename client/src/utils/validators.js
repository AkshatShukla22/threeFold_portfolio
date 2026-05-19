export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateContactForm = ({ name, email, subject, message }) => {
  const errors = {};
  if (!name?.trim())            errors.name    = 'Name is required';
  if (!email?.trim())           errors.email   = 'Email is required';
  else if (!isValidEmail(email)) errors.email  = 'Enter a valid email';
  if (!subject?.trim())         errors.subject = 'Subject is required';
  if (!message?.trim())         errors.message = 'Message is required';
  else if (message.length < 20) errors.message = 'Message must be at least 20 characters';
  return errors;
};
