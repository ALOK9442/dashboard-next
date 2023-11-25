import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store/store';
import { setPosts, savePost, unsavePost, likePost, unlikePost } from '../app/features/postslice';

const Posts: React.FC = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const posts = useSelector((state: RootState) => state.posts.data);
    const savedPosts = useSelector((state: RootState) => state.posts.saved);
    const likedPosts = useSelector((state: RootState) => state.posts.liked); // Updated to use likedPosts

    const itemsPerPage = 20;

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handleSavePost = (id: number) => {
        dispatch(savePost(id));
    };

    const handleUnsavePost = (id: number) => {
        dispatch(unsavePost(id));
    };

    const handleLikePost = (id: number) => {
        dispatch(likePost(id));
    }

    const handleUnlikePost = (id: number) => {
        dispatch(unlikePost(id));
    }

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPrevPage = () => {
        setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const [postsResponse] = await Promise.all([
                    axios.get('https://jsonplaceholder.typicode.com/posts'),
                ]);

                dispatch(setPosts(postsResponse.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPosts();
    }, [dispatch]);

    return (
        <div>
            {currentPosts.map((post) => (
                <div key={post.id} className="mb-4">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <p className=" text-white font-bold flex space-x-2">
                        {savedPosts.includes(post.id) ? (
                            <button
                                onClick={() => handleUnsavePost(post.id)}
                                className="bg-gray-500 text-white py-2 px-4 border border-black"
                            >
                                Unsave
                            </button>
                        ) : (
                                <button
                                    onClick={() => handleSavePost(post.id)}
                                    className="bg-green-500 text-white py-2 px-4 border border-black"
                                >
                                    Save
                                </button>
                            )}
                        {likedPosts.includes(post.id) ? (
                            <button
                                onClick={() => handleUnlikePost(post.id)}
                                className="bg-blue-500 ml-2 py-2 px-4 border border-black"
                            >
                                Unlike
                            </button>
                        ) : (
                                <button onClick={() => handleLikePost(post.id)} className="bg-blue-500 ml-2 py-2 px-4 border border-black">
                                    Like
                                </button>
                            )}
                    </p>
                </div>
            ))}

            <div className="flex items-center justify-center mt-4">
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`${currentPage === 1 ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'
                        } font-bold py-2 px-4 rounded-l`}
                >
                    {'<'}
                </button>
                <p className="bg-blue-500 text-white font-bold py-2 px-4">{currentPage}</p>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === Math.ceil(posts.length / itemsPerPage)}
                    className={`${currentPage === Math.ceil(posts.length / itemsPerPage)
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

export default Posts;
