import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error', 'expired'
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const { verifyEmail, resendVerification } = useAuth();
  const navigate = useNavigate();

  const token = searchParams.get('token');
  
  // Debug token extraction
  console.log('URL token parameter:', token);
  console.log('Full URL search params:', searchParams.toString());

  useEffect(() => {
    const handleVerification = async () => {
      const result = await verifyEmail(token);
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/', { state: { showLogin: true } });
        }, 3000);
      } else {
        if (result.error.includes('expired')) {
          setStatus('expired');
        } else {
          setStatus('error');
        }
        setMessage(result.error);
      }
    };

    if (token) {
      handleVerification();
    } else {
      setStatus('error');
      setMessage('Invalid verification link.');
    }
  }, [token, verifyEmail, navigate]);


  const handleResendVerification = async () => {
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    const result = await resendVerification(email);
    if (result.success) {
      setMessage(result.message);
    } else {
      setMessage(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8 flex items-center justify-center">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl text-center max-w-2xl">
        {status === 'verifying' && (
          <>
            <div className="text-8xl mb-6 animate-pulse">⏳</div>
            <h1 className="text-4xl font-black mb-6 text-gray-800">Verifying Email...</h1>
            <p className="text-xl text-gray-600">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-8xl mb-6 animate-bounce">✅</div>
            <h1 className="text-4xl font-black mb-6 text-green-600">Email Verified!</h1>
            <p className="text-xl text-gray-600 mb-8">
              {message}
            </p>
            <p className="text-lg text-gray-500">
              Redirecting you to the login page...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-8xl mb-6">❌</div>
            <h1 className="text-4xl font-black mb-6 text-red-600">Verification Failed</h1>
            <p className="text-xl text-red-600 mb-8">
              {message}
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold transition-all"
            >
              Go to Home
            </button>
          </>
        )}

        {status === 'expired' && (
          <>
            <div className="text-8xl mb-6">⏰</div>
            <h1 className="text-4xl font-black mb-6 text-yellow-600">Link Expired</h1>
            <p className="text-xl text-gray-600 mb-8">
              {message}
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleResendVerification}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-bold transition-all w-full"
              >
                Resend Verification Email
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full text-lg font-bold transition-all w-full"
              >
                Go to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;