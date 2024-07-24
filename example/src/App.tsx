import React from 'react'
import NetPlayer from '../../src'

const App: React.FC = () => {
  return (
    <NetPlayer
      sources={[
          {
            file: `https://hk1.shegu.net/vip/p1/movie_mp4_h264/2024/6/7/64437/movie.64437.2024.1080p.H264.20240723000902.mp4?KEY1=mxEFsNa54VYJgMgDr1upRg&KEY2=1721869102&KEY7=febbox_video_quality_list_v3&KEY8=457955`,
          }
      ]}
      subtitles={[
        {
          lang: 'en',
          language: 'English',
          file: 'https://s3.bunnycdn.ru/sub/cache3/subtitle/13027456.vtt',
        }
      
      ]}
      metadata = {{
        tmdbId: 108978,
        type: 'tv',
        downloads: [{
          file_name: 'Reacher S01E01.mp4',
          download_url: 'https://gamn.vid109d224.site/download.mp4'
        }]
      }}

      className="object-contain w-full h-full"
      autoPlay
    />
  )
}

export default App
