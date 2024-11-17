import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadPage from "./components/uploadPage/UploadPage";
import Video from "./components/video/Video";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import ClassApi from './utils/api';
import './styles/global.scss';

function App() {
  const [defaultVideo, setDefaultVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Instantiate ClassApi
  const api = new ClassApi();

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const videos = await api.getVideos();
        setVideoList(videos);

        if (videos.length > 0) {
          const initialVideo = await api.getVideoDetails(videos[0].id);
          setDefaultVideo(initialVideo);
        }
      } catch (error) {
        console.error("Failed to load videos:", error);
      }

      setLoading(false);
    };

    fetchApiData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Video
            defaultVideo={defaultVideo}
            videoList={videoList}
          />}
        />
        <Route
          path="/upload"
          element={<UploadPage />}
        />
        <Route
          path="/video/:videoId"
          element={<Video
                     videoList={videoList}
                     api={api} />}  // Pass api instance for video details
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;