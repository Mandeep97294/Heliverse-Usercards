import React from 'react';

const UserCard = ({ user, addToTeam }) => {
  const handleAddToTeam = () => {
    addToTeam(user);
  };

  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <img src={user.avatar} alt={user.first_name} />
      <p> User ID: {user.id}</p>
      <p>Name: {user.first_name}</p>
      <p>Gender: {user.gender}</p>
      <p>Domain: {user.domain}</p>
      <p>Availability: {user.available ? 'Available' : 'Not Available'}</p>
      <button className="add-to-team-button" onClick={handleAddToTeam}>Add to Team</button>
    </div>
  );
};

export default UserCard;
