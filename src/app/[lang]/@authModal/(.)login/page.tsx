import { FC } from "react"

import SignIn from "@/components/auth/SignIn"
import CloseModal from "@/components/CloseModal"

const Page: FC = () => {
  return (
    <div className="fixed inset-0 z-10 bg-zinc-900/20">
      <div className="container mx-auto flex h-full max-w-xl items-center">
        <div className="relative h-fit w-full rounded-lg bg-white px-2 py-20">
          <div className="absolute right-4 top-4">
            <CloseModal />
          </div>

          <SignIn />
        </div>
      </div>
    </div>
  )
}
export default Page
