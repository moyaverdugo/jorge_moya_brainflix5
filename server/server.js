import express from 'express';
import cors from 'cors';
import path from 'path'; // Needed for handling file paths
import videosRoutes from './routes/video.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static assets from a "public" folder
app.use('/images', express.static(join(__dirname, 'public/images')));

// Routes
app.use('/videos', videosRoutes); // Prefixing video routes with /videos

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});