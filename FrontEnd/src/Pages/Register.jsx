import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../features/userSlice";
import '../index.css';

export function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (event) => {
      navigate('/log-in'); 
      event.preventDefault();
        if (user.password !== user.confirmPassword) {
            return setError("Passwords do not match");
        }

        dispatch(registerUser({
            email: user.email,
            password: user.password,
            name: user.name
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
                <h1 className="text-white text-2xl font-bold mb-6 text-center">Register</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={user.name}
                        onChange={(event) => setUser({ ...user, name: event.target.value })}
                        className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        onChange={(event) => setUser({ ...user, email: event.target.value })}
                        className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(event) => setUser({ ...user, password: event.target.value })}
                        className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={user.confirmPassword}
                        onChange={(event) => setUser({ ...user, confirmPassword: event.target.value })}
                        className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                <button className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500" type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Submit"}
                </button>
                
                
                <p className="text-gray-400 text-center">
                      Already have an account? <Link to="/log-in" className="text-white hover:underline">Click here</Link>
                </p>
            </form>
        </div>
    );
}
