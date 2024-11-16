import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/Firebase.config";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()
const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(loading,user);

    const createNewUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    useEffect(()=>{

      const unSubscribe =   onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unSubscribe()
        }
    },[])

    const userLogin = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = () =>{
        setLoading(true)
      return signOut(auth)
    }

    const updatedUserProfile = (updatedData) =>{
        return updateProfile(auth.currentUser, updatedData)
    }

    const AuthInfo = {
        user,
        setUser,
        createNewUser,
        logOut,
        userLogin,
        loading,
        updatedUserProfile

    }

    return (
      <AuthContext.Provider value={AuthInfo}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;