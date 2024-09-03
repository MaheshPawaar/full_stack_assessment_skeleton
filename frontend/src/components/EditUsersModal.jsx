import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Modal, Form } from 'react-bootstrap';

const EditUsersModal = ({ home, allUsers, currentUsers, onClose, onSave }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setSelectedUsers(currentUsers);
  }, [currentUsers]);

  const handleCheckboxChange = (username) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(username)
        ? prevSelectedUsers.filter((un) => un !== username)
        : [...prevSelectedUsers, username]
    );
  };

  const handleSave = () => {
    if (selectedUsers.length === 0) {
      setError('At least one user must be selected.');
      return;
    }
    onSave(selectedUsers, home);
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modify Users for: {home.street_address}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {allUsers.map((user) => (
          <Form.Check
            key={user.username}
            type="checkbox"
            label={user.username}
            checked={selectedUsers.includes(user.username)}
            onChange={() => handleCheckboxChange(user.username)}
          />
        ))}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditUsersModal.propTypes = {
  home: PropTypes.shape({
    street_address: PropTypes.string.isRequired,
  }).isRequired,
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditUsersModal;
