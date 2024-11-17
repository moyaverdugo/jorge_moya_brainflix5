import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../header/Header";
import Hero from "../hero/Hero";
import Information from "../information/Information";
import Comments from "../comments/Comments";
import List from "../list/List";
import './video.scss';

function Video({ videoList, api, defaultVideo }) { 
  const { videoId } = useParams(); // Capturing the videoId from the url
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState(defaultVideo || null);// Either use it for the homepage (defaultVideo) or for the corresponding video page (null, so it is open to any video)

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (api && videoId) {
        const videoDetails = await api.getVideoDetails(videoId);
        setCurrentVideo(videoDetails);
      }
    };

    if (videoId) {
      fetchVideoDetails();
    }
  }, [api, videoId]);

  // When selecting a new video, navigate to the appropriate URL ---------------------------------
  const handleVideoSelection = (selectedVideo) => {
    navigate(`/video/${selectedVideo.id}`);
  };
  

  // Function to reset to the first video ---------------------------------
  const handleResetVideo = async () => {
    if (videoList.length > 0) {
      const firstVideo = await api.getVideoDetails(videoList[0].id);
      setCurrentVideo(firstVideo);
      navigate("/"); // Navigate to the home page
    }
  };

  // Filter out the current video from the list ---------------------------------
  // This variable will be inserted in the List component
  const filteredVideoList = videoList.filter(video => video.id !== currentVideo?.id);

  return (
    <>
      <Header onResetVideo={handleResetVideo} />
      {currentVideo && (//validates that we actually have a video before rendering everything
            <>
              <Hero video={currentVideo.video} image={currentVideo.image} />
              <div className="bottom__container">
                <div className="left__container">
                  <Information 
                    title={currentVideo.title} 
                    channel={currentVideo.channel} 
                    date={currentVideo.timestamp} 
                    description={currentVideo.description} 
                    views={currentVideo.views} 
                    likes={currentVideo.likes} 
                  />
                  <Comments comments={currentVideo.comments} api={api} videoId={videoId}/>
                </div>
                <div className="right__container">
                  <List videos={filteredVideoList} onVideoSelect={handleVideoSelection} />
                </div>
              </div>
            </>
      )}
    </>
  );
}

export default Video;