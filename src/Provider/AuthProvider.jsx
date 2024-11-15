import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../Firebase/Firebase.config";


export const AuthContext = createContext()
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    console.log(user);

    const createNewUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    useEffect(()=>{

      const unSubscribe =   onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
        })
        return ()=>{
            unSubscribe()
        }
    },[])

    const userLogin = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = () =>{
      return signOut(auth)
    }

    const AuthInfo = {
        user,
        setUser,
        createNewUser,
        logOut,
        userLogin

    }
    
    return (
      <AuthContext.Provider value={AuthInfo}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;