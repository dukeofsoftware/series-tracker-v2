import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore"

import { app } from "."
import { useUsernameStore } from "./../../hooks/useUsername"
import { auth } from "./auth"

export const db = getFirestore(app)

export async function getCollection(collectionName: string) {
  try {
    const data = await getDocs(collection(db, collectionName))
    /* format data */
    const formatted = data.docs.map((doc) => {
      return { ...doc.data() }
    })

    return formatted as any
  } catch (e: any) {
    throw new Error(e)
  }
}
export async function addData(collection: string, id: string, data: any) {
  try {
    return await setDoc(doc(db, collection, id), data, {
      merge: true, // Merge the new data with existing document data
    })
  } catch (e: any) {
    throw new Error(e)
  }
}

// Function to retrieve a document from a Firestore collection
export async function getDocument(collection: string, id: string) {
  // Create a document reference using the provided collection and ID
  try {
    const docRef = doc(db, collection, id)
    const data = await getDoc(docRef)
    return data.data()
  } catch (e: any) {
    throw new Error(e)
  }
}

export async function deleteData(collection: string, id: string) {
  try {
    return await deleteDoc(doc(db, collection, id))
  } catch (e: any) {
    throw new Error(e)
  }
}
