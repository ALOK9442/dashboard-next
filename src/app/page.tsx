"use client";
import React, { useState } from 'react';
import Photos from '@/components/photo';
import Posts from '@/components/posts';

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('');

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex mb-4">
        <button
          onClick={() => setSelectedTab('photos')}
          className={`${
            selectedTab === 'photos' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          } font-bold py-2 px-4 rounded-l`}
        >
          Photos
        </button>
        <button
          onClick={() => setSelectedTab('posts')}
          className={`${
            selectedTab === 'posts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          } font-bold py-2 px-4 rounded-r`}
        >
          Posts
        </button>
      </div>

      {selectedTab === 'photos' && <Photos />}
      {selectedTab === 'posts' && <Posts />}
    </div>
  );
};

export default Home;
