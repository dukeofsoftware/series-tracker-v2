"use client"


import UpdateDisplayName from "./UpdateDisplayName"
import UpdateProfilePhoto from "./UpdateProfilePhoto"
import UpdateUsername from "./UpdateUsername"



const AccountTab = () => {

  return (
    <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">

      <UpdateProfilePhoto />
      <UpdateUsername />
      <UpdateDisplayName />
    </div>
  )
}

export default AccountTab
