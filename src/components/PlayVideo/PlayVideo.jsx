import "./PlayVideo.css";

import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { useEffect, useState } from "react";
import { API_KEY, valueConverter } from "../../data";
import moment from "moment";

function PlayVideo({ videoId }) {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null)
  const[commentData, setCommentData] = useState([])

  const fetchVideoData = async () => {
    const videoDetails_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };
  const fetchOtherData = async()=> {
    fetchChannels_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
    await fetch(fetchChannels_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))

    const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads&part=snippet%@2Creplies&videoId=${videoId}&key=${API_KEY}`
    await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))
  }

  useEffect(()=>{
    fetchVideoData()
  },[])

  useEffect(()=>{
    fetchOtherData()
  },[apiData])

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        width="996"
        height="560"
        title="A Look Into The Future| Marvel Studios, What If... ? | Disney+"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      ></iframe>
      <h3>{apiData?apiData.snippet.title: 'Title Here'}</h3>
      <div className="playVideo-info">
        <p>{apiData?valueConverter(apiData.statistics.viewCount): '16K'} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow(): ''}</p>
        <div>
          <span>
            <img src={like} alt="" />{apiData?valueConverter(apiData.statistics.likeCount): 155}
          </span>
          <span>
            <img src={dislike} alt="" /> 
          </span>
          <span>
            <img src={share} alt="" /> Share
          </span>
          <span>
            <img src={save} alt="" /> Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?channelData.snippet.thumbnails.default.url: ''} alt="" />
        <div>
          <p>{apiData?apiData.snippet.channelTitle: ''}</p>
          <span>{channelData?channelData.statistics.subscriberCount: '1M'} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
       <p>{apiData?apiData.snippet.description.slice(0, 250): 'Description Here'}</p>
        <hr />
        <h4>{apiData?valueConverter(apiData.statistics.commentCount): 102} Comments</h4>
        {commentData.map((item, index)=> {
          return (
            <div key={index} className="comment">
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
            <div>
              <h3>
                Jack Nicholson <span>1 day ago</span>
              </h3>
              <p>
                A global computer network providing a variety of information and
                cc of interconnected networks using standarized communication.
              </p>
              <div className="comment-action">
                <img src={like} alt="" />
                <span>244</span>
                <img src={dislike} alt="" />
                <span>22</span>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default PlayVideo;
