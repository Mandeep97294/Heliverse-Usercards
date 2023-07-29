import React from 'react';
import { useSelector } from 'react-redux';

const TeamDetails = () => {
  const team = useSelector((state) => state.team);

  return (
    <div className="team-details">
      <h2>Team Details</h2>
      <ul>
        {team.map((user) => (
          <li key={user.id}>{user.name} - {user.domain}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetails;
