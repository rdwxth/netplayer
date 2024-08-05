import React from 'react'
import NetPlayer from '../../src'

const App: React.FC = () => {
  return (
    <NetPlayer
      sources={[
          {
            file: `https://hls21-eu.zcdn.stream/0e7e28b1a1ea6d306350b303b73cfcbd/2024-07-22/video.m3u8?auth=c7bdf081ccdcb5dac6f47e260cda13de&expires=1722879632&type=edge&node=ttenonaRprj4DwnW-f6rB6S_0EFYBTK_jsxSJ0ZykApzZ_civyVBc8ApBeO2jCIqdOHCmXaUfBvSfc4t5hoEJo2gHi6xBksSnNdKpGDjQkNdeN0npejGE_g9WtxKAkf6hFaiO_VM_2HHVS_he7BnMwl68FCr7-C4zro_sRt2Vy8w6ORNkK0d9aMm2blM4HUMUiW2JMAvPRXXk0ml8oST4g`,
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
        type: 'movie',
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
