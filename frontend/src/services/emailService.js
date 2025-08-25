import emailjs from '@emailjs/browser';

// EmailJS configuration - hardcoded for production since env vars aren't loading
const EMAILJS_SERVICE_ID = 'service_rpae4fb';
const EMAILJS_TEMPLATE_ID = 'template_84mbn1q';
const EMAILJS_PUBLIC_KEY = 'n_pQSQpbXHpgPO6ly';

// Initialize EmailJS with the public key
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendVerificationEmail = async (userEmail, userName, verificationToken) => {
  try {
    const verificationLink = `${window.location.origin}/verify-email?token=${verificationToken}`;
    
    const templateParams = {
      // Match your EmailJS template exactly - it expects {{email}} not {{to_email}}
      email: userEmail,  // This matches {{email}} in your template
      to_name: userName,
      from_name: 'EduMaster Team',
      
      // Custom fields for the email content
      verification_link: verificationLink,
      app_name: 'EduMaster',
      user_name: userName
    };
    
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

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
    } else if (error.text?.includes('recipient')) {
      errorMessage = 'Email recipient configuration error. Please contact support.';
    } else {
      errorMessage = `Email service error: ${error.message || error.text || 'Unknown error'}`;
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