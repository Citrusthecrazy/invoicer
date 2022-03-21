import { signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const register = async (email:string,password:string) =>{
    await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
}

export const login = async (email:string,password:string) =>{
    await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
}

export const logout = async () =>{
    await signOut(auth);
}
