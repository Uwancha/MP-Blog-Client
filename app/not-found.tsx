import Link from 'next/link'
 
export default function NotFound() {
  return (
    <>
    {/* Brand logo */}
      <div className="py-4 shadow-sm">
        <Link href={'/'} className="pl-16 text-primary text-xl sm:text-3xl font-bold">MP</Link> 
      </div>
      <div className='w-1/4 mx-auto mt-40'>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/" className='text-primary '>Return Home</Link>
      </div>
    </>
  )
}