"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { setPhotos, savePhoto, unsavePhoto } from './features/photoslice';
import { setPosts, savePost, unsavePost } from './features/postslice';
import axios from 'axios';
import Photos from '@/components/photo';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state: RootState) => state.photos.data);
  const savedPhotos = useSelector((state: RootState) => state.photos.saved);
  const posts = useSelector((state: RootState) => state.posts.data);
  const savedPosts = useSelector((state: RootState) => state.posts.saved);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastPhoto = currentPage * itemsPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - itemsPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleSavePhoto = (id: number) => {
    dispatch(savePhoto(id));
  };

  const handleUnsavePhoto = (id: number) => {
    dispatch(unsavePhoto(id));
  };

  const handleSavePost = (id: number) => {
    dispatch(savePost(id));
  };

  const handleUnsavePost = (id: number) => {
    dispatch(unsavePost(id));
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchPhotosAndPosts = async () => {
      try {
        const [photosResponse, postsResponse] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/photos'),
          axios.get('https://jsonplaceholder.typicode.com/posts'),
        ]);

        dispatch(setPhotos(photosResponse.data));
        dispatch(setPosts(postsResponse.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPhotosAndPosts();
  }, [dispatch]);

  return (
    <div>
      <Photos/>
      <div>
        {currentPosts
          .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              {savedPosts.includes(post.id) ? (
                <button onClick={() => handleUnsavePost(post.id)}>Unsave</button>
              ) : (
                <button onClick={() => handleSavePost(post.id)}>Save</button>
              )}
            </div>
          ))}
        {/* Pagination for Posts */}
        <div>
          {Array.from({ length: Math.ceil(posts.length / itemsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
