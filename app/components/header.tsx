import { cookies } from "next/headers";
import Link from "next/link";
import Nav from "./nav";

export default function Header() {
    // Retrieve user information from cookies
    const cookieStore = cookies()
    const user = cookieStore.get('user')?.value
    const userId = cookieStore.get('userid')?.value

    return (
        <div className="flex justify-between px-8 py-4 shadow-sm">
            {/* Brand logo */}
            <Link href={'/'} className="text-primary text-2xl font-bold">MP</Link>

            {/* Conditional rendering based on user authentication */} 
            {userId ?
            (
                <div className="flex items-center gap-4">
                    <Nav user={user} />
                </div>
            ) : (
                <div className="flex items-center gap-8 text-primary">
                    <Link href={'/login'} className="" >Login</Link>
                    <Link href={'/register'} >Register</Link>
                </div>
            )}
        </div>
    )
}
