'use client'

import Link from "next/link"

 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
      <div className="flex justify-between px-8 py-8">
        <Link href={'/'} className="text-primary text-2xl font-bold">MP</Link> 
        <Link href={'/register'} className='text-2xl text-primary font-bold'>X</Link> 
      </div>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}