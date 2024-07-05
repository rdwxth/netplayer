import React from 'react'
import NetPlayer from '../../src'

const App: React.FC = () => {
  return (
    <NetPlayer
      sources={[
          {
            file: `https://m3u8.justchill.workers.dev/?url=https://s.ezwatch.xyz/stream_6670994730c25/uwu.m3u8`,
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
