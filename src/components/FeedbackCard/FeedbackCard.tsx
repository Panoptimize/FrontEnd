import React, { useState } from 'react';
import { IFeedbackCard } from './types';

const FeedbackCard: React.FC<IFeedbackCard> = ({
  title = 'Feedback for User',
  profileImage,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    suggestion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saving data:', formData);
    setIsVisible(false); 
  };

  const handleDelete = () => {
    setFormData({ title: '', suggestion: '' });
    console.log('Information cleared');
  };

  const handleSend = () => {
    console.log('Send', formData);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
  };

  if (!isVisible) return <button onClick={handleOpen} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Open Feedback</button>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-auto" style={{ maxWidth: "700px", width: "100%" }}>
      <div className="flex justify-between items-start">
        <h2 className="text-3xl font-bold mb-5">{title}</h2>
        <button onClick={handleClose} className="text-right text-gray-600 hover:text-gray-800">×</button>
      </div>
      <div className="flex flex-col lg:flex-row items-center mb-4">
        <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover mr-4"/>
        <div className="flex-1">
          <div className="space-y-3">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md py-2 px-3 text-gray-700"
            />
            <textarea
              name="suggestion"
              placeholder="I suggest..."
              value={formData.suggestion}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md py-2 px-3 text-gray-700"
              rows={3}
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow">Delete</button>
            <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow">Save</button>
            <button onClick={handleSend} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
