import React from 'react'
import { IoMdMenu } from "react-icons/io";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaRegCalendarMinus } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { LuHistory } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import logo from '../../constants/Panoptimize.png'
import './Navbar.css';

// Posible Variants
interface NavbarProps {
    variant: 'Dashboard' | 'ActionCenter' | 'Agents' | 'History'; 
}

const Navbar = ({variant} : {variant:string}) => {
    
    // Variant Selection
    let dashboardSelect = '';
    let ACSelect = '';
    let AgentsSelect = '';
    let HistorySelect = '';

    // Based on the selection, a different component will get the 'selected' class

    // Selected class will add a different background and color text
    if (variant === 'Dashboard') {
        dashboardSelect = 'selected';
    } else if (variant === 'ActionCenter') {
        ACSelect = 'selected';
    } else if (variant === 'Agents') {
        AgentsSelect = 'selected';
    }else if (variant === 'History') {
        HistorySelect = 'selected';
    }

    return (
        <div className='h-screen w-[15%] bg-[#C9F7F5] text-lg font-sanchez'>
            {/* Logo */}
            <div className='h-[12%] flex flex-col justify-around'>
                <img className='m-8' src={logo} alt="" />
            </div>
            {/* Overview */}
            <div className='h-[12%] w-full flex justify-center'>
                <div className='w-10/12 pl-3 flex items-center  gap-x-2'>
                    <IoMdMenu />
                    <button className='py-5'>
                        Overview
                    </button>
                </div>
            </div>
            {/* Navbar */}
            <nav className='h-1/4'>
                <ul className='h-full flex flex-col justify-around items-center	'>

                    {/* Dashboard */}
                    <li className={`${dashboardSelect} h-1/6 w-10/12 pl-3 py-5 flex items-center gap-x-2 rounded-md`}>
                        <MdOutlineDashboardCustomize />
                        <a href="#">
                            Dashboard
                        </a>
                    </li>

                    {/* Action Center */}
                    <li className={`${ACSelect} h-1/6 w-10/12 pl-3 py-5 flex items-center gap-x-2 rounded-md`}>
                        <FaRegCalendarMinus />
                        <a href="#">
                            Action Center
                        </a>
                    </li>

                    {/* Agents */}
                    <li className={`${AgentsSelect} h-1/6 w-10/12 pl-3 py-5 flex items-center gap-x-2 rounded-md`}>
                        <BsPeople />
                        <a href="#">
                            Agents
                        </a>
                    </li>

                    {/* History */}
                    <li className={`${HistorySelect} h-1/6 w-10/12 pl-3 py-5 flex items-center gap-x-2 rounded-md`}>
                        <LuHistory/>
                        <a href="#">
                            History
                        </a>
                    </li>

                </ul>
            </nav>
            {/* Blank space */}
            <div className='h-1/3'>

            </div>
            {/* Settings & Logout */}
            <div className='h-1/6 flex flex-col justify-around items-center	'>
                <div className='w-10/12 pl-3 flex items-center  gap-x-2'>
                    <CiSettings />
                    <a href="#">Settings</a>
                </div>
                <div className='w-10/12 pl-3 flex items-center  gap-x-2'>
                    <FiLogOut />
                    <a href="#">Logout</a>
                </div>
            </div>
        </div>
        
    )
    }

export default Navbar
