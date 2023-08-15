'use client'

import { FC } from 'react'
import { BsSearch } from 'react-icons/bs';
import { Input } from './ui/input';

interface SearchBarProps {
    text: string
    setText: (text: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ text, setText }) => {


    return <div className=' relative w-full flex items-center'>
        <Input id='search' onChange={(e) => setText(e.target.value)} value={text} className='w-full ' />
        <label htmlFor="search" className="absolute right-0 -translate-x-[100%]">
            <BsSearch className="" />
        </label>
    </div>
}

export default SearchBar