import React, { useRef, useEffect } from 'react';
import NetPlayer from '../../src';

const App: React.FC = () => {
 
  return (
    <NetPlayer
      sources={[
        {
          file: `https://gralvixfire92.live/file1/FHOYw53Qt7jILuyFBIWikdMj3V2qWEu20K~9U30qnWDm0SdQ3NuWH1I3ErdjaTB3KcJzwN7C64p7JGEcpygR1dwuSx3aAkRvZ2JDVOiYXq034mREnvpacBklBmCw1SKLWnnq1mRhrdnh8zHQt0Y7MPMqtXBa~JOwUdxKOCeuREQ=/MTA4MA==/cGxheWxpc3QubTN1OAo=.m3u8`,
        },
      ]}
      metadata={{
        tmdbId: 93405,
        type: 'tv',
        season: 1,
        episode: 1,
        downloads: [
          {
            file_name: 'Reacher S01E01.mp4',
            download_url: 'https://gamn.vid109d224.site/download.mp4',
          },
        ],
      }}
      servers={[
        {
          name: 'Server 1',
          flag: '🇺🇸',
          onClick: () => console.log('Server 1 selected'),
        },
        {
          name: 'Server 2',
          flag: '🇬🇧',
          onClick: () => console.log('Server 2 selected'),
        },
      ]}
      className="object-contain w-full h-full"
      autoPlay
    />
  );
};

export default App;
