import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SuggestedVideo from './components/SuggestedVideo'
import Search from './components/Search'
import { ChannelIdProvider } from './context/channelID/ChannelId';
import VideoDetail from './components/VideoDetail'
const App = () => {
  return (
    <Router>
      <ChannelIdProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<SuggestedVideo />} />
          <Route path='/search/:id' element={<Search />} />
          <Route path='/video/watch=/:channelIds/:videoId' element={<VideoDetail />} />
        </Routes>
      </ChannelIdProvider>

    </Router>
  )
}

export default App