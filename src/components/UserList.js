import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from './UserCard';
import { fetchUsers, addUserToTeam } from '../actions/userActions';
import Pagination from 'react-js-pagination';

const UserList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState(false);

  const usersPerPage = 20;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddToTeam = (user) => {
    dispatch(addUserToTeam(user));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
    setCurrentPage(1);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setCurrentPage(1);
  };

  const handleAvailabilityChange = (event) => {
    setAvailabilityFilter(event.target.checked);
    setCurrentPage(1);
  };

  // Filter users based on search query, domain, gender, and availability
  const filteredUsers = users.filter((user) => {
    if (!user) {
      return false;
    }

    const matchesSearchQuery = user.first_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain ? user.domain === selectedDomain : true;
    const matchesGender = selectedGender ? user.gender === selectedGender : true;
    const matchesAvailability = availabilityFilter ? user.available : true;
    return matchesSearchQuery && matchesDomain && matchesGender && matchesAvailability;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalUsers = filteredUsers.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-list">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Filter options */}
      <div className="filters">
        <select value={selectedDomain} onChange={handleDomainChange}>
          <option value="">All Domains</option>
          {/* Assuming each user has a 'domain' property */}
          {Array.from(new Set(users.map((user) => user.domain))).map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>

        <select value={selectedGender} onChange={handleGenderChange}>
          <option value="">All Genders</option>
          {Array.from(new Set(users.map((user) => user.gender))).map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>

        <label>
          Available Only
          <input
            type="checkbox"
            checked={availabilityFilter}
            onChange={handleAvailabilityChange}
          />
        </label>
      </div>

      <div className="user-cards">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} addToTeam={handleAddToTeam} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={usersPerPage}
          totalItemsCount={totalUsers}
          pageRangeDisplayed={5}
          onChange={paginate}
          prevPageText="Previous"
          nextPageText="Next"
          firstPageText="First"
          lastPageText="Last"
          innerClass="pagination-ul"
          itemClass="pagination-li"
          linkClass="pagination-link"
          activeLinkClass="active-pagination-link"
        />
      </div>
    </div>
  );
};

export default UserList;
