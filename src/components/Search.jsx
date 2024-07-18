import React, { useState, useEffect } from 'react';
import { useChannelId } from '../context/channelID/ChannelId';

const Search = () => {
    const { channelId } = useChannelId();
    const [channelDetails, setChannelDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const url = `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${channelId}`;
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
                setChannelDetails(result.items);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [channelId]);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    return (
        <>
            {loading ? (
                <div className="load">
                    <p className="loader"></p>
                </div>
            ) : (
                channelDetails?.map(item => (
                    <div key={Math.random()}>
                        <div className="continer ct">
                            <div className="banner my-2">
                                <img src={item.brandingSettings.image.bannerExternalUrl} alt="" />
                            </div>
                            <div className="name_logo my-3">
                                <div className="logo"><img src={item.snippet.thumbnails.high.url} alt="channel-logo" /></div>
                                <div className="name my-1">
                                    <h4>{item.snippet.title}</h4>
                                    <p>{item.snippet.customUrl}&nbsp;<i className="fa-solid fa-circle"></i>&nbsp;{item.statistics.subscriberCount}&nbsp;subscriber&nbsp;<i className="fa-solid fa-circle"></i>&nbsp;{item.statistics.videoCount}&nbsp;videos</p>
                                    <p>{truncateText(item.snippet.description, 30)}</p>
                                    <div className="btn">Subscribe</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default Search;
