"use client"

import Link from "next/link"
import { useState , useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


const Signup = () => {
    const [login , setLogin] = useState(false);
    let [user,setUser] = useState({name:"", email:"" , password:""}); 
    let [loading,setLoading] = useState(false);
    const router = useRouter();
  
  const change = (e) =>{
      setUser({...user,[e.target.name] : e.target.value});
  }
  
  const submitForm = async (e) =>{
      e.preventDefault();
      setLoading(true);
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await res.json();
      setLoading(false);
    if(data.success){
        toast.success(data.msg, {
          position: toast.POSITION.TOP_RIGHT
      });

      setLogin(true);
      setUser({name : "" ,email:"" , password:""});
        router.push('/login');
    }
    else{
      toast.error(data.msg, {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  }

  return (
    <>
        {/* <head>
        <title>Signup - CodeBlog | Join our community of web developers</title>
        <meta name="description" content="Signup for CodeBlog and join our community of web developers. Our platform offers a supportive environment for learning, sharing, and collaborating on web development projects, with access to tutorials, code snippets, and Q&A forums." />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="keywords" content="CodeBlog, web development, signup, community, tutorials, code snippets, Q&A forums" />
        </head> */}

        <div className="my-10 bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="backdrop-blur-xl px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="name"
                        onChange={change}
                        placeholder="Full Name" />
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        onChange={change}
                        value={user.email}
                        placeholder="Email" />
                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        onChange={change}
                        value={user.password}
                        placeholder="Password" />
            
                    <button onClick={submitForm} type="submit" className="w-full bg-green-400 text-center py-3 rounded bg-green text-white hover:bg-green-300 focus:outline-none my-1">
                    {
                      loading ? loading && <span className='loading'> <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                      </svg>
                      Loading...
                      </span>
                      :
                     "Create Account"
                    }
                    </button>
                    <ToastContainer />
                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-blue-500" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark  text-blue-500" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <Link className="ml-1 no-underline border-b border-blue text-blue-600" href="/login">
                        Log in
                    </Link>.
                </div>
            </div>
        </div>
        </>
  )
}

export default Signup
