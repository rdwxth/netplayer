import React from 'react'
import NetPlayer from '../../src'

const App: React.FC = () => {
  return (
    <NetPlayer
      sources={[
          {
            file: `https://j.pollllop.com/_v11/9d63e6f64090b701b78d116d38498e864bdfe09b00585059eff26ab891ed0567102b9859eecfb771a82dbedd8de3dbf44a9a2fede70ebe67f096148fb4ef0e3c8f2258eef563fac468bb38185040d6e7552414dc4db0256cba41a2722793a3ccde399f02d768afcb68aeefa322fd491ee2abbe0ca1a547d84cf117fdb1bee037f034a835eec8ddfa54bb30ed14669628/playlist.m3u8`,
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
