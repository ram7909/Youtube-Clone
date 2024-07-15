import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useChannelId } from '../context/channelID/ChannelId';

const Navbar = () => {
  const { channelId, setChannelId } = useChannelId();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${channelId}`)
  }

  return (
    <div className="nav_bar bg-dark text-light">
      <div className="continer">
        <Link to={'/'} className="left">
          <i className="fa-solid fa-video"></i>
          <div className="brandName">Video<span>Buddy</span></div>
        </Link>
        <div className="right">
          <form onSubmit={submitHandler}><input
            type="search"
            placeholder='Search'
            onChange={(e) => setChannelId(e.target.value)}
            value={channelId}
          /></form>

          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
