import {  createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from "../firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();
function AuthProvider ({children}) {
        const axiosPublic = useAxiosPublic();
        const[user, setUser] = useState(null);
        const[loading, setLoading] = useState(true)
        const createUser = (email, password) =>{
          setLoading(true);
          return createUserWithEmailAndPassword(auth, email, password);
        }
        const signIn = (email, password) =>{
          setLoading(true);
          return signInWithEmailAndPassword(auth, email, password);
        }
        const updateUserProfile = (name, photo)=>{
          setLoading(true);
          return  updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: photo
          })
      }
      const googleSignIn = ()=>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }
      const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }
      useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            if(currentUser){
              //get token and store client
              const userInfo={
                email : currentUser.email
              }
               axiosPublic.post('/jwt',userInfo)
               .then(res=>{
                if(res.data.token){
                  localStorage.setItem('access-token', res.data.token);
                  setLoading(false)
                }
               })
            }else{
              localStorage.removeItem('access-token');
              setLoading(false);
            }
            
            
        }) 
        return ()=>{
            unSubscribe();
        }
    },[axiosPublic])
        const authInfo = {
            user,
            setUser,
            createUser,
            signIn,
            googleSignIn,
            signOutUser,
            updateUserProfile,
            loading,
            setLoading,
            
        }
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>

}

export default AuthProvider