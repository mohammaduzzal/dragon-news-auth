import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {

    const {createNewUser,setUser} = useContext(AuthContext)

    const handleSubmit = (e) =>{
        e.preventDefault()
       const form = new FormData(e.target)
       const name = form.get('name');
       const photo = form.get('photo');
       const email = form.get('email');
       const password = form.get('password');
       console.log({name,photo,email,password});

       createNewUser(email, password)
       .then((res) => {
        const user = res.user
        setUser(user)
        console.log(user);
       })
       .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
       })
    }


    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
            <h2 className="text-2xl font-bold text-center mt-2">Register your account</h2>
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your name</span>
          </label>
          <input type="text" name="name" placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="text" name="photo" placeholder="photo url" className="input input-bordered" required />
        </div>
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
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-neutral rounded-none">Register</button>
        </div>
      </form>
      <p className="font-semibold text-center">Already have an account ? <Link to={'/auth/login'} className="text-red-600 hover:underline">Login</Link></p>
    </div> 
        </div>
    );
};

export default Register;