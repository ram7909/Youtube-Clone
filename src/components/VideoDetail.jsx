import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
const VideoDetail = () => {
  const { videoId, } = useParams();
  const [videoData, setVideoData] = useState([])
  const [commentData, setCommentData] = useState([])
  const [fetchSuggestedVideo, setFetchSuggestedVideo] = useState([])
  useEffect(() => {
    const fetchVideo = async () => {
      const url = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`;
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
        setVideoData(result.items)
      } catch (error) {
        console.error(error);
      }
    }
    const fetchComment = async () => {
      const url = `https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId=${videoId}&maxResults=30`;
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
        setCommentData(result.items)
      } catch (error) {
        console.error(error);
      }
    }
    const fetchSuggestVideo = async () => {
      const url = `https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${videoId}&part=id%2Csnippet&type=video&maxResults=50`;
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
        setFetchSuggestedVideo(result.items)
      } catch (error) {
        console.error(error);
      }
    }
    fetchSuggestVideo();
    fetchComment();
    fetchVideo();
  }, [videoId])

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };


  return (
    <>
      <div className="continer">
        <div className="box">
          <div className="card bg-dark text-light" style={{ width: "55rem", borderRadius: '20px' }}>
            <iframe width="878" height="465" src={`https://www.youtube.com/embed/${videoId}?si=m8KaU0ssPbaLeIa`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            {videoData?.map((item) => <div key={item.id}>
              <div className="card-body">
                <h5 className="card-title">{item.snippet.title}</h5>
                <div className="details">
                  <div className="subs">
                    <div className="text">
                      <h6 className="channel-name">{item.snippet.channelTitle}</h6>
                      <button className="subs-count">Subscribe</button>
                    </div>
                  </div>
                  <div className="lsd">
                    <button className="like"><i className="fa-solid fa-thumbs-up"></i>&nbsp;<span>{item.statistics.likeCount}</span></button>
                    <button className="share"><i className="fa-solid fa-share"></i>&nbsp;<span>Share</span></button>
                    <button className="dawoanload"><i className="fa-solid fa-download"></i>&nbsp;<span>Download</span></button>
                  </div>
                </div>
                <div className="card-text">
                  <div className="des-head">{item.statistics.viewCount}&nbsp;views</div>
                  <p>{truncateText(item.snippet.description, 150)}</p>
                </div>
                <hr />
                <h5 className='none'>{item.statistics.commentCount}&nbsp;Comments</h5>
                {commentData?.map((cmt) => <div key={Math.random()} className='commentDetails my-4' style={{ gap: '10px' }}>
                  <div className="profile-img">
                    <img style={{ borderRadius: '100%' }} src={cmt.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="profile-img" />
                  </div>
                  <div className="comment-text">
                    <div className="name">{cmt.snippet.topLevelComment.snippet.authorDisplayName}</div>
                    <div className="comment">{cmt.snippet.topLevelComment.snippet.textDisplay}</div>
                  </div>
                </div>)}
              </div>
            </div>)}
          </div>
          <div className="recommend" >
            {fetchSuggestedVideo?.map((sgt) => <Link to={`/video/watch/${sgt.id.videoId}`} className='sub-rcmd my-3' key={Math.random()}>
              <div className="img">
                <img src={sgt.snippet.thumbnails.default.url} alt="thumbnails" />
              </div>
              <div className="rec-video-text">
                <p>{sgt.snippet.title}</p>
                <p>{sgt.snippet.channelTitle}</p>
              </div>
            </Link>)}

          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
