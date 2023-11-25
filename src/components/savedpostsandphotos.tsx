import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store/store';
import { unsavePhoto,toggleLikePhoto } from '../app/features/photoslice';
import { unsavePost, toggleLikePost } from '../app/features/postslice';

const Saved: React.FC = () => {
  const dispatch = useDispatch();
  const savedPhotos = useSelector((state: RootState) => state.photos.savedPhotos);
  const savedPosts = useSelector((state: RootState) => state.posts.savedPosts);
  const likedPhotos = useSelector((state: RootState) => state.photos.liked);
  const likedPosts = useSelector((state: RootState) => state.posts.liked);

  const handleUnsavePhoto = (id: number) => {
    dispatch(unsavePhoto(id));
  };

  const handleUnsavePost = (id: number) => {
    dispatch(unsavePost(id));
  };

  const handleToggleLikePhoto = (id: number) => {
    dispatch(toggleLikePhoto(id));
  };

  const handleToggleLikePost = (id: number) => {
    dispatch(toggleLikePost(id));
  };

  const isLikedPhoto = (id: number) => likedPhotos[id];
  const isLikedPost = (id: number) => likedPosts[id];

  return (
    <div>
      <h2>Saved Photos and Posts</h2>
      {savedPhotos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <p>{photo.title}</p>
          <button
            onClick={() => handleUnsavePhoto(photo.id)}
            className="bg-gray-500 py-2 px-4 border border-black"
          >
            Unsave
          </button>
          <button
            onClick={() => handleToggleLikePhoto(photo.id)}
            className={`ml-2 py-2 px-4 border border-black ${isLikedPhoto(photo.id) ? 'bg-blue-500' : 'bg-blue-500'}`}
          >
            {isLikedPhoto(photo.id) ? 'Unlike' : 'Like'}
          </button>
        </div>
      ))}
      {savedPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button
            onClick={() => handleUnsavePost(post.id)}
            className="bg-gray-500 py-2 px-4 border border-black"
          >
            Unsave
          </button>
          <button
            onClick={() => handleToggleLikePost(post.id)}
            className={`ml-2 py-2 px-4 border border-black ${isLikedPost(post.id) ? 'bg-blue-500' : 'bg-blue-500'}`}
          >
            {isLikedPost(post.id) ? 'Unlike' : 'Like'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Saved;
