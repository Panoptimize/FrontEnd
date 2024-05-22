import React, { useState } from 'react';
import { IUserInfoCard } from './types';

const UserInfoCard: React.FC<IUserInfoCard> = ({
  name = 'Name',
  email = 'Email',
  username = 'Username',
  selectedWorkspaces: initialSelectedWorkspaces = [],
  availableWorkspaces: initialAvailableWorkspaces = ['Sales', 'Payments', 'Test', 'Customer', 'Testing'],
  profileImage,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWorkspaces, setSelectedWorkspaces] = useState<string[]>(initialSelectedWorkspaces || []);
  const [availableWorkspaces, setAvailableWorkspaces] = useState<string[]>(initialAvailableWorkspaces || []);

  const handleSelectWorkspace = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newWorkspace = e.target.value;
    if (!selectedWorkspaces.includes(newWorkspace)) {
      setSelectedWorkspaces(prev => [...prev, newWorkspace]);
    }
  };

  const handleRemoveWorkspace = (workspaceToRemove: string) => {
    setSelectedWorkspaces(prev => prev.filter(ws => ws !== workspaceToRemove));
  };

  const handleSave = () => {
    console.log('Guardando datos:', { name, email, username, selectedWorkspaces });
    setIsEditing(false);  // Volver al estado de no edición después de guardar
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (!isVisible) return <button onClick={handleOpen} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Details</button>;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={handleClose}></div>
      <div className="bg-white rounded-3xl shadow-lg p-8 mx-auto border border-gray-200 relative z-10" style={{ minWidth: '600px', maxWidth: '600px', width: '100%' }}>
        <div className="flex justify-between items-start">
          <h2 className="text-3xl font-bold mb-5">Agent Details</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
        </div>
        <div className="flex flex-col lg:flex-row items-center mb-6">
          <img
            src={profileImage || 'default-profile.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mr-5"
          />
          <div className="flex-1">
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="flex text-sm font-medium w-24">Name</label>
                <span className="flex text-sm font-medium text-gray-400">{name}</span>
              </div>
              <div className="flex items-center">
                <label className="flex text-sm font-medium w-24">Email</label>
                <span className="flex text-sm font-medium text-gray-400">{email}</span>
              </div>
              <div className="flex items-center">
                <label className="flex text-sm font-medium w-24">Username</label>
                <span className="flex text-sm font-medium text-gray-400">{username}</span>
              </div>
              <div className="flex flex-col items-start w-full">
                <label className="flex text-sm font-medium w-24">Workspace</label>
                {isEditing && (
                  <select
                    onChange={handleSelectWorkspace}
                    className="border-gray-300 rounded-md shadow-sm py-2 px-4 mt-1 w-full"
                    defaultValue=""
                  >
                    <option value="" disabled>Select workspace</option>
                    {availableWorkspaces.map((ws) => (
                      <option key={ws} value={ws}>{ws}</option>
                    ))}
                  </select>
                )}
                <div className="mt-2 w-full flex flex-row flex-wrap gap-1 overflow-auto" style={{ maxHeight: '40px' }}>
                  {selectedWorkspaces.length > 0 ? (
                    selectedWorkspaces.map((ws) => (
                      <span
                        key={ws}
                        className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded flex items-center"
                      >
                        {ws}
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveWorkspace(ws)}
                            className="bg-transparent border-none text-blue-800 ml-2 cursor-pointer"
                          >
                            &times;
                          </button>
                        )}
                      </span>
                    ))
                  ) : (
                    <span className="px-4 inline font-medium text-m text-gray-500">No workspaces selected</span>
                  )}
                </div>
              </div>
            </div>
            {isEditing ? (
              <div className="flex justify-center mt-8 space-x-4">
                <button onClick={handleCancelEdit} className="bg-gray-300 text-gray-700 rounded px-6 py-2">
                  Cancel
                </button>
                <button onClick={handleSave} className="bg-blue-600 text-white rounded px-6 py-2">
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-center mt-8">
                <button onClick={handleEdit} className="bg-blue-600 text-white rounded px-6 py-2">
                  Edit Workspace
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;