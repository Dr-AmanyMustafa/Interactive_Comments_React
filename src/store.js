import {create} from 'zustand';

export const useCommentStore = create((set) => ({
  comments: [
    {
      id: 1,
      text: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      username: "amyrobson",        
      userPicture: "Imgs/image-amyrobson.png",
      time: "1 month ago",
      replies: [],
      votes: 12
    },
    {
      id: 2,
      text: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but I think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      username: "Max Blagun",        
      userPicture: "/Imgs/image-maxblagun.png",
      time: "1 month ago",      
      replies: [],
      votes: 5
    },
    {
      id: 3,
      text: "Great work! I haven't got much to add beyond what's already been said, but I just wanted to say congrats! You've done an excellent job on this!",
      username: "Juliusumo",        
      userPicture: "/Imgs/image-juliusomo.png",
      time: "2 weeks ago",      
      replies: [],
      votes: 2
    }
  ],

  addComment: (newCommentData) => set((state) => ({
    comments: [...state.comments, { id: Date.now(), ...newCommentData }]
  })),
  
  addReply: (commentId, replyText) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, { id: Date.now(), text: replyText }] }
        : comment
    )
  })),

  editComment: (commentId, newText) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId ? { ...comment, text: newText } : comment
    )
  })),
  
  editReply: (commentId, replyId, newText) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId
        ? {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === replyId ? { ...reply, text: newText } : reply
            )
          }
        : comment
    )
  })),

  deleteComment: (commentId) => set((state) => ({
    comments: state.comments.filter(comment => comment.id !== commentId)
  })),
  
  deleteReply: (commentId, replyId) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId
        ? {
            ...comment,
            replies: comment.replies.filter(reply => reply.id !== replyId)
          }
        : comment
    )
  })),

  upvoteComment: (commentId) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId ? { ...comment, votes: comment.votes + 1 } : comment
    )
  })),

  downvoteComment: (commentId) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId ? { ...comment, votes: comment.votes - 1 } : comment
    )
  })),

}));
