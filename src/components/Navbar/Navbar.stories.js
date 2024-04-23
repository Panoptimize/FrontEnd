import React from 'react';
import Navbar from "./Navbar";

// Export
export default {
    title: 'Navbar',
    component: Navbar,
  };
  
  // Variants
  export const Dashboard = () => <Navbar variant="Dashboard" />;
  export const ActionCenter = () => <Navbar variant="ActionCenter" />;
  export const Agents = () => <Navbar variant="Agents" />;
  export const History = () => <Navbar variant="History" />;


