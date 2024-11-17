import axios from 'axios';

class ClassApi {
  constructor(baseUrl = import.meta.env.VITE_API_BASE_URL) { // Updated here
    this.baseUrl = baseUrl;
  }

  async getVideos() {
    try {
      const response = await axios.get(`${this.baseUrl}/videos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching video list:', error);
      return [];
    }
  }

  async getVideoDetails(videoId) {
    try {
      const response = await axios.get(`${this.baseUrl}/videos/${videoId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching video details:', error);
      return null;
    }
  }

  async postComment(videoId, commentText) {
    try {
      const response = await axios.post(`${this.baseUrl}/videos/${videoId}/comments`, {
        comment: commentText,
      });
      return response.data;
    } catch (error) {
      console.error('Error posting comment:', error);
      throw error;
    }
  }

  async postVideo(videoData) {
    try {
      const response = await axios.post(`${this.baseUrl}/videos`, videoData);
      return response.data;
    } catch (error) {
      console.error('Error posting video:', error);
      throw error;
    }
  }
}

export default ClassApi;