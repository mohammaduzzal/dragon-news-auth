import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {

    const { userLogin,setUser} = useContext(AuthContext)
    const location = useLocation()
    console.log(location);
    const navigate = useNavigate()
    const [error,setError] = useState({})

    const handleLogin = (e)=>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({email,password});

        userLogin(email,password)
        .then((res) =>{
            const user = res.user;
            setUser(user)
            navigate(location?.state? location.state : '/')
            console.log(user);
        })
        .catch((err)=>{
            setError({...error,login:err.code})
        })

    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
            <h2 className="text-2xl font-bold text-center mt-2">Login your account</h2>
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          {
            error.login &&  <label className="label text-red-600">
            {error.login}
          </label>
          }
         
        </div>
        <div className="form-control mt-6">
          <button onClick={userLogin} className="btn btn-neutral rounded-none">Login</button>
        </div>
      </form>
      <p className="font-semibold text-center">Don&apos;t have an account ? <Link to={'/auth/register'} className="text-red-600 hover:underline">Register</Link></p>
    </div> 
        </div>
    );
};

export default Login;