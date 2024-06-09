import React, { useEffect, useState } from "react";
import { INoteCard } from "./types";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { Pill } from "../Pill";
import { NoteInputs } from "../NoteInputs";
import { IAgentPerformance } from "../../pages/types";
import { getAgentPerformanceByNote } from "../../services/agentPerformance/getAgentPerformanceByNote";

const NoteCard: React.FC<INoteCard> = ({
  bttnTitle = "Add note",
  title,
  text,
  priority,
  id,
  agentId,
  name,
  metrics,
  area,
  bttn_color = "transparent",
  signalNotesRow,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [agentPerformance, setAgentPerformance] = useState<IAgentPerformance | null>(null);

  const handleClose = () => {
    console.log("Signal received from NoteInputs");
    sendSignalToRow();
    setIsVisible(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
    if(metrics){
      setAgentPerformance(metrics)
    }
  };

  const sendSignalToRow = () => {
    if(signalNotesRow){
      signalNotesRow();
    }
  }

  const getAgentPerformance =  async (noteId: number) => {
    await getAgentPerformanceByNote(noteId).then((data) =>{
      if(data && data.data){
        console.log(data.data)
        setAgentPerformance(data.data)
        console.log(agentPerformance)
      }
    }).catch((error) => {
      console.error(error);
    })
  };

  useEffect(() => {
    if (isVisible && id) {
      getAgentPerformance(id);
    }
  }, [isVisible, id, agentPerformance]);

  if (!isVisible)
    return (
      <Button
        baseColor={bttn_color}
        text={bttnTitle}
        onClick={handleOpen}
      ></Button>
    );

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/[0.3]">
      <div
        className="flex flex-auto flex-col bg-white rounded-3xl p-8"
        style={{
          maxWidth: "900px",
          width: "100%",
          maxHeight: "600px",
          height: "600px",
        }}
      >
        <div className="flex flex-row items-center justify-between mb-3">
          <h2 className="text-3xl font-bold mb-2">Contact Note</h2>
          <div>
            <Button
              baseColor="transparent"
              image="Cross.svg"
              onClick={handleClose}
            />
          </div>
        </div>
        <div className="flex flex-auto flex-row space-x-5">
          <div className="w-60 overflow-clip">
            <div className="flex flex-col w-full place-items-center my-2">
              <div className="flex flex-col place-items-center space-y-3 mb-5">
                <Avatar size="large"></Avatar>
                <Pill title={area}></Pill>
              </div>
              <div className="flex flex-col h-full w-full">
                <h4 className="my-3 font-bold text-xl">Agent Metrics</h4>
                <h4 className="mb-4">{name}</h4>
                {agentPerformance ? (
                  <>
                    <h4> Avg Abandon Time: <span className="font-bold">{agentPerformance.avgAbandonTime}</span></h4>
                    <h4> Avg ACWT: <span className="font-bold">{agentPerformance.avgAfterContactWorkTime}</span></h4>
                    <h4> Avg Handle Time: <span className="font-bold">{agentPerformance.avgHandleTime}</span></h4>
                    <h4> Avg Hold Time: <span className="font-bold">{agentPerformance.avgHoldTime}</span></h4>
                  </>
                ) : ( 
                  <p>Loading metrics...</p>
                )}
              </div>
            </div>
          </div>
          <NoteInputs
            id={id}
            agentId={agentId}
            metrics={agentPerformance ? agentPerformance : undefined}
            title={title}
            text={text}
            priority={priority}
            closeWindow={handleClose}
          ></NoteInputs>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
