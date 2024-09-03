import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetUsersQuery,
  useGetHomesByUserQuery,
  useUpdateHomeUsersMutation,
  useGetHomeUsersQuery,
} from './app/api';
import {
  selectHome,
  getSelectedHome,
  getCurrentHomeUsers,
} from './features/selectedHome/selectedHomeSlice';
import { setHomes, selectAllHomes } from './features/homes/homesSlice';
import EditUsersModal from './components/EditUsersModal';
import Header from './components/Header';
import HomesList from './components/HomesList';
import UserSelect from './components/UserSelect';
import './styles/App.css';

const App = () => {
  const dispatch = useDispatch();
  const { data: users = [] } = useGetUsersQuery();
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedHome, setSelectedHome] = useState(null);
  const homes = useSelector(selectAllHomes);

  const { data: homesData = [], isSuccess } = useGetHomesByUserQuery(selectedUserName, {
    skip: !selectedUserName,
  });

  const { data: currentHomeUsers = [], isSuccess: isHomeUsersSuccess } = useGetHomeUsersQuery(
    selectedHome ? selectedHome.street_address : '',
    {
      skip: !selectedHome,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setHomes(homesData));
    }
  }, [homesData, isSuccess, dispatch]);

  useEffect(() => {
    if (isHomeUsersSuccess && selectedHome) {
      const usernames = currentHomeUsers.map((user) => user.username);
      dispatch(selectHome({ home: selectedHome, currentHomeUsers: usernames }));
    }
  }, [currentHomeUsers, isHomeUsersSuccess, selectedHome, dispatch]);

  const handleEditUsersClick = (home) => {
    setSelectedHome(home);
  };

  const [updateHomeUsers] = useUpdateHomeUsersMutation();

  const handleUsersUpdate = async (updatedUsers, home) => {
    try {
      // Update the users for the home
      await updateHomeUsers({ home, updatedUsers }).unwrap();

      // Manually update the Redux state to reflect the new users
      const combinedUsers = [...currentHomeUsers, ...updatedUsers.filter(user => !currentHomeUsers.includes(user))];
      dispatch(selectHome({ home, currentHomeUsers: combinedUsers }));
    } catch (error) {
      console.error('Error updating users:', error);
    }
  };

  const selectedHomeState = useSelector(getSelectedHome);
  const currentHomeUsersState = useSelector(getCurrentHomeUsers);

  return (
    <div className="app-container">
      <Header
        userSelectComponent={
          <UserSelect
            users={users}
            selectedUserName={selectedUserName}
            onUserChange={setSelectedUserName}
          />
        }
      />
      <HomesList homes={homes} onEditUsersClick={handleEditUsersClick} />
      {selectedHomeState && (
        <EditUsersModal
          home={selectedHomeState}
          allUsers={users}
          currentUsers={currentHomeUsersState}
          onClose={() => setSelectedHome(null)}
          onSave={handleUsersUpdate}
        />
      )}
    </div>
  );
};

export default App;
