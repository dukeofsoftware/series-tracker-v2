import { FC } from 'react'
import SignIn from "@/components/auth/SignIn"
import CloseModal from "@/components/CloseModal"

const Page: FC = () => {
    return (
        <div className='fixed inset-0 bg-zinc-900/20 z-10'>
            <div className='container flex items-center h-full max-w-xl mx-auto'>
                <div className='relative bg-white w-full h-fit py-20 px-2 rounded-lg'>
                    <div className='absolute top-4 right-4'>
                        <CloseModal />
                    </div>

                    <SignIn />
                </div>
            </div>
        </div>
    )
}
export default Page