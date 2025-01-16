import './global.css';
import * as React from 'react';
import GlobalContext from './contexts/GlobalContext';
import { VideoContextProvider } from './contexts/VideoContext';
import { NetPlayerProps } from './contexts/VideoPropsContext';
import DefaultUI from './components/DefaultUI';

const InnerPlayer = React.forwardRef<HTMLVideoElement, NetPlayerProps>(
  ({ hlsRef = React.createRef(), children, metadata, ...props }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const playerRef = React.useCallback(
      (node) => {
        videoRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLVideoElement>).current = node;
        }
      },
      [ref]
    );

    React.useEffect(() => {
      const handleTimeUpdate = () => {
        if (videoRef.current && metadata?.tmdbId) {
          const watchData = {
            currentTime: videoRef.current.currentTime,
            duration: videoRef.current.duration,
            percentageWatched: (videoRef.current.currentTime / videoRef.current.duration) * 100,
          };
          const key = `watchtime-${metadata.tmdbId}-${metadata.season ?? ''}-${metadata.episode ?? ''}`;
          localStorage.setItem(key, JSON.stringify(watchData));
        }
      };

      if (videoRef.current) {
        const key = `watchtime-${metadata?.tmdbId}-${metadata?.season ?? ''}-${metadata?.episode ?? ''}`;
        const savedData = localStorage.getItem(key);
        if (savedData) {
          const { currentTime } = JSON.parse(savedData);
          videoRef.current.currentTime = currentTime;
        }

        videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
      }

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        }
      };
    }, [metadata]);

    return (
      <VideoContextProvider videoRef={videoRef} hlsRef={hlsRef}>
        {children || <DefaultUI ref={playerRef} {...props} />}
      </VideoContextProvider>
    );
  }
);

const NetPlayer = React.forwardRef<HTMLVideoElement, NetPlayerProps>(
  (
    { sources, subtitles = [], metadata={}, servers=[], hlsRef = React.createRef(), children, ...props },
    ref
  ) => {
    return (
      <GlobalContext sources={sources} subtitles={subtitles} metadata={metadata} servers={servers} {...props}>
        <InnerPlayer
          sources={sources}
          subtitles={subtitles}
          metadata={metadata}
          servers={servers}
          hlsRef={hlsRef}
          ref={ref}
          {...props}
        >
          {children}
        </InnerPlayer>
      </GlobalContext>
    );
  }
);

InnerPlayer.displayName = 'InnerPlayer';
NetPlayer.displayName = 'NetPlayer';

export * from './components';
export * from './hooks';
export * from './hotkeys';
export * from './contexts';

export default NetPlayer;
