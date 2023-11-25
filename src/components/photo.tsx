import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store/store';
import { setPhotos, savePhoto, unsavePhoto } from '../app/features/photoslice';

const Photos: React.FC = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state: RootState) => state.photos.data);
  const savedPhotos = useSelector((state: RootState) => state.photos.saved);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastPhoto = currentPage * itemsPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - itemsPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const handleSavePhoto = (id: number) => {
    dispatch(savePhoto(id));
  };

  const handleUnsavePhoto = (id: number) => {
    dispatch(unsavePhoto(id));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  useEffect(() => {
    const fetchPhotosAndPosts = async () => {
      try {
        const [photosResponse] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/photos'),
        ]);

        dispatch(setPhotos(photosResponse.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPhotosAndPosts();
  }, [dispatch]);

  return (
    <div>
      {currentPhotos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <p>{photo.title}</p>
          {savedPhotos.includes(photo.id) ? (
            <button onClick={() => handleUnsavePhoto(photo.id)}>Unsave</button>
          ) : (
            <button onClick={() => handleSavePhoto(photo.id)}>Save</button>
          )}
        </div>
      ))}
      {/* Pagination for Photos */}
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'
          } font-bold py-2 px-4 rounded-l`}
        >
          {'<'}
        </button>
        <p className="bg-blue-500 text-white font-bold py-2 px-4">{currentPage}</p>
        <button
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(photos.length / itemsPerPage)}
          className={`${
            currentPage === Math.ceil(photos.length / itemsPerPage)
              ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
              : 'bg-blue-500 text-white'
          } font-bold py-2 px-4 rounded-r`}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Photos;
