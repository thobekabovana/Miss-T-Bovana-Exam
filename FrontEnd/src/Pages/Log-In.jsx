import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { login } from "../features/LogInSlice"; // Import the login action
import '../index.css';

export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const action = await dispatch(login({ email, password }));
    if (login.fulfilled.match(action)) {
      // Redirect or perform actions on successful login
      navigate('/productForm'); // Change '/home' to your desired route
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl text-white text-center mb-4">Log In</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-500" 
            required
          />
        </div>

        <div className="mb-4">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-500" 
            required
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <button type="submit" className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500 focus:outline-none">
            Log In
          </button>
        </div>

        <p className="text-gray-400 text-center">
          Don't have an account? <Link to="/sign-up" className="text-white hover:underline">Click here</Link>
        </p>
      </form>
    </div>
  );
}
