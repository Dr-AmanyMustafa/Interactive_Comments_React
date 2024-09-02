import "./NewComment.css"
import { useState } from 'react';
import { useCommentStore } from '../../store';

const NewComment = () => {
  const addComment = useCommentStore((state) => state.addComment);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: Date.now(),
        text: newComment,
        username: "Juliusumo",
        userPicture: 'Imgs/image-juliusomo.png',
        time: 'Just now',
        replies: []
      };
      addComment(newCommentData);
      setNewComment('');
    }
  };

  
  return (
    <div className="new-comment-container">
      <div>
      <img className="new-comment-img" src="Imgs/image-juliusomo.png" alt="julio" />
      </div>
      <div className="new-comment">
        <input
        className="new-comment-input"
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Send</button>
      </div>
    </div>
)
}
export default NewComment