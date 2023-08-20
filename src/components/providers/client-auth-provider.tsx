// client-auth-provider.tsx
"use client"

import * as React from "react"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import {
  User as FirebaseUser,
  IdTokenResult,
  onIdTokenChanged,
} from "firebase/auth"
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims"

import { getDocument } from "@/lib/firebase/firestore"
import { AuthContext, User } from "./context"

export interface AuthProviderProps {
  defaultUser: User | null
  children: React.ReactNode
}

function toUser(
  user: FirebaseUser,
  idTokenResult: IdTokenResult,
  username?: string
): User {
  return {
    ...user,

    // custom claims
    customClaims: filterStandardClaims(idTokenResult.claims),
    username: username,
  }
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  defaultUser,
  children,
}) => {
  const { getFirebaseAuth } = useFirebaseAuth()
  const [user, setUser] = React.useState(defaultUser)

  const handleIdTokenChanged = async (firebaseUser: FirebaseUser | null) => {
    if (!firebaseUser) {
      setUser(null)
      return
    }

    const idTokenResult = await firebaseUser.getIdTokenResult()
    const username = await getDocument("users", firebaseUser.uid).then(
      (doc) => doc?.username
    )
    setUser(toUser(firebaseUser, idTokenResult, username))
  }

  const registerChangeListener = async () => {
    const auth = getFirebaseAuth()
    return onIdTokenChanged(auth, handleIdTokenChanged)
  }

  React.useEffect(() => {
    const unsubscribePromise = registerChangeListener()

    return () => {
      unsubscribePromise.then((unsubscribe) => unsubscribe())
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
