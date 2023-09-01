
import { FaSpinner } from 'react-icons/fa'

const loading = async () => {
    return <div className='grid place-items-center min-h-screen w-full'>
        <div className='flex gap-2 flex-col items-center'>
            <FaSpinner className="w-16 h-16 mr-2 animate-spin" />
            <span className='text-lg text-sky-500'>
                Loading...
            </span>
        </div>

    </div>
}

export default loading