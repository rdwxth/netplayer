import React from 'react'
import NetPlayer from '../../src'

const App: React.FC = () => {
  return (
    <NetPlayer
      sources={[
          {
            file: `https://m3u8.justchill.workers.dev/?url=https://gamn.v4322a77e96.site/_v2-xbrr/12a3c523fd105800ed8c394685aeeb0bc22eaa5c1bbbfef50b187baea93ece832257df1a4b6125fcfa38c35da05dee86aad28d46d73fc4e9d4e5a53b1022a18937c011a05b4fec095691a6b03f552e423d78d560531f7493cc99bf5ccda77f917e0fe4101660/h/list;15a38634f803584ba8926411d7bee906856cab0654b5ba.m3u8`,
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
