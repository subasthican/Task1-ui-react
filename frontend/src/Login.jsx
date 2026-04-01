import React from 'react'
import googleIcon from './assets/google.png'


function Login() {
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

        <div className="bg-white p-6 rounded shadow-md w-80">
        
        <h1 className="bg-black text-white text-center p-2 rounded">
            Login Page
        </h1>

        <div className="flex flex-col gap-4 mt-4">

        <div className="flex flex-col">
            <label>User Name</label>
            <input type="text" className="border rounded p-2" />
        </div>

        <div className="flex flex-col">
            <label>Password</label>
            <input type="password" className="border rounded p-2" />
        </div>

        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
            Login
        </button>

        <hr />

        <button className="flex item-center gap-2 border p-2 rounded hover:bg-gray-100">
            <img src={googleIcon} alt="google" className="w-5 h-5" />
            Continue with Google
        </button>

        </div>

        </div>

    </div>
    )
}

export default Login