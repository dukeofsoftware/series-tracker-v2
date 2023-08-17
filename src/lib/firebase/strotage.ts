import { updateProfile, User } from "firebase/auth"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

import { toast } from "@/components/ui/use-toast"
import { app } from "."
import { addData } from "./firestore"

const strotage = getStorage(app)

export async function uploadProfilePhoto(file: File, currentUser: User) {
  try {
    /* get file . */
    const fileType = file.type.split("/")[1]
    const fileRef = ref(strotage, currentUser.uid + "." + fileType)
    const snapshot = await uploadBytes(fileRef, file)

    const photoURL = await getDownloadURL(fileRef)

    await updateProfile(currentUser, {
      photoURL,
    })
    await addData("users", currentUser.uid, { photoURL })
    toast({
      title: "Success",
      description: "Profile photo updated",
    })
  } catch (error) {
    console.error(error)
  }
}
