
import React, { useState } from 'react';
import { User, CommunityPost, Comment } from '../types';

interface CommunityProps {
  user: User;
}

const Community: React.FC<CommunityProps> = ({ user }) => {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 'p1',
      author: 'Dr. Jane Foster',
      content: 'Does anyone have experience with the new patient de-escalation training? Is it worth bringing to our general practice?',
      timestamp: '3h ago',
      likes: 12,
      comments: [
        { id: 'c1', author: 'Dr. Mark Sloan', content: 'Yes, we implemented it last month. The verbal techniques are excellent for intake staff.', timestamp: '2h ago' },
        { id: 'c2', author: 'Dr. Sarah Reid', content: 'We found the physical boundary setting section most helpful.', timestamp: '1h ago' }
      ],
      tags: ['Training', 'GP']
    },
    {
      id: 'p2',
      author: 'Dr. Alan Grant',
      content: 'Alert: Seeing an uptick in unauthorized prescription requests at the downtown clinic. Please ensure staff are following ID verification protocols strictly.',
      timestamp: '5h ago',
      likes: 24,
      comments: [],
      tags: ['Security', 'Alert']
    }
  ]);

  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});
  const [newPostContent, setNewPostContent] = useState('');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleLike = (postId: string) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (postId: string) => {
    const text = newCommentText[postId];
    if (!text?.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: user.name,
      content: text,
      timestamp: 'Just now'
    };

    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));

    setNewCommentText(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    const newPost: CommunityPost = {
      id: Math.random().toString(36).substr(2, 9),
      author: user.name,
      content: newPostContent,
      timestamp: 'Just now',
      likes: 0,
      comments: [],
      tags: ['General']
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 px-1 sm:px-0">
      {/* High-Contrast Post Box */}
      <div className="bg-white p-6 rounded-[32px] shadow-md border-2 border-slate-200 mx-2">
        <h2 className="text-lg font-black text-slate-900 mb-4 tracking-tight">Post Update</h2>
        <div className="flex items-start space-x-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shrink-0">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 space-y-4">
            <textarea 
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none block"
              placeholder="What's happening at your clinic?"
              rows={2}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <div className="flex justify-between items-center">
               <div className="flex gap-2">
                 <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-full border border-slate-200 uppercase tracking-tighter">#Safety</span>
               </div>
               <button 
                 onClick={handleCreatePost}
                 className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50"
                 disabled={!newPostContent.trim()}
                >
                  Broadcast
                </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-2">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden animate-fadeIn">
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center space-x-3">
                  <div className="h-11 w-11 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-indigo-600 text-xs shadow-sm uppercase">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 tracking-tight">{post.author}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{post.timestamp}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-lg uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-slate-800 text-sm leading-relaxed font-semibold mb-6 px-1">
                {post.content}
              </p>
              
              <div className="flex items-center gap-6 border-t border-slate-50 pt-4 px-1">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 transition-all active:scale-110 ${likedPosts[post.id] ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'}`}
                >
                  <svg className={`w-5 h-5 ${likedPosts[post.id] ? 'fill-current' : ''}`} stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.757c1.27 0 2.146 1.139 1.63 2.306l-1.57 3.535A4 4 0 0115.155 18.5H13V21h-2v-2.5H8.845a4 4 0 01-3.662-2.659l-1.57-3.535C3.097 11.139 3.973 10 5.243 10H10V5.5a2.5 2.5 0 115 0V10z" /></svg>
                  <span className="text-[10px] font-black">{likedPosts[post.id] ? post.likes + 1 : post.likes}</span>
                </button>
                <button 
                  onClick={() => toggleComments(post.id)}
                  className={`flex items-center space-x-2 transition-all ${expandedComments[post.id] ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  <span className="text-[10px] font-black">{post.comments.length}</span>
                </button>
              </div>
            </div>

            {/* Comment Section */}
            <div className={`bg-slate-50/50 border-t border-slate-100 transition-all ${expandedComments[post.id] ? 'block' : 'hidden'}`}>
              <div className="p-6 space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="h-8 w-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-slate-400 text-[9px] uppercase shrink-0 shadow-sm">
                      {comment.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                      <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight mb-1">{comment.author}</p>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                ))}

                {/* Visible Comment Input */}
                <div className="flex items-center space-x-3 pt-2">
                  <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-[9px] shrink-0">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={newCommentText[post.id] || ''}
                      onChange={(e) => setNewCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      placeholder="Type clinical insight..." 
                      className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 outline-none pr-10 transition-all"
                    />
                    <button 
                      onClick={() => handleAddComment(post.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
