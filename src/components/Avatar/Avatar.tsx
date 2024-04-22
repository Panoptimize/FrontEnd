import React from 'react'
import { IAvatar } from './types'
import './Avatar.css'
import default_img from '../../constants/default-copia.png'
import item1 from '../../constants/check_mark.png'
import item2 from '../../constants/plus.png'
import item3 from '../../constants/minus.png'
import item4 from '../../constants/x-mark.png'

const Avatar: React.FC<IAvatar> = ({
    profile_img, // Opciones válidas: ' ' o 'Link de la imagen'
    state, // Opciones válidas: true o false
    state_color, // Opciones válidas: 'green', 'purple', 'orange', 'grey'
    size, // Opciones válidas: 'large', 'small'
    square_border // Opciones válidas: true, false

}) => {

    const pf_image = (profile_img: string) => {
        if(profile_img){
            return profile_img;
        }else{
            return default_img;
        }
    }

    const st_color = (state_color: string) =>{
        switch (state_color) {
            case 'green':
                state_color = '#18A452'
                return state_color;  
            case 'purple':
                state_color = '#AE54E5'
                return state_color;   
            case 'orange':
                state_color = '#EE9D11'
                return state_color;  
            case 'grey':
                state_color = '#4A5767'
                return state_color;  
            default:
                break;
        }
    }

    const size_img = (size: string) => {
        if(size === 'large'){
            return 130;
        }
        else if(size === 'small'){
            return 40;
        }

    }

    const size_state = (size: string) => {
        if(size === 'small'){
            return 44;
        }
    }


    const st_img = (state_color: string) => {
        let icon;
        switch (state_color) {
            case 'green':
                icon = item1
                return icon;  
            case 'purple':
                icon = item2
                return icon;   
            case 'orange':
                icon = item3
                return icon;  
            case 'grey':
                icon = item4
                return icon;  
            default:
                break;
        }
    }

    const sq = (square_border: boolean) => {
        if(square_border){
            return 8;
        }else{
            return 100;
        }
    }


    const final = () =>{
        if(size_img(size) === 130){
            return(
                <div className='relative' style={{height:size_img(size), width:size_img(size), borderRadius:sq(square_border) , overflow: 'hidden'}}>
                    <img src={pf_image(profile_img)} alt='img' className='h-full w-full' style={{borderRadius:sq(square_border), overflow: 'hidden'}}/> 
                </div>
            )            
        }
        else if (size_img(size) === 40){
            if(state){
                return(
                    <div className='rounded-full flex items-center justify-center' style={{backgroundColor: st_color(state_color), backgroundSize: 'cover', height:size_state(size), width:size_state(size)}}>
                        <div className='h-28 w-28 relative rounded-full' style={{height:size_img(size), width:size_img(size)}}>
                            <img src={pf_image(profile_img)} alt='img' className='rounded-full h-full w-full'/> 
                        </div>
                        <div className='absolute rounded-full h-3 w-3 ml-7 mt-7 items-center justify-center' style={{backgroundColor: st_color(state_color), padding: 2}}>
                            <img src={st_img(state_color)} alt='icon' className='h-full w-full'/>
                        </div>
                    </div>
                )
    
            }else{
                return(
                    <div className='relative' style={{height:size_img(size), width:size_img(size), borderRadius:sq(square_border) , overflow: 'hidden'}}>
                        <img src={pf_image(profile_img)} alt='img' className='h-full w-full' style={{borderRadius:sq(square_border), overflow: 'hidden'}}/> 
                    </div>
                )
            }
        }
        else{
            return(null)
        }

    }

    return(final())
}

export default Avatar