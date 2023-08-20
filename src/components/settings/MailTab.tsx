"use client"

import UpdateEmail from "./UpdateEmail"
import VerifyMail from "./VerifyMail"

const MailTab = () => {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <UpdateEmail />
      <VerifyMail />
    </div>
  )
}

export default MailTab
