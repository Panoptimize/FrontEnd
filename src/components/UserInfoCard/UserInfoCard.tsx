import React, { useState } from 'react';
import { IUserInfoCard } from './types';

const UserInfoCard: React.FC<IUserInfoCard> = ({
  title = 'Create New Agent',
  name = 'Name',
  email = 'Email',
  username = 'Username',
  selectedWorkspaces: initialSelectedWorkspaces = [],
  availableWorkspaces: initialAvailableWorkspaces = ['Sales', 'Payments'],
  profileImage,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
  });

  const [selectedWorkspaces, setSelectedWorkspaces] = useState<string[]>(initialSelectedWorkspaces || []);
  const [availableWorkspaces, setAvailableWorkspaces] = useState<string[]>(initialAvailableWorkspaces || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
    console.log('Guardando datos:', formData, selectedWorkspaces);
    setIsVisible(false);  // Cerrar el modal después de guardar
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
  };

  if (!isVisible) return <button onClick={handleOpen} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Open UserInfo</button>;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mx-auto" style={{ maxWidth: '700px', width: '100%' }}>
      <div className="flex justify-between items-start">
        <h2 className="text-3xl font-bold mb-5">{title}</h2>
      </div>
      <div className="flex flex-col lg:flex-row items-center mb-6">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mr-5"
        />
        <div className="flex-1">
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="block text-sm font-medium w-24">Name</label>
              <input
                type="text"
                name="name"
                placeholder={name}
                value={formData.name}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm py-2 px-4"
              />
            </div>
            <div className="flex items-center">
              <label className="block text-sm font-medium w-24">Email</label>
              <input
                type="email"
                name="email"
                placeholder={email}
                value={formData.email}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm py-2 px-4"
              />
            </div>
            <div className="flex items-center">
              <label className="block text-sm font-medium w-24">Username</label>
              <input
                type="text"
                name="username"
                placeholder={username}
                value={formData.username}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm py-2 px-4"
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label className="block text-sm font-medium w-full">Workspace</label>
              <select
                onChange={handleSelectWorkspace}
                className="border-gray-300 rounded-md shadow-sm py-2 px-4 mt-1"
                defaultValue=""
              >
                <option value="" disabled>Select workspace</option>
                {availableWorkspaces.map((ws) => (
                  <option key={ws} value={ws}>{ws}</option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedWorkspaces.map((ws) => (
                  <span
                    key={ws}
                    className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded flex items-center mt-1"
                  >
                    {ws}
                    <button
                      onClick={() => handleRemoveWorkspace(ws)}
                      className="bg-transparent border-none text-blue-800 ml-2 cursor-pointer"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            <button onClick={handleClose} className="bg-gray-300 text-gray-700 rounded px-6 py-2">
              Cancel
            </button>
            <button onClick={handleSave} className="bg-blue-600 text-white rounded px-6 py-2">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default UserInfoCard;