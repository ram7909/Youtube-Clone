import React, { useEffect, useState } from 'react'

const SuggestedVideo = () => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState('jjtklU68BsQ')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const FetchData = async (categoryId) => {
            setLoading(true)
            const url = `https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${categoryId}&part=id%2Csnippet&type=video&maxResults=100`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '1481965fa9msh6e37f80b05c9703p19401fjsn0040fc82cbd7',
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
                setLoading(false)
            }
        }
        FetchData(category);
    }, [category])

    const onClick = (categoryId) => {
        setCategory(categoryId)
    }


    return (
        <>
            <div className="buttons my-4">
                <button type="button" className="btn btns" onClick={() => onClick('jjtklU68BsQ')}>All</button>
                <button type="button" className="btn btns" onClick={() => onClick('HscrSwilshM')}>Music</button>
                <button type="button" className="btn btns" onClick={() => onClick('3cRV6QnGBzA')}>News</button>
                <button type="button" className="btn btns" onClick={() => onClick('e7dJYf8YtfQ')}>Web Development</button>
                <button type="button" className="btn btns" onClick={() => onClick('2MHjKahYqP0')}>Live</button>
                <button type="button" className="btn btns" onClick={() => onClick('ly7QhOGGp4g')}>Gaming</button>
                <button type="button" className="btn btns" onClick={() => onClick('6Upm57HhBpc')}>Anime</button>
                <button type="button" className="btn btns" onClick={() => onClick('QDXAMYOvf5g')}>TMKOC</button>
            </div>
            <div className="menu btn my-2 mx-2">Filter <i className="fa-solid fa-filter"></i></div>
            <div className="continer mt-4">
                <div className="row">
                    {loading ? (
                        <div className="load">
                            <p className='loader'></p>
                        </div>
                    ) : (
                        data.map((item) => (
                            <div className="col-md-4 mb-3" key={Math.random()}>
                                <div className="card bg-dark text-light">
                                    {item.snippet && item.snippet.thumbnails && item.snippet.thumbnails.medium && (
                                        <img src={item.snippet.thumbnails.medium.url} className="card-img-top" alt="Thumbnail" />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{item.snippet && item.snippet.title}</h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default SuggestedVideo