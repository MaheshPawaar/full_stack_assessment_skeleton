import PropTypes from 'prop-types';
import '../styles/UserSelect.css';

const UserSelect = ({ users, selectedUserName, onUserChange }) => {
  return (
    <div className="user-select">
      <label htmlFor="user">Select user: </label>
      <select
        id="user"
        value={selectedUserName}
        onChange={(e) => onUserChange(e.target.value)}
      >
        <option value="">None</option>
        {users.map((user, index) => (
          <option key={index} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
    </div>
  );
};

UserSelect.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedUserName: PropTypes.string.isRequired,
  onUserChange: PropTypes.func.isRequired,
};

export default UserSelect;
