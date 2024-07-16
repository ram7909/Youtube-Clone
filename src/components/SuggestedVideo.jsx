import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SuggestedVideo = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('ViTJKjGNgOY');
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [channelData, setChannelData] = useState([]);

    useEffect(() => {
        const fetchData = async (categoryId) => {
            setLoading(true);
            const url = `https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${categoryId}&part=id%2Csnippet&type=video&maxResults=100`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '05c0062a34mshfe55fa33ba28f93p1418fdjsn6dd24f451f2e',
                    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setData(result.items);
                const ids = result.items.map(item => item.snippet.channelId);
                setChannelData([]);
                fetchChannelData(ids);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchChannelData = async (ids) => {
            const url = `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${ids.join(',')}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '05c0062a34mshfe55fa33ba28f93p1418fdjsn6dd24f451f2e',
                    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setChannelData(result.items);
                console.log(result.items);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(category);
    }, [category]);

    const onClick = (categoryId) => {
        setCategory(categoryId);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <div className="dropdown my-4">
                <button
                    className="btn btns dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    onClick={toggleDropdown}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen ? 'true' : 'false'}
                >
                    Filter <i className="fa-solid fa-filter"></i>
                </button>
                <div className={`dropdown-menu bg-dark text-light ${dropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                    <button type="button" className="text-light dropdown-item" onClick={() => onClick('jjtklU68BsQ')}>
                        All
                    </button>
                    <button type="button" className="text-light dropdown-item" onClick={() => onClick('HscrSwilshM')}>
                        Music
                    </button>
                    <button type="button" className="text-light dropdown-item" onClick={() => onClick('3cRV6QnGBzA')}>
                        News
                    </button>
                    <button type="button" className="text-light dropdown-item" onClick={() => onClick('e7dJYf8YtfQ')}>
                        Web Development
                    </button>
                    <button type="button" className="text-light dropdown-item" onClick={() => onClick('2MHjKahYqP0')}>
                        Live
                    </button>
                    <button type="button" className="text-light dropdown-item" onClick={() => onClick('ly7QhOGGp4g')}>
                        Gaming
                    </button>
                    <button type="button" className="text-light dropdown-item" onClick={() => onClick('6Upm57HhBpc')}>
                        Anime
                    </button>
                    <button type="button" className="text-light dropdown-item" onClick={() => onClick('QDXAMYOvf5g')}>
                        TMKOC
                    </button>
                </div>
            </div>

            <div className="continer mt-4">
                <div className="row">
                    {loading ? (
                        <div className="load">
                            <p className="loader"></p>
                        </div>
                    ) : (
                        data.map((item) => {
                            const channel = channelData.find(channel => channel.id === item.snippet.channelId);
                            return (
                                <div className="col-md-4 mb-3" key={item.id.videoId}>
                                    <Link to={`/video/watch=/${item.id}/${item.id.videoId}`} className="card bg-dark text-light">
                                        {item.snippet && item.snippet.thumbnails && item.snippet.thumbnails.medium && (
                                            <img
                                                src={item.snippet.thumbnails.medium.url}
                                                className="card-img-top"
                                                alt="Thumbnail"
                                            />
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title">{item.snippet && item.snippet.title}</h5>
                                        </div>
                                        <div className="channel-details">
                                            {channel && (
                                                <div className="channel-logo">
                                                    <img
                                                        src={channel.snippet.thumbnails.medium.url}
                                                        alt="Channel Logo"
                                                    />
                                                </div>
                                            )}
                                            <div className="channel-name">{item.snippet.channelTitle}</div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default SuggestedVideo;
