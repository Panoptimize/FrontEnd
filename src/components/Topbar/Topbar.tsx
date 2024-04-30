import React from 'react';
import avatar from '../../assets/images/Toretto.jpg';
import panoptimize from '../../assets/images/Panoptimize.png';
import menu from '../../assets/images/Menu.png';
import { IoIosNotifications } from "react-icons/io";
import './Topbar.css';
import {ITopbar} from './types';
import {Button} from '../Button';


const Topbar: React.FC<ITopbar>  = ({

    name = 'User', 
    fullName = 'User Unknown', 
    email = 'user@email.com',  
    img, 
    numberOfNotifications = 0

    }) => {
    
    let displayOption = 'hidden ';

    if(numberOfNotifications > 0){
        displayOption = 'block'
    }

    return (
        <div className='flex justify-between bg-teal-200'>
            <div className='flex items-center gap-4 h-16 px-5'>
                <img className='h-1/2' src={menu} alt="" />
                <img className='h-1/2' src={panoptimize} alt="" />
                <div className='flex items-center gap-2 h-full'>
                    <p className='text-gray-600 font-medium text-lg'>Welcome</p>
                    <p className='font-medium text-lg'>{name}</p>
                </div>
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
                        <p className='text-left text-lg'>{fullName}</p>
                        <p className='text-gray-600 text-left text-xs'>{email}</p>
                    </div>
                </div>
                <img className='h-full p-2 rounded-full' src={avatar} alt="" />
            </div>
        </div>
    )
}

export default Topbar