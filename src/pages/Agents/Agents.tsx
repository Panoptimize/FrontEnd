import React, {useState} from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Topbar } from '../../components/Topbar';
import { AgentTable } from '../../components/AgentTable';
import { SearchBox } from '../../components/SearchBox';
import { ChoiceBox } from '../../components/ChoiceBoxes/ChoiceBox';
import { Button } from '../../components/Button';
import { Avatar } from '../../components/Avatar';
import { DataCard } from '../../components/DataCard';
import { ActivityChart } from '../../components/ActivityChart';
import { SatisfactionChart } from '../../components/SatisfactionChart';
import { ContactMedium } from '../../components/ContactMedium';
import { UserInfoCard } from '../../components/UserInfoCard';

// ICONS
import { IoMdClose } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";



function Agents() {
  function searchTerm() {
    console.log("Hello");
    
  }
  const [createAgentModal, setCreateAgentModal] = useState(false);
  const [agentPerformanceModal, setAgentPerformanceModal] = useState(false);

  const toggleCreateAgentModal = () => {
    setCreateAgentModal(!createAgentModal)
  }

  const toggleAgentPerformanceModal = () => {
    setAgentPerformanceModal(!agentPerformanceModal)
  }

  const viewDetails = (id: number) => {
    console.log('view details navigate', id)
    // llamas en endpoint async
    // ya con la respuesta, setState 
    toggleAgentPerformanceModal();
  }

  return (


    <div className="App">
      {/* AGENTS VIEW */}
      <div className='flex flex-col w-full'>

        {/* TOPBAR */}
        <div>
          <Topbar/>
        </div>

        {/* CONTENT */}
        <div className='flex'>
          
          {/* NAVBAR */}
          <div>
            <Sidebar/>

          </div>


          <div className='flex flex-col grow'>

            {/* TITLE */}
            <div className='flex justify-between items-center bg-teal-100 py-3 px-2'>
              {/* AGENTS + SEARCH BAR */}
              <div className='flex justify-around items-center'>
                <h1 className='px-3 text-3xl font-bold'>Agents</h1>
                <SearchBox hint='Search' handleSearch={(searchTerm)}/>
              </div>

              {/* ORDER + CREATE */}
              <div className='h-1/2 w-1/3 flex justify-around items-center'>
                <ChoiceBox 
                  boxText = {"Sort by: " }
                  options= {[
                      { value: "Call Time", label: "Call Time" },
                      { value: "option2", label: "Option 2" },
                      { value: "option3", label: "Option 3" },
                    ]}/>
                <UserInfoCard/>
              </div>
            
            </div>

            {/* AGENTS TABLE */}
            <div className='bg-teal-100 h-full'>
              <AgentTable rows= {[{
                  "agentImage": "https://saki.ichoria.org/f/y3gml/Mark_Hamill_by_Gage_Skidmore_2.jpg",
                  "name": "Mark Hamill",
                  "workspace1": "Sales",
                  "workspace2": "Delivery",
                  "overallScore": 90,
                  "lastActivity": "3 days ago",
                  "details": "View Details",
                  "id": 1
                }
              ]} onclick={viewDetails}/>
            </div>
          </div>
          
          
        </div>
      </div>
      
      {/* MODAL - AGENT STATS */}
      {agentPerformanceModal && (
        <div>
          <div onClick={toggleAgentPerformanceModal} className='inset-0 bg-black opacity-40 fixed'>
          </div>
          <div className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.7)] fixed inset-x-[7%] inset-y-[7%] flex flex-col rounded-lg'>
          
            {/* TITULO */}
            <div className='flex justify-between items-start p-5'>
              <h2 className='px-3 text-3xl font-bold'>Agent Performance</h2>
              <div className='p-2' onClick={toggleAgentPerformanceModal}>
                <IoMdClose />
              </div>
            </div>

            {/* Contenido */}
            <div className='grow flex'>

              {/* AVATAR */}
              <div className='flex flex-col justify-evenly items-center grow'>
                <Avatar size='large'/>
                <p>Nombre</p>
                <p>Correo</p>
                <p>Usuario</p>
                {/* TAGS */}
                <div className='flex'>
                  <div className='flex justify-center items-center rounded bg-teal-100 px-2 m-1'> Workspace</div>
                  <div className='flex justify-center items-center rounded bg-teal-100 px-2 m-1'> Sales</div>
                </div>
                <div className='flex'>
                  <div className='flex justify-center items-center rounded bg-teal-100 px-2 m-1'> Delivery</div>
                </div>
              </div>

              {/* GRAFICAS */}
              <div className='flex flex-col'>

                {/* TOP */}
                <div className='flex gap-3'>
                  <ContactMedium/>
                  <SatisfactionChart/>
                </div>
                {/* BOT */}
                <div className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] flex flex-col grow m-2 p-2 px-4 rounded-lg text-left'>
                  <p className='my-3 font-black'>Feedback List</p>
                  <p>Feedback 5 .................................28/04/2024</p>
                  <p>Feedback 4 .................................27/04/2024</p>
                  <p>Feedback 3 .................................26/04/2024</p>
                  <p>Feedback 2 .................................25/04/2024</p>
                  <p>Feedback 1 .................................24/04/2024</p>

                </div>
              </div>


              {/* DATA CARDS */}
              <div className='p-2 flex flex-col gap-1'>

                {/* TOP */}
                <div className='flex flex-col justify-around grow'>
                  {/* TOP TOP */}
                  <div className='flex justify-around w-full'>
                    <DataCard title={'Total Contacts'} content={'53'} />
                    <DataCard title={'Avg. Answer Speed'} content={'00:00:15'} />
                    <DataCard title={'Avg. Answer Time'} content={'00:02:58'} />
                  </div>
                  {/* TOP BOT */}
                  <div className='flex justify-around w-full'>
                    <DataCard title={'Replied to on Time'} content={'98.2 %'} />
                    <DataCard title={'Abandon Rate'} content={'11 %'} />
                    <DataCard title={'Avg. Contacts/Minute'} content={'0.072'} />
                  </div>
                </div>
                
                {/* BOTTOM */}
                <div>
                  <ActivityChart/>
                </div>

              </div>

            </div>
            

            {/* Footer */}
            <div className='w-full h-[7%] my-4 flex justify-around'>
              <button onClick={() => { toggleAgentPerformanceModal(); toggleCreateAgentModal(); }} className='w-1/4 rounded-lg bg-teal-600'> Edit </button>
              <button onClick={toggleAgentPerformanceModal} className='w-1/4 rounded-lg bg-teal-600'> Give Feedback </button>
            </div>
          </div>
        </div>

      )}


    
    </div>
  );
}

export default Agents;