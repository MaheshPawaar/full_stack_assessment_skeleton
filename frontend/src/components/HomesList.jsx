import HomeCard from './HomeCard';
import PropTypes from 'prop-types';
import '../styles/HomesList.css'

const HomesList = ({ homes,onEditUsersClick  }) => {
  return (
    <div className="homes-list">
      {homes.length > 0 ? (
        homes.map((home,index) => <HomeCard key={index} home={home} onEditUsersClick={onEditUsersClick}/>)
      ) : (
        <div className="no-homes">nothing to show</div>
      )}
    </div>
  );
};

HomesList.propTypes = {
  homes: PropTypes.array.isRequired,
  onEditUsersClick:PropTypes.func.isRequired
};

export default HomesList;
