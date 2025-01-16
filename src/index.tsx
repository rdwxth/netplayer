import './global.css';
import * as React from 'react';
import GlobalContext from './contexts/GlobalContext';
import { VideoContextProvider } from './contexts/VideoContext';
import { NetPlayerProps } from './contexts/VideoPropsContext';
import DefaultUI from './components/DefaultUI';

const InnerPlayer = React.forwardRef<HTMLVideoElement, NetPlayerProps>(
  ({ hlsRef = React.createRef(), children, ...props }, ref) => {
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
