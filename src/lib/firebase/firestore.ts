import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"

import { app } from "."

const db = getFirestore(app)

// Function to add data to a Firestore collection
export async function addData(collection: string, id: string, data: any) {
  // Variable to store the result of the operation
  let result = null
  // Variable to store any error that occurs during the operation
  let error = null

  try {
    // Set the document with the provided data in the specified collection and ID
    result = await setDoc(doc(db, collection, id), data, {
      merge: true, // Merge the new data with existing document data
    })
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e
  }

  // Return the result and error as an object
  return { result, error }
}

// Function to retrieve a document from a Firestore collection
export async function getDocument(collection: string, id: string) {
  // Create a document reference using the provided collection and ID
  const docRef = doc(db, collection, id)
  // Variable to store the result of the operation
  let result = null
  // Variable to store any error that occurs during the operation
  let error = null

  try {
    // Retrieve the document using the document reference
    result = await getDoc(docRef)
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e
  }

  // Return the result and error as an object
  return { result, error }
}
