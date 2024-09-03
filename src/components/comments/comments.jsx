import "./comments.css"
import { useState } from 'react';
import { useCommentStore } from '../../store';
import NewComment from "../NewComment/NewComment";
import Delete from "../Delete/Delete";

const CommentsPage = () => {
  const comments = useCommentStore((state) => state.comments);
  const addReply = useCommentStore((state) => state.addReply);
  const editComment = useCommentStore((state) => state.editComment);
  const editReply = useCommentStore((state) => state.editReply);
  const deleteComment = useCommentStore((state) => state.deleteComment);
  const deleteReply = useCommentStore((state) => state.deleteReply);
  const upvoteComment = useCommentStore((state) => state.upvoteComment);
  const downvoteComment = useCommentStore((state) => state.downvoteComment);
 
  const [editingComment, setEditingComment] = useState({ id: null, text: '' });
  const [editingReply, setEditingReply] = useState({});
  const [replyText, setReplyText] = useState({});
  const [votes, setVotes] = useState({}); 
  const [showReplyInput, setShowReplyInput] = useState({});
  const [showReplyDiv, setShowReplyDiv] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyToDelete, setReplyToDelete] = useState(null);
  
  const handleAddReply = (commentId) => {
    if (replyText[commentId]?.trim()) {
      addReply(commentId, replyText[commentId]);
      setReplyText({ ...replyText, [commentId]: '' });
      setShowReplyInput({ ...showReplyInput, [commentId]: false });
      setShowReplyDiv({ ...showReplyDiv, [commentId]: true });

      
    }
  };

  const handleReplyToggle = (commentId, username) => {
    setShowReplyInput((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
    if (!showReplyInput[commentId]) {
      setReplyText({ ...replyText, [commentId]: `@${username} ` });
    }
  };

 
  const handleEditComment = (commentId) => {
    if (editingComment.text.trim()) {
      editComment(commentId, editingComment.text);
      setEditingComment({ id: null, text: '' });
    }
  };

  const handleEditReply = (commentId, replyId) => {
    if (editingReply[replyId]?.trim()) {
      editReply(commentId, replyId, editingReply[replyId]);
      setEditingReply({ ...editingReply, [replyId]: null });
    }
  };

  const handleReplyVote = (replyId, change) => {
    setVotes({ ...votes, [replyId]: (votes[replyId] || 0) + change });
  };

  const handleDeleteClick = (commentId) => {
    setCommentToDelete(commentId);
    setShowDeleteModal(true); // Show the confirmation modal
  };


  const confirmDelete = () => {
    if (commentToDelete !== null) {
      deleteComment(commentToDelete);
      setShowDeleteModal(false); 
    }};

  const cancelDelete = () => {
    setShowDeleteModal(false); 
    setCommentToDelete(null); 
  };

  const openDeleteModal = (commentId, replyId) => {
    setReplyToDelete({ commentId, replyId });
    setIsModalOpen(true);
    
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setReplyToDelete(null);
  };

  const confirmDeleteReply = () => {
    if (replyToDelete) {
      deleteReply(replyToDelete.commentId, replyToDelete.replyId);
      closeDeleteModal();
    }
  };

  const replyuser = "Juliusumo"

  return (
    <div className="comments-page">      

      <div className="comments-section">
        {comments.map((comment) => (
        <>
          <div key={comment.id} className="comment">
            <div className="comment-vote">
              <button onClick={() => upvoteComment(comment.id)}><img className="plus" src={"Imgs/icon-plus.svg"}></img></button>
              <span className="number">{comment.votes}</span>
              <button onClick={() => downvoteComment(comment.id, -1)}><img className="minus" src={"/../../Imgs/icon-minus.svg"}></img></button>
            </div>

            <div className="comment-content">
              <div className="comment-header">
                <div className="header">
                  <img src={comment.userPicture} alt={`${comment.username}'s avatar`} className="comment-avatar" />
                  <span className="comment-username">{comment.username}</span>
                  <span className="comment-time">{comment.time}</span>
                </div>
                <div>
                {editingComment.id === comment.id ? (
                  <div>                    
                  </div>
                ) : (
                  <div className="Btns">
                  {comment.username === "Juliusumo" && 
                    (
                      <div className="Btns">
                        <img src={"/../../Imgs/icon-edit.svg"}></img>
                        <button onClick={() => setEditingComment({ id: comment.id, text: comment.text })}>Edit</button>
                        
                        <img src={"/../../Imgs/icon-delete.svg"}></img>                  
                        <button onClick={() => handleDeleteClick(comment.id)}>Delete</button>
                      </div>
                    )}
                  
                        <div className= {comment.username === "Juliusumo" ? ("replyBtns") : "replyBtns2"}>
                          <img src={"/../../Imgs/icon-reply.svg"}></img>
                          <button onClick={() => handleReplyToggle(comment.id, comment.username)}>Reply</button>
             
                        </div>
                  </div>
                )}
                </div>
              </div>
              {editingComment.id === comment.id ? (
                <div>
                  <input
                    className="edit-input"
                    type="text"
                    value={editingComment.text}
                    onChange={(e) => setEditingComment({ ...editingComment, text: e.target.value })}
                  />
                  <button onClick={() => handleEditComment(comment.id)}>Save</button>
                  <button onClick={() => setEditingComment({ id: null, text: '' })}>Cancel</button>
                </div>
              ) : (
                <p>
                  {comment.text}                  
                </p>
              )}

            </div>
          </div>
          
     
          {showReplyDiv[comment.id] && (
          <div className="replies">
            <>                 
          
            <div className="reply-content">            
              <div className="reply-header">
                  {comment.replies && comment.replies.length > 0 && comment.replies.map((reply) => (
                    <div key={reply.id} className="reply-container">
                        <div className="comment-vote">
                          <button onClick={() => handleReplyVote(reply.id, 1)}><img className="plus2" src={"/../../Imgs/icon-plus.svg"}></img></button>
                          <span className="number2">{votes[reply.id] || 0}</span>
                          <button onClick={() => handleReplyVote(reply.id, -1)}><img className="minus2" src={"/../../Imgs/icon-minus.svg"}></img></button>
                        </div>                      
                        <div className="vote-header">
                          <div className="reply-container-header"> 
                              <div className="header">
                                <img src={"/../../Imgs/image-juliusomo.png"} alt={`${reply.username}'s avatar`} className="comment-avatar" />
                                <span className="comment-username">{"Juliusumo"}</span>
                                <span className="comment-time">{"Just Now"}</span>
                              </div>                     
                              {editingReply[reply.id] ? (
                              <div>                        
                              </div>
                            ) : (
                              <>
                                {reply.username === replyuser ? 
                                (null) :                               
                                  (<div className="reply-section-Btns"> 
                                                          
                                    <img src={"/../../Imgs/icon-edit.svg"}></img>
                                    <button
                                      onClick={() => setEditingReply({ ...editingReply, [reply.id]: reply.text })}>
                                      Edit
                                    </button>

                                    <img src={"/../../Imgs/icon-delete.svg"}></img>
                                    <button 
                                      onClick={() => openDeleteModal(comment.id, reply.id)}>
                                      Delete
                                    </button>                    
                                  </div>
                                )}
                              </>
                              )}
                          </div>
                      
                            {editingReply[reply.id] ? (
                            <div>
                              <input
                                className="edit-input"
                                type="text"
                                value={editingReply[reply.id]}
                                onChange={(e) => setEditingReply({ ...editingReply, [reply.id]: e.target.value })}
                              />
                              <button onClick={() => handleEditReply(comment.id, reply.id)}>Save</button>
                              <button onClick={() => setEditingReply({ ...editingReply, [reply.id]: null })}>Cancel</button>
                            </div>
                          ) : (
                          <>                      
                            <p className="reply-text">
                              {reply.text}
                            </p>
                          </>
                          )} 
                        </div>                     
                    </div>
                  ))}
              </div>            
            </div>                        
            </>
          </div>
          )}

          {showReplyInput[comment.id] && (
          <div className="add-reply">
            <input
              type="text"
              placeholder="Add a reply..."
              value={replyText[comment.id] || ''}
              onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
            />
            <button onClick={() => handleAddReply(comment.id, comment.username)}>Reply</button>
          </div>
          )}
        </>
        ))}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this comment?</p>
            <button onClick={confirmDelete}>OK</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <Delete 
          onConfirm={confirmDeleteReply} 
          onCancel={closeDeleteModal} 
        />
      )}
      </div>

      <NewComment />
    </div>
  );
};

export default CommentsPage;
