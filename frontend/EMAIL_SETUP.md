# Email Setup Guide for EduMaster

## Setting up EmailJS for Email Verification

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create an Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template for email verification:

```html
Subject: Verify Your EduMaster Account

<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
        .container { background: #f8f9fa; padding: 20px; border-radius: 10px; }
        .button { 
            background: #007bff; 
            color: white; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 5px; 
            display: inline-block;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Welcome to {{app_name}}!</h2>
        <p>Hi {{to_name}},</p>
        
        <p>Thank you for signing up for EduMaster! To complete your registration and start your learning journey, please verify your email address by clicking the button below:</p>
        
        <a href="{{verification_link}}" class="button">Verify Email Address</a>
        
        <p>Or copy and paste this link into your browser:</p>
        <p><a href="{{verification_link}}">{{verification_link}}</a></p>
        
        <p>This verification link will expire in 24 hours for security reasons.</p>
        
        <p>If you didn't create an account with EduMaster, you can safely ignore this email.</p>
        
        <hr>
        <p>Best regards,<br>{{from_name}}</p>
    </div>
</body>
</html>
```

4. Save the template and note down your **Template ID**

### Step 4: Get Public Key
1. Go to "Account" -> "General" in your EmailJS dashboard
2. Find your **Public Key**

### Step 5: Update Environment Variables
1. Open the `.env` file in the frontend folder
2. Replace the placeholder values with your actual EmailJS credentials:
   - `REACT_APP_EMAILJS_SERVICE_ID` = your Service ID
   - `REACT_APP_EMAILJS_TEMPLATE_ID` = your Template ID
   - `REACT_APP_EMAILJS_PUBLIC_KEY` = your Public Key

### Step 6: Test the Setup
1. Restart your development server: `npm start`
2. Try signing up with a real email address
3. Check your email for the verification message

## Troubleshooting

### Common Issues:
1. **Email not sending**: Check your service configuration and make sure your email provider allows EmailJS
2. **Template errors**: Ensure all template variables are correctly formatted with double curly braces
3. **Spam folder**: Verification emails might end up in spam initially

### Email Providers:
- **Gmail**: Works well, may require app-specific passwords if 2FA is enabled
- **Outlook**: Good compatibility
- **Custom SMTP**: Available on paid plans

### Rate Limits:
- Free tier: 200 emails/month
- Paid plans: Higher limits available

## Security Notes:
- The public key is safe to expose in frontend code
- Never expose private keys in client-side code
- Template variables are automatically escaped by EmailJS
- Verification tokens expire after 24 hours for security