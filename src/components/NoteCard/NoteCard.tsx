import React, { useEffect, useState } from "react";
import { INoteCard } from "./types";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { Pill } from "../Pill";
import { NoteInputs } from "../NoteInputs";
import { IAgentPerformance } from "../../pages/types";
import { getAgentPerformanceByNote } from "../../services/agentPerformance/getAgentPerformanceByNote";
import { getAgentMetrics } from "../../services/AgentMetrics/getAgentMetrics";
import { getAgentId } from "../../services/agentsList/getAgentId";

const NoteCard: React.FC<INoteCard> = ({
  bttnTitle = "Add note",
  title,
  text,
  priority,
  id,
  connectId,
  name,
  metrics,
  area,
  bttn_color = "transparent",
  signalNotesRow,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [agentPerformance, setAgentPerformance] = useState<IAgentPerformance | null>(null);
  const [agentId, setAgentId] = useState<number>();

  const handleClose = () => {
    sendSignalToRow();
    setIsVisible(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
    if (metrics) {
      setAgentPerformance(metrics);
    }
  };

  const sendSignalToRow = () => {
    if (signalNotesRow) {
      signalNotesRow();
    }
  };

  const getAgentPerformance = async (noteId: number) => {
    try {
      const response = await getAgentPerformanceByNote(noteId);
      console.log(response.data);
      if (response.data) {
        setAgentPerformance(response.data);
        console.log(agentPerformance);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMetrics = async (agentId: number) => {
    try {
      const response = await getAgentMetrics(agentId);
      if (response && response.data) {
        setAgentPerformance(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getId = async (id: string) => {
    try {
      const response = await getAgentId(id);
      if (response.data) {
        const agentDbId = response.data.id;
        setAgentId(agentDbId);
        return agentDbId;
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    console.log(isVisible, id, connectId);
    if (isVisible && id) {
      getAgentPerformance(id);
    } else if (isVisible && !id && connectId) {
      const fetchMetrics = async () => {
        const agentDbId = await getId(connectId);
        if (agentDbId && !metrics) {
          await getMetrics(agentDbId);
        }
      };

      fetchMetrics();
    }
  }, [isVisible]);

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
        className="flex flex-auto flex-col bg-white rounded-3xl p-8 max-w-[900px] w-full h-[600px] overflow-y-auto"
      >
        <div className="flex flex-row items-center justify-between mb-3">
          <h2 className="text-3xl font-bold mb-2">Agent Note</h2>
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
                    <h4>Avg Abandon Time: <span className="font-bold">{agentPerformance.avgAbandonTime == null ? "0" : agentPerformance.avgAbandonTime}</span></h4>
                    <h4>Avg ACWT: <span className="font-bold">{agentPerformance.avgAfterContactWorkTime == null ? "0" : agentPerformance.avgAfterContactWorkTime}</span></h4>
                    <h4>Avg Handle Time: <span className="font-bold">{agentPerformance.avgHandleTime == null ? "0" : agentPerformance.avgHandleTime}</span></h4>
                    <h4>Avg Hold Time: <span className="font-bold">{agentPerformance.avgHoldTime == null ? "0" : agentPerformance.avgHoldTime}</span></h4>
                  </>
                ) : (
                  <p>Loading metrics...</p>
                )}
              </div>
            </div>
          </div>
          {agentId || id ? (
            <NoteInputs
              id={id}
              agentId={agentId}
              metrics={agentPerformance ? agentPerformance : undefined}
              title={title}
              text={text}
              priority={priority}
              closeWindow={handleClose}
            />
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;