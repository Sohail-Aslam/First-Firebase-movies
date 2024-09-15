
import { useState } from "react";
import { auth, googleProvide } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
export const Auth = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {

      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err)
    }
  }

  const googleSignin = async () => {
    try {

      await signInWithPopup(auth, googleProvide);
    } catch (err) {
      alert(err)
    }

  }

  const logOut = async () => {
    try {

      await signOut(auth);
    } catch (err) {
      alert(err)
    }

  }

  return(
    <>
    <div className='section account'>
      
    <p class="logo" data-text="Movix">Movix</p>
    <div className="ball-container">

      <div className="ball"></div>
      <div className="content">

        <input className="input" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={signIn}>Sign In</button>
        <button onClick={googleSignin}>Sign In With Google</button>
        <button onClick={logOut}>Logout</button>
      </div>
    </div>
  </div>
    </>
  )
}