import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SuggestedVideo = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('vbIr4i_jM9A');
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchData = async (categoryId) => {
            setLoading(true);
            const url = `https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${categoryId}&part=id%2Csnippet&type=video&maxResults=50`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '39480862eamsh16f987dc1751178p1a4c8cjsnd7c940a368bd',
                    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setData(result.items)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
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
                    <button type="button" className="text-light dropdown-item" onClick={() => onClick('8v-TWxPWIWc')}>
                        Music
                    </button>
                    <button type="button" className="text-light dropdown-item" onClick={() => onClick('JC7ieHddNio')}>
                        News
                    </button>
                    <button type="button" className="text-light dropdown-item" onClick={() => onClick('e7dJYf8YtfQ')}>
                        Web Development
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
                        data?.map((item) => (
                            <div className="col-md-4 mb-3" key={item.id.videoId}>
                                <Link to={`/video/watch/${item.id.videoId}`} className="card bg-dark text-light">
                                    <img
                                        src={item.snippet.thumbnails.medium.url}
                                        className="card-img-top"
                                        alt="Thumbnail"
                                    />

                                    <div className="card-body">
                                        <h5 className="card-title">{item.snippet.title}</h5>
                                    </div>
                                    <div className="channel-details">
                                        <div className="channel-name">{item.snippet.channelTitle}</div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}

                </div>
            </div>
        </>
    );
};

export default SuggestedVideo;
