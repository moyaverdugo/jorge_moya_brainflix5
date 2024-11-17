import express from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current directory path using ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const videoFilePath = path.join(__dirname, '../data/videos.json');
console.log(__dirname);

// Helper function to read the video data from the JSON file
const getVideosData = () => {
  const data = fs.readFileSync(videoFilePath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write data back to the JSON file
const saveVideosData = (data) => {
  fs.writeFileSync(videoFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Route to get all videos
router.get('/', (req, res) => {
  const videos = getVideosData();
  const summarizedVideos = videos.map(({ id, title, channel, image }) => ({
    id,
    title,
    channel,
    image,
  }));
  res.json(summarizedVideos);
});


// Route to get details of a specific video by ID
router.get('/:videoId', (req, res) => {
  const videos = getVideosData();
  const video = videos.find((v) => v.id === req.params.videoId);

  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ message: 'Video not found' });
  }
});

// Route to post a comment for a specific video
router.post('/:videoId/comments', (req, res) => {
  const videos = getVideosData();
  const video = videos.find((v) => v.id === req.params.videoId);

  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }

  const newComment = {
    id: uuidv4(),
    comment: req.body.comment,
    timestamp: Date.now(),
  };

  video.comments.push(newComment);
  saveVideosData(videos);
  res.status(201).json(newComment);
});

// Route to upload a new video
router.post('/', (req, res) => {
  const videos = getVideosData();
  
  const newVideo = {
    id: uuidv4(),
    title: req.body.title || "Untitled Video",
    description: req.body.description || "No description available.",
    channel: "Your Channel Name", // Can be set as needed
    image: "http://localhost:5000/images/Upload-video-preview.jpg", // Path to the default thumbnail image
    views: "0", // Default view count
    likes: "0", // Default like count
    comments: [], // Empty comments array
    timestamp: Date.now(),
  };

  videos.push(newVideo);
  saveVideosData(videos);
  res.status(201).json(newVideo);
});

export default router;