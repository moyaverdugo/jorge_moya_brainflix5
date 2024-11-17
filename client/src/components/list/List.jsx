import './list.scss';

const List = ({ videos, onVideoSelect }) => {
    return (
        <div className="list__container">
            <div className="list__title">
                <h3 className="silver__font">NEXT VIDEOS</h3>
            </div>
            {videos.map((movie) => (
                <div 
                  key={movie.id} 
                  className="list__image_container"
                  onClick={() => onVideoSelect(movie)} 
                >
                    <img className="list__image" src={movie.image} alt={`${movie.title} thumbnail`} />
                    <div className="list__movie_description">
                        <h3 className="list__movie_title">{movie.title}</h3>
                        <p className="list__movie_channel">{movie.channel}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default List;