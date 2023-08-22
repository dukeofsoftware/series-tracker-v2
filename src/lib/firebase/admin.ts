import admin, { firestore } from "firebase-admin"

import { authConfig } from "@/config/server-config"
import { getFirestore } from "firebase-admin/firestore"

const initializeApp = () => {
  return admin.initializeApp({
    credential: admin.credential.cert(authConfig.serviceAccount),
  })
}

export const getFirebaseAdminApp = () => {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App
  }

  return initializeApp()
}

export const getFirebaseAdminAuth = () => {
  return getFirebaseAdminApp().auth()
}

export const getFirebaseAdminFirestore = () => {
  return getFirebaseAdminApp().firestore()
}
export const db = getFirestore(getFirebaseAdminApp());
