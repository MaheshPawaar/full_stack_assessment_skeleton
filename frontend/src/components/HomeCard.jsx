import PropTypes from 'prop-types';
import '../styles/HomeCard.css';

const HomeCard = ({ home, onEditUsersClick }) => {
  return (
    <div className="home-card">
      <h2>{home.street_address}</h2>
      <p>List Price: ${home.list_price}</p>
      <p>State: {home.state}</p>
      <p>Zip: {home.zip}</p>
      <p>Sqft: {home.sqft}</p>
      <p>Beds: {home.beds}</p>
      <p>Baths: {home.baths}</p>
      <button onClick={() => onEditUsersClick(home)}>Edit Users</button>
    </div>
  );
};

HomeCard.propTypes = {
  home: PropTypes.shape({
    street_address: PropTypes.string.isRequired,
    list_price: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    sqft: PropTypes.number.isRequired,
    beds: PropTypes.number.isRequired,
    baths: PropTypes.number.isRequired,
  }).isRequired,
  onEditUsersClick: PropTypes.func.isRequired,
};

export default HomeCard;
