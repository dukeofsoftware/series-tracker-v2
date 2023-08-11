'use client'

import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Button } from './ui/button'

interface CloseModalProps {}

const CloseModal: FC<CloseModalProps> = ({}) => {
    const router = useRouter()
  return <>
      <Button variant='subtle' className='h-6 w-6 p-0 rounded-md' onClick={() => router.back()}>
      <AiOutlineClose className="w-4 h-4" />

      </Button>


  </>
}

export default CloseModal