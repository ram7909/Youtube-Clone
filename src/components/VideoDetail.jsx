import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const VideoDetail = () => {
 const { videoId} = useParams()

  useEffect(() => {
    const fetchVideo = async (id) => {
      const url = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`;
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
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVideo(videoId)
  }, [])

  return (
    <div>VideoDetail</div>
  )
}

export default VideoDetail