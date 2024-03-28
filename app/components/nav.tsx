'use client'

import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { logout } from "../actions/logout";

interface MobileMenuProps {
  isopen: boolean;
  mobile: boolean; 
  toggleMenu: () => void;
  user: string | undefined
}

interface NavLinksProps {
  close: () => void;
  user: string | undefined
}

// Component for desktop navigation menu
const DesktopMenu = ({ user }: {user: string | undefined} ) => {
  return (
    <nav className="flex items-center gap-4">
      <Link href="/createpost" className="hover:opacity-50">
        Create Post
      </Link>
      <Link href={`/profile`} className="hover:opacity-50">
        @{user}
      </Link>
      <button  onClick={async () => {
        await logout();
      }}
      className="hover:opacity-50" 
      >
        Logout
      </button>      
    </nav> 
  )
}

// Component for mobile navigation menu links
const NavLinks: React.FC<NavLinksProps> = ({ close, user }) => (
  <nav className="flex flex-col items-start gap-4">
    <Link href="/createpost" onClick={close} className="hover:opacity-50 border-b border-b-primary">
      Create Post
    </Link>
    <Link href={`/profile`} onClick={close} className="hover:opacity-50 ">
      @{user}
    </Link>
    <button onClick={async () => {
        await logout();
        close
      }} className="hover:opacity-50 border-b border-b-primary">
      Logout
    </button>
  </nav>
);

// Component for mobile navigation menu
const MobileMenu: React.FC<MobileMenuProps> = ({ isopen, mobile, toggleMenu, user }) => {
  return ( 
    <div onClick={toggleMenu} className="cursor-pointer" >
      { mobile && !isopen && <p className="cursor-pointer" onClick={toggleMenu}>Account</p>}
      { isopen && 
      <div className="fixed top-0 left-0 h-full w-full cursor-pointer" onClick={toggleMenu}>
        <div className="absolute shadow h-1/4 w-3/4 top-20 right-0 bg-default px-4 py-4" >
          <NavLinks close={toggleMenu} user={user} />   
        </div>
      </div> 
      }
    </div> 
  );
};

// Main navigation component
export default function Nav ({ user } : {user: string | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);
    
  return (
    <div className="w-full flex justify-between items-center py-1 sm:px-20 text-primary" 
      
    >
      {isMobile ? 
        (
          <MobileMenu mobile={isMobile} isopen={isOpen} toggleMenu={toggleMenu} user={user}  />
        ) 
        : 
        ( 
          <DesktopMenu user={user} />  
        ) 
      }
    </div>
  )
}; 