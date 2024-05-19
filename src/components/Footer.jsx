import React from 'react'

const Footer = () => {
    return (
        <div className='bg-blue-200 flex flex-col justify-center items-center bottom-0 w-full'>
            <div className="logo font-bold text-black text-2xl">
                <span className="text-green-600">&lt;</span>
                Pass
                <span className='text-green-600'>OP/ &gt;</span>
            </div>
            <div className='flex justify-center items-center'>Created with <img className='w-7 mx-2' src="Icons/heart.png" alt="" /> by Mohd Ibaad</div>
        </div>
    )
}

export default Footer