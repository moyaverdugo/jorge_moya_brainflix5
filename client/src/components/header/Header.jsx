import { Link } from 'react-router-dom';
import logo from '../../assets/logo/BrainFlix-logo.svg';
import photo from '../../assets/images/Mohan-muruge.jpg';
import uploadIcon from '../../assets/icons/upload.svg';
import searchIcon from '../../assets/icons/search.svg';
import './header.scss';

const Header = ({ onResetVideo }) => {

    const handleLogoClick = () => {
      onResetVideo(); // Reset the video to the first one
    };
  

    return (
      <header className="header">
        <nav id="nav" className="nav">
            <div className="nav__left">
                <Link to="/" onClick={handleLogoClick}>
                    <img className="logo" src={logo} alt="BrainFlix logo" /> 
                </Link>
            </div>
            <div className="nav__right">
                <div className="nav__form_avatar">
                    <div className="nav__form">
                        <div className="form__container">
                            <img src={searchIcon} alt="Search Icon" className="form__icon" /> 
                            <input className="search__form form" type="text" name="search" id="search" placeholder="Search"/>
                        </div>
                    </div>
                    <img className="nav__avatar avatar" src={photo} alt="converation photo" />
                </div>
                <Link className="nav__link" to="/upload">
                    <button className="button__container" type="button">
                        <img src={uploadIcon} alt="Upload Icon" className="button__icon" />
                        <h5 className="button__text">UPLOAD</h5>
                    </button>
                </Link>
            </div>
        </nav>
      </header>
    );
  };
  
  export default Header;