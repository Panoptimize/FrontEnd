import React from 'react'
import { NotesRow } from '../../components/NotesRow'

const History:React.FC = () => {
  return (
    <div className='flex flex-auto flex-col bg-red-300'>
            <div className="font-poppins pt-6 pb-0 px-6">
                <h1 className="font-semibold text-3xl">
                    History
                </h1>
            </div>

            <div className='w-full bg-green-300 h-24'>

              <NotesRow title='Get better' priority={1} updateDate='24/05/2024'/>

            </div>

    </div>
  )
}

export default History