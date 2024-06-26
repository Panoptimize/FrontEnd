import React, { useState } from "react";
import { IAgentCard } from "./types";

import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { Pill } from "../Pill";
import { DataCard } from "../DataCard";
import NoteCard from "../NoteCard/NoteCard";
import { NotesTable } from "../NotesTable";
import { getAgentNotes } from "../../services/notes/getAgentNotes";
import { IAgentPerformance, INoteData } from "../../pages/types";
import { getAgentId } from "../../services/agentsList/getAgentId";
import { getAgentMetrics } from "../../services/AgentMetrics/getAgentMetrics";

const AgentCard: React.FC<IAgentCard> = ({
  bttnTitle,
  title,
  name,
  email,
  workspace,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [agentId, setAgentId] = useState<number>();

  const [notesData, setNotesData] = useState<INoteData[]>([]);
  const [metricsData, setMetricsData] = useState<IAgentPerformance>();

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpen = async () => {
    setIsVisible(true);
    try {
      await getId(id);
    } catch (error) {
      console.error(error);
    }
  };

  const getId = async (id: string) => {
    try {
      const data = await getAgentId(id);
      if (data && data.data) {
        setAgentId(data.data.id);
        await getMetrics(data.data.id);
        await getNotes(data.data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const receivedSignal = () => {
    handleOpen();
  };

  const getNotes = async (agentId: number) => {
    await getAgentNotes(agentId)
      .then((data) => {
        if (data && data.data) {
          setNotesData(data.data.content);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getMetrics = async (agentId: number) => {
    await getAgentMetrics(agentId)
      .then((data) => {
        if (data && data.data) {
          
          setMetricsData(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!isVisible)
    return (
      <button
        type="button"
        onClick={handleOpen}
        className="bg-teal-100 hover:bg-teal-600 text-teal-900 font-bold py-2 px-4 rounded"
        data-testid="view-details-button"
      >
        {bttnTitle}
      </button>
    );

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/[0.3]">
      <div
        className="flex flex-auto flex-col bg-white rounded-3xl 
        shadow-lg p-8 max-w-[900px] w-full max-h-[600px] h-[600px]"
      >
        <div className="flex flex-row items-center justify-between mb-3">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
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
                <Pill title={workspace}></Pill>
              </div>
              <div className="flex flex-col h-full w-full">
                <h4 className="my-3 font-bold text-xl">Agent Details Today</h4>
                <h4 className="mb-2">{name}</h4>
                <h4 className="text-xs">{email}</h4>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-5 w-full">
            <div className="grid grid-cols-4 space-x-3">
              <DataCard
                title="Call Time"
                content={
                  metricsData?.avgHandleTime
                    ? `${metricsData.avgHandleTime} s`
                    : null
                }
                textColor="green"
              ></DataCard>
              <DataCard
                title="After Call Time"
                content={
                  metricsData?.avgHandleTime
                    ? `${metricsData.avgAfterContactWorkTime} s`
                    : null
                }
                textColor="purple"
              ></DataCard>
              <DataCard
                title="Hold Time"
                content={
                  metricsData?.avgHandleTime
                    ? `${metricsData.avgHoldTime} s`
                    : null
                }
                textColor="yellow"
              ></DataCard>
              <DataCard
                title="Abandon Time"
                content={
                  metricsData?.avgHandleTime
                    ? `${metricsData.avgAbandonTime} s`
                    : null
                }
                textColor="red"
              ></DataCard>
            </div>
            <div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-between space-x-2">
                  <h2 className="text-xl font-bold">Notes:</h2>
                </div>
                <div>
                  <NoteCard
                    area={workspace}
                    connectId={id}
                    agentId={agentId}
                    metrics={metricsData ? metricsData : undefined}
                    signalNotesRow={receivedSignal}
                    bttn_color="teal"
                  ></NoteCard>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col">
              <div>
                <NotesTable
                  name={name}
                  area={workspace}
                  notesData={notesData}
                  signalToAgentCard={receivedSignal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
