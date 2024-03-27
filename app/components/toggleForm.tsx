'use client';

import { useState } from "react";

// Component for toggling a form visibility
export default function ToggleForm({children, text}:{children: React.ReactNode, text: string}) {
    // State to manage form visibility
    const [ openForm, setOpenForm ] = useState(false);
    
    // Function to toggle form visibility
    const toggleForm = () => setOpenForm(!openForm);
    
    return (
        <div className='w-full'>
            {/* Conditional rendering based on text prop */}
            {text === 'Delete' ? 
            (
                <div className="sm:w-3/4 mx-auto">
                    <button onClick={toggleForm} type='button' className='px-4 btn-shadow rounded-lg text-primary py-2'>
                    {text}
                    </button>
                </div>
            ) : (
                <div className="sm:w-3/4 mx-auto"><button onClick={toggleForm} type='button' className='w-1/4 btn-shadow rounded-lg text-primary py-2'>{text}</button></div>
            )
            }
            
            {/* Conditional rendering based on openForm state */}
            {openForm ? (
                <div className='w-full h-screen overflow-scroll fixed z-100 top-0 bg-default/90 py-10'> 
                    <button className="w-3/4 text-right text-primary text-xl" onClick={toggleForm} >
                        Cancel
                    </button>
                    <div>
                        { children }
                    </div>
                </div>
            )  : ''}   
        </div>
    )
}
