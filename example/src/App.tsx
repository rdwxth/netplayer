import React, { useRef, useEffect } from 'react';
import NetPlayer from '../../src';

const App: React.FC = () => {
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (playerRef.current) {
        localStorage.setItem('watchTime', playerRef.current.currentTime.toString());
      }
    };


    if (playerRef.current) {
      const savedTime = localStorage.getItem('watchTime');
      if (savedTime) {
        playerRef.current.currentTime = parseFloat(savedTime);
      }

      playerRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [playerRef]);

  return (
    <NetPlayer
      ref={playerRef}
      sources={[
        {
          file: `https://hye1eaipby4w.matham.ws/07_24_23/07/24/14/QT33BVOK/73HIGRVY.mp4/master.m3u8?ha=34372ed379f3152&hc=b2ff02dd3ec507f&hi=6508718e7b99fbb&ht=0eaf442ba4c2a95&hu=0457014d7c5d781&t=1737897796`,
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
