/**
 * Email validation
 *
 * @param email - Email to validate
 * @returns true if the email is valid
 */
export function isValidEmail(email: string): boolean {
  // Simple regex - checks basic format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 *
 * @param username Username to validate
 * @returns true if username is valid
 */
export function isValidUsername(username: string): boolean {
  // Username must be 3-30 characters, can contain letters, numbers, underscores, and hyphens
  const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
  return usernameRegex.test(username);
}

/**
 *
 * @param phone Phone number to validate
 * @returns true if phone number is valid
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Simple regex for phone numbers (can be improved for specific formats)
  const phoneRegex = /^\+?\d{7,15}$/;
  return phoneRegex.test(phone);
}

/**
 * Password validation
 *
 * @param password - Password to validate
 * @returns Object with valid and error message (if invalid)
 */
export function validatePassword(password: string): {
  valid: boolean;
  error?: string;
} {
  if (password.length < 6) {
    return {
      valid: false,
      error: "Password must be at least 6 characters long!",
    };
  }

  if (password.length > 100) {
    return { valid: false, error: "Password is too long!" };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      error: "Password must contain at least one uppercase letter!",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      error: "Password must contain at least one lowercase letter!",
    };
  }

  if (!/\d/.test(password)) {
    return {
      valid: false,
      error: "Password must contain at least one number!",
    };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      valid: false,
      error: "Password must contain at least one special character!",
    };
  }

  return { valid: true };
}

/**
 *
 * @param name Name to be validated - will be used for both first and last name
 * @returns Object with valid and error message (if invalid)
 */
export function validateName(name: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: "Name is required" };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: "Name must be at least 2 characters long" };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: "Name is too long" };
  }

  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
    return {
      valid: false,
      error: "Name can only contain letters, spaces, apostrophes, and hyphens",
    };
  }

  return { valid: true };
}

/**
 * Login form validation
 *
 * Accepts either email or username as identifier.
 * Provides specific error messages based on what the user entered.
 */
export function validateLoginForm(
  email_or_username: string,
  password: string,
): {
  valid: boolean;
  error?: string;
} {
  const input = email_or_username.trim();

  if (!input) {
    return { valid: false, error: "Email or username is required" };
  }

  // Check if input looks like an email (contains @)
  const looksLikeEmail = input.includes('@');

  if (looksLikeEmail && !isValidEmail(input)) {
    return { valid: false, error: "Email format is invalid" };
  }

  if (!looksLikeEmail && !isValidUsername(input)) {
    return { valid: false, error: "Username must be 3-30 characters (letters, numbers, _ or -)" };
  }

  if (!password) {
    return { valid: false, error: "Password is required" };
  }

  return { valid: true };
}

/**
 * Register form validation
 */
export function validateRegisterForm(formData: {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}): {
  valid: boolean;
  error?: string;
} {
  const firstNameValidation = validateName(formData.first_name);
  if (!firstNameValidation.valid) {
    return firstNameValidation;
  }

  const lastNameValidation = validateName(formData.last_name);
  if (!lastNameValidation.valid) {
    return lastNameValidation;
  }

  const usernameValidation = isValidUsername(formData.username);
  if (!usernameValidation) {
    return { valid: false, error: "Username is invalid" };
  }

  if (!isValidEmail(formData.email)) {
    return { valid: false, error: "Email invalid" };
  }

  if (formData.phone && !isValidPhoneNumber(formData.phone)) {
    return { valid: false, error: "Phone number is invalid" };
  }

  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.valid) {
    return passwordValidation;
  }

  if (formData.password !== formData.confirm_password) {
    return { valid: false, error: "Passwords do not match" };
  }

  return { valid: true };
}
