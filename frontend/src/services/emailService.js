import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_edumaster';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_verification';
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key_here';

// Check if EmailJS is properly configured
const isEmailConfigured = () => {
  return EMAILJS_SERVICE_ID !== 'service_edumaster' && 
         EMAILJS_TEMPLATE_ID !== 'template_verification' && 
         EMAILJS_PUBLIC_KEY !== 'your_public_key_here' &&
         EMAILJS_PUBLIC_KEY && 
         EMAILJS_SERVICE_ID && 
         EMAILJS_TEMPLATE_ID;
};

// Initialize EmailJS only if configured
if (isEmailConfigured()) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export const sendVerificationEmail = async (userEmail, userName, verificationToken) => {
  try {
    // Check if EmailJS is configured
    if (!isEmailConfigured()) {
      console.warn('EmailJS not configured. Please set up EmailJS credentials in .env file.');
      console.log('Setup guide available at: EMAIL_SETUP.md');
      console.log(`Verification link for ${userEmail}: ${window.location.origin}/verify-email?token=${verificationToken}`);
      return { 
        success: false, 
        error: 'Email service not configured. Please contact administrator.' 
      };
    }

    const verificationLink = `${window.location.origin}/verify-email?token=${verificationToken}`;
    
    const templateParams = {
      // Try multiple possible recipient field names
      to_email: userEmail,
      user_email: userEmail,
      email: userEmail,
      recipient: userEmail,
      
      // Name fields
      to_name: userName,
      user_name: userName,
      name: userName,
      
      // Template content
      verification_link: verificationLink,
      app_name: 'EduMaster',
      from_name: 'EduMaster Team'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Verification email sent successfully:', response);
    return { success: true, messageId: response.text };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    
    // Provide helpful error messages
    let errorMessage = 'Failed to send email';
    if (error.text?.includes('Invalid public key') || error.text?.includes('publicKey')) {
      errorMessage = 'Email service configuration error. Please contact support.';
    } else if (error.text?.includes('template')) {
      errorMessage = 'Email template error. Please contact support.';
    } else if (error.text?.includes('service')) {
      errorMessage = 'Email service unavailable. Please contact support.';
    }
    
    return { success: false, error: errorMessage };
  }
};

export const sendPasswordResetEmail = async (userEmail, userName, resetToken) => {
  try {
    const resetLink = `${window.location.origin}/reset-password?token=${resetToken}`;
    
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      reset_link: resetLink,
      app_name: 'EduMaster',
      from_name: 'EduMaster Team'
    };

    // You would need a separate template for password reset
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_password_reset', // Different template
      templateParams
    );

    console.log('Password reset email sent successfully:', response);
    return { success: true, messageId: response.text };
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    return { success: false, error: error.message || 'Failed to send email' };
  }
};