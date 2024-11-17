import './hero.scss';

const Hero = ({ video, image }) => {
    if (!video) {
        return <div>No video data available.</div>;
    }

    return (
        <div className="hero">
            <video src={video} 
            controls
            poster={image}
            />
        </div>
    );
};

export default Hero;