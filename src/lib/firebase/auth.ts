import {
  createUserWithEmailAndPassword,
  getAuth,
  
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import {
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  signInWithPopup,
  useDeviceLanguage,
} from "firebase/auth";
import { toast } from "@/components/ui/use-toast"
import { app } from "."

export const auth = getAuth(app)

export const registerUser = async (email: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}
export const signInUser = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}
export const logOutUser = async () => {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const emailVerification = async () => {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser)
      toast({
        title: "Email verification sent",
        description: "Check your email for a verification link",
      })
      return
    }
    return
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    })
    throw new Error(error.message)
  }
}

import type { Auth, AuthError, AuthProvider, User } from "firebase/auth";

const CREDENTIAL_ALREADY_IN_USE_ERROR = "auth/credential-already-in-use";
export const isCredentialAlreadyInUseError = (e: AuthError) =>
  e?.code === CREDENTIAL_ALREADY_IN_USE_ERROR;

export const logout = async (auth: Auth): Promise<void> => {
  return signOut(auth);
};

export const getGoogleProvider = (auth: Auth) => {
  const provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  useDeviceLanguage(auth);
  provider.setCustomParameters({
    display: "popup",
  });

  return provider;
};

export const loginWithProvider = async (
  auth: Auth,
  provider: AuthProvider
): Promise<User> => {
  const result = await signInWithPopup(
    auth,
    provider,
    browserPopupRedirectResolver
  );

  return result.user;
};
