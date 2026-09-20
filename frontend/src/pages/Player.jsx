import { useParams } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'

function Player() {
  const { id } = useParams()

  return (
    <section className="player-page">
      <VideoPlayer
        src="/sample.mp4"
        title={`Movie ${id}`}
      />
    </section>
  )
}

export default Player