import Link from 'next/link'
import React from 'react'

export default function loading() {
  return (
    <>
    {/* Brand logo */}
      <div className="py-4 shadow-sm">
      <Link href={'/'} className="pl-16 text-primary text-xl sm:text-3xl font-bold">MP</Link> 
      </div>
      <div className='w-1/4 mx-auto mt-40'>
        <p className='text-primary '>Loading...</p>
      </div>
    </>
  )
}
