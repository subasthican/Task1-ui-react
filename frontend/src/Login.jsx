
import React, { useEffect, useRef } from 'react'
import axios from 'axios'

function Login() {
  const googleBtnRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && googleBtnRef.current) {
        window.google.accounts.id.initialize({
          client_id: "772097616315-gmkh37birktr9qdc720eh63u3upmigps.apps.googleusercontent.com",
          callback: handleGoogleResponse,
        })

        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
        })

        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const handleGoogleResponse = async (response) => {
    try {
      const res = await axios.post("http://localhost:5001/api/auth/google", {
        credential: response.credential,
      })

      console.log("Google login success:", res.data)
      alert("Google login success")
    } catch (error) {
      console.log("Google login failed:", error.response?.data || error)
      alert(error.response?.data?.message || "Google login failed")
    }
  }

  return (
    <div className="flex justify-center">
      <div ref={googleBtnRef}></div>
    </div>
  )
}

export default Login

// import React, { useEffect, useRef } from 'react'
// import axios from 'axios'

// function Login() {
//   const googleBtnRef = useRef(null)

//   useEffect(() => {
//     if (window.google && googleBtnRef.current) {
//       window.google.accounts.id.initialize({
//         client_id: "772097616315-gmkh37birktr9qdc720eh63u3upmigps.apps.googleusercontent.com",
//         callback: handleGoogleResponse,
//       })

//       window.google.accounts.id.renderButton(googleBtnRef.current, {
//         theme: "outline",
//         size: "large",
//         text: "signin_with",
//         shape: "rectangular",
//       })
//     } else {
//       console.log("Google script not loaded or ref not ready")
//     }
//   }, [])

//   const handleGoogleResponse = async (response) => {
//     try {
//       console.log("Google response:", response)

//       const res = await axios.post("http://localhost:5001/api/auth/google", {
//         credential: response.credential,
//       })

//       console.log("Google login success:", res.data)

//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token)
//       }

//       alert("Google login success")
//     } catch (error) {
//       console.log("Google login failed full error:", error)
//       console.log("Backend response:", error.response?.data)
//       alert(error.response?.data?.message || "Google login failed")
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md w-80">
//         <h1 className="bg-black text-white text-center p-2 rounded">
//           Login Page
//         </h1>

//         <div className="flex flex-col gap-4 mt-4">
//           <input
//             type="text"
//             placeholder="Username"
//             className="border p-2 rounded"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="border p-2 rounded"
//           />

//           <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
//             Login
//           </button>

//           <hr />

//           <div className="flex justify-center">
//             <div ref={googleBtnRef}></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login