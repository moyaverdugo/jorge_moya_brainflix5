import viewsIcon from '../../assets/icons/views.svg';
import likesIcon from '../../assets/icons/likes.svg';
import './information.scss';

const Information = ({ title, channel, date, description, views, likes }) => {

    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <div className="information">
        <div className="information__title">
            <h1>{title}</h1>
        </div>    
            <div className="information__details">
                <div className="information__details_left">
                    <div className="information__channel">
                        <h2>By {channel}</h2>
                    </div>
                    <p className="silver__font">{formattedDate}</p>
                </div>
                <div className="information__details_right">
                    <div className="information__views">
                    <img src={viewsIcon} className="information__views_icon" alt="Views Icon" /> 
                    <p className="silver__font">{views}</p>
                    </div>
                    <div className="information__likes">
                    <img src={likesIcon} className="information__likes_icon"alt="Likes Icon" /> 
                    <p className="silver__font">{likes}</p>
                    </div>
                </div>
            </div>
            <div className="information__description">
                <p> {description}</p>
            </div>
        </div>
    );
};

export default Information;