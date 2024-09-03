import ProptTypes from 'prop-types';
import '../styles/Header.css';

const Header = ({ userSelectComponent }) => {
  return <header className="header">{userSelectComponent}</header>;
};

Header.propTypes = {
  userSelectComponent: ProptTypes.element.isRequired,
};

export default Header;
