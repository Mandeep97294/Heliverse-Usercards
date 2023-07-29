import React from 'react';
import UserList from './components/UserList';
import TeamDetails from './components/TeamDetails';

const App = () => {
  return (
    <div className="app">
      <UserList />
      <TeamDetails />
    </div>
  );
};

export default App;
