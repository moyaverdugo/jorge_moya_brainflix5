import './comments.scss'; 
import add_commentIcon from '../../assets/icons/add_comment.svg';
import photo from '../../assets/images/Mohan-muruge.jpg';
import { useState } from 'react';

const Comments = ({ comments, api, videoId }) => {
    const [commentsList, setCommentsList] = useState(comments);
    const [newComment, setNewComment] = useState(''); // State for new comment input

    const handleCommentSubmit = async (event) => {
        event.preventDefault(); // Ensure the page does not refresh when submitting comment
        const commentInput = newComment; // Get the value from state

        if (commentInput) {
            try {
                const newCommentResponse = await api.postComment(videoId, commentInput);
                setCommentsList([...commentsList, newCommentResponse]); // Update state with new comment
                setNewComment(''); // Clear the input field after submission
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }    
    };
    
    const handleCommentDelete = async (commentId) => {
        try {
            await api.deleteComment(commentId); // Assuming you have this method
            // Remove the deleted comment from the local state
            setCommentsList(prevComments => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="comments__container">
            <div className="comments__title">
                <h2>{commentsList.length} Comments</h2>
            </div>
            <div className="conversation__container">
                <img className="conversation__avatar avatar" src={photo} alt="conversation photo" />
                <form className="conversation__sub_container" onSubmit={handleCommentSubmit}>
                    <div className="conversation__form_container">
                        <label className="conversation__title">
                            <h4 className="silver__font">JOIN THE CONVERSATION</h4>
                        </label>
                        <input 
                            className="conversation__form form" 
                            type="text" 
                            name="comment" 
                            id="comment" 
                            placeholder="Add a new comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)} // Control the input field
                        />
                    </div>
                    <button className="button__container conversation__button" type="submit">
                        <img src={add_commentIcon} alt="add comment Icon" className="button__icon" />
                        <h5 className="button__text">COMMENT</h5>
                    </button>
                </form>
            </div>

            {commentsList.map(comment => (
                <div key={comment.id} className="comment__container">
                    <img className="conversation__avatar avatar" 
                    src={comment.imageUrl ?? "https://via.placeholder.com/150/e1e1e1/e1e1e1.jpg"}
                    alt="conversation photo"/>
                    <div className="comment">
                        <h3 className="comment-name">{comment.name}</h3>
                        <p className="comment-text">{comment.comment}</p>
                        <button onClick={() => handleCommentDelete(comment.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;