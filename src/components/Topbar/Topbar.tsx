import React from 'react';
import avatar from '../../assets/images/Toretto.jpg';
import { IoIosNotifications } from "react-icons/io";
import './Topbar.css';


const Topbar = ({variant = 0} : {variant? : number}) => {
    
    let numberOfNotifications;
    let displayOption = 'hidden ';

    if(variant > 0){
        numberOfNotifications = variant;
        displayOption = 'block'
        
    }

    return (
        <div className='flex justify-between bg-[#C9F7F5]'>
            <div className='flex items-center gap-2 h-16 px-5'>
            <p className='text-gray-600 font-medium text-lg'>Welcome</p>
            <p className='font-medium text-lg'>John</p>
            </div>
            <div className=' h-16  flex'>
                <div className='relative'>
                    <IoIosNotifications className={`h-full text-4xl notification mr-1`}/>
                    <div className={`${displayOption}  w-4 h-4 rounded-full bg-red-500 flex justify-center items-center absolute bottom-3 right-0`}> 
                        <p className='text-white font-medium text-xs relative'>
                            {numberOfNotifications}
                        </p>
                    </div>
                </div>
                
                <div className='h-full flex flex-col justify-center items-center px-7'>
                    <div className='h-full flex flex-col justify-center'>
                        <p className='text-left text-lg'>John Connor</p>
                        <p className='text-gray-600 text-left text-xs'>jconnor28@gmail.com</p>
                    </div>
                </div>
                <img className='h-full p-2 rounded-full' src={avatar} alt="" />
            </div>
        </div>
    )
}

export default Topbar