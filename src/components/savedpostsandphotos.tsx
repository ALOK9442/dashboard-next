import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store/store';
import { unsavePhoto } from '../app/features/photoslice';
import { unsavePost } from '../app/features/postslice';

const Saved: React.FC = () => {
  const dispatch = useDispatch();
  const savedPhotos = useSelector((state: RootState) => state.photos.savedPhotos);
  const savedPosts = useSelector((state: RootState) => state.posts.savedPosts);

  const handleUnsavePhoto = (id: number) => {
    dispatch(unsavePhoto(id));
  };

  const handleUnsavePost = (id: number) => {
    dispatch(unsavePost(id));
  };

  return (
    <div>
      <h2>Saved Photos and Posts</h2>
      {savedPhotos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <p>{photo.title}</p>
          <button onClick={() => handleUnsavePhoto(photo.id)}
          className="bg-gray-500 py-2 px-4 rounded-full"
          >Unsave</button>
        </div>
      ))}
      {savedPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => handleUnsavePost(post.id)}
          className="bg-gray-500 py-2 px-4 rounded-full"
          >Unsave</button>
        </div>
      ))}
    </div>
  );
};

export default Saved;
