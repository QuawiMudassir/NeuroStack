import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = isLogin
        ? 'http://localhost:3000/api/doctors/login'
        : 'http://localhost:3000/api/doctors/';

      const payload = {
        email,
        password,
        ...(isLogin ? {} : { confirmPassword })
      };

      const response = await axios.post(url, payload);

      if (response.status === 200) {
        if (isLogin) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('doctor', JSON.stringify(response.data.doctor));
          navigate(`/dashboard/${response.data.doctor._id}/patients`);
        } else {
          alert('Registration successful! Please log in.');
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={logo} className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create an account'}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#008170]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#008170]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#008170]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#008170] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#006b5d] focus-visible:outline-2 focus-visible:outline-[#008170]"
          >
            {isLogin ? 'Sign in' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          {isLogin ? 'Not a member?' : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-[#008170] hover:text-[#006b5d]"
          >
            {isLogin ? 'Sign Up Now' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
