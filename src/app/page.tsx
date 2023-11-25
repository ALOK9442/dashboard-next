"use client";
import React, { useState } from 'react';
import Photos from '@/components/photo';
import Posts from '@/components/posts';
import Saved from '@/components/savedpostsandphotos';

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('');

  return (
    <div className="flex flex-col items-start min-h-screen bg-blue-500 p-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSelectedTab('posts')}
          className={`${
            selectedTab === 'posts' ? 'bg-white text-blue-500 border border-black' : 'bg-transparent text-white border border-black'
          } font-bold py-2 px-4 rounded-l`}
        >
          Posts
        </button>
        <button
          onClick={() => setSelectedTab('photos')}
          className={`${
            selectedTab === 'photos' ? 'bg-white text-blue-500 border border-black' : 'bg-transparent text-white border border-black'
          } font-bold py-2 px-4`}
        >
          Photos
        </button>
        <button
          onClick={() => setSelectedTab('saved')}
          className={`${
            selectedTab === 'saved' ? 'bg-white text-blue-500 border border-black' : 'bg-transparent text-white border border-black'
          } font-bold py-2 px-4 rounded-r`}
        >
          Saved
        </button>
      </div>

      {selectedTab === 'posts' && <Posts />}
      {selectedTab === 'photos' && <Photos />}
      {selectedTab === 'saved' && <Saved />}
    </div>
  );
};

export default Home;
