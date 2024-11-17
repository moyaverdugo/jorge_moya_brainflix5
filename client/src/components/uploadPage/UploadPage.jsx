import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../header/Header";
import './uploadPage.scss';
import heroImage from '../../assets/images/Upload-video-preview.jpg';
import uploadIcon from '../../assets/icons/upload.svg';
import ClassApi from '../../utils/api';

function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  
  const api = new ClassApi();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (title && description) {
      try {
        await api.postVideo({ title, description });
        alert(`Your video "${title}" was uploaded successfully!`);
        navigate('/');
      } catch (error) {
        alert('Failed to upload video. Please try again.');
      }
    } else {
      alert('Please fill out both the title and description fields.');
    }
  };

  return (
    <>
      <Header />
      <div className="upload">
        <div className="upload__title">
          <h1>Upload Video</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="upload__middle">
            <div className="upload__img_container">
              <h3 className="silver__font">VIDEO THUMBNAIL</h3>
              <img
                className="upload__img"
                src={heroImage}
                alt="Video Thumbnail"
              />
            </div>
            <div className="upload__video">
              <div className="upload__title_video">
                <label>
                  <h4 className="silver__font">TITLE YOUR VIDEO</h4>
                </label>
                <input
                  className="upload__form_title form"
                  type="text"
                  placeholder="Add a title to your video"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="upload__description_video">
                <label>
                  <h4 className="silver__font">ADD A VIDEO DESCRIPTION</h4>
                </label>
                <input
                  className="upload__form_description form"
                  type="text"
                  placeholder="Add a description to your video"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="upload__buttons">
            <button className="button__container" type="submit">
              <img
                src={uploadIcon}
                alt="Upload Icon"
                className="button__icon"
              />
              <h5 className="button__text">PUBLISH</h5>
            </button>
            <button
              className="button__cancel"
              type="button"
              onClick={() => {
                setTitle('');
                setDescription('');
              }}
            >
              <h5 className="button__cancel_text">CANCEL</h5>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UploadPage;