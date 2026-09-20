function VideoPlayer({ src, title }) {
  return (
    <div className="video-player">
      <video
        controls
        width="100%"
        poster=""
      >
        <source src={src} type="video/mp4" />

        Your browser does not support the video player.
      </video>

      <h2>{title}</h2>
    </div>
  )
}

export default VideoPlayer