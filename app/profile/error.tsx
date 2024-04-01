'use client'

import Link from "next/link"

 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
      {/* Brand logo */}
      <div className="py-4 shadow-sm">
        <Link href={'/'} className="pl-16 text-primary text-xl sm:text-3xl font-bold">MP</Link> 
      </div>

        <div className="w-1/4 mx-auto mt-40">
          <h2>Something went wrong!</h2>
          <button onClick={() => reset()} className="text-primary">Try again</button>
        </div>

      </body>
    </html>
  )
}