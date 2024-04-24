import React from 'react'
import { IAvatar } from './types'
import './Avatar.css'
import default_img from '../../assets/icons/default-copia.png'
import item1 from '../../assets/icons/check_mark.png'
import item2 from '../../assets/icons/plus.png'
import item3 from '../../assets/icons/minus.png'
import item4 from '../../assets/icons/x-mark.png'

const Avatar: React.FC<IAvatar> = ({  
    profile_img, // Opciones válidas: ' ' o 'Link de la imagen'
    state, // Opciones válidas: true o false
    state_color, // Opciones válidas: 'green', 'purple', 'orange', 'grey'
    size, // Opciones válidas: 'large', 'small'
    square_border, // Opciones válidas: true, false 
    
}) => {

    profile_img = !profile_img? profile_img = default_img : profile_img;
    state = !state? state = false : true;
    state_color = !state_color? state_color = 'green' : state_color;
    size = !size? size = 'small' : size;
    square_border = !square_border? square_border = false : true;

    const st_color = (st: string | undefined) =>{
        let color;
        switch (st) {
            case 'green':
                color = '#18A452'
                return color;  
            case 'purple':
                color = '#AE54E5'
                return color;   
            case 'orange':
                color = '#EE9D11'
                return color;  
            case 'grey':
                color = '#4A5767'
                return color;  
            default:
                break;
        }
    }

    const size_img = (sz: string | undefined) => {
        
        if(sz === 'large'){
            return 130;
        }
        else if(sz === 'small'){
            return 40;
        }

    }

    const size_state = (sz: string | undefined) => {
        if(sz === 'small'){
            return 44;
        }
    }

    const st_img = (scl: string | undefined) => {
        let icon;
        switch (scl) {
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

    const sq = (sb: boolean | undefined) => {
        if(sb){
            return 8;
        }else{
            return 100;
        }
    }

    const final = () =>{
        if(size_img(size) === 130){
            return(
                <div className='relative' style={{height:size_img(size), width:size_img(size), borderRadius:sq(square_border) , overflow: 'hidden'}}>
                    <img src={profile_img} alt='img' className='h-full w-full' style={{borderRadius:sq(square_border), overflow: 'hidden'}}/> 
                </div>
            )            
        }
        else if (size_img(size) === 40){
            if(state){
                return(
                    <div className='rounded-full flex items-center justify-center' style={{backgroundColor: st_color(state_color), backgroundSize: 'cover', height:size_state(size), width:size_state(size)}}>
                        <div className='h-28 w-28 relative rounded-full' style={{height:size_img(size), width:size_img(size)}}>
                            <img src={profile_img} alt='img' className='rounded-full h-full w-full'/> 
                        </div>
                        <div className='absolute rounded-full h-3 w-3 ml-7 mt-7 items-center justify-center' style={{backgroundColor: st_color(state_color), padding: 2}}>
                            <img src={st_img(state_color)} alt='icon' className='h-full w-full'/>
                        </div>
                    </div>
                )
    
            }else{
                return(
                    <div className='relative' style={{height:size_img(size), width:size_img(size), borderRadius:sq(square_border) , overflow: 'hidden'}}>
                        <img src={profile_img} alt='img' className='h-full w-full' style={{borderRadius:sq(square_border), overflow: 'hidden'}}/> 
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