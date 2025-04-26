import React from 'react'

const SearchBar = () => {
    return (
        <div className="w-full h-[10%] bg-purple-100 flex  justify-center items-center gap-4">
            <input type="text" name="" id=""
                className='outline-none border-2 w-1/2 p-2 rounded-lg '
                placeholder='Search....'
            />
            <button className='px-5 bg-purple-500 py-2 rounded-2xl text-white'>Search</button>
        </div>
    )
}

export default SearchBar