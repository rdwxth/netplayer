import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { useInteract } from '../../contexts/VideoInteractingContext';
import { Components, NetPlayerProps } from '../../contexts/VideoPropsContext';
import useDoubleTap from '../../hooks/useDoubleTap';
import useGlobalHotKeys from '../../hooks/useGlobalHotKeys';
import { classNames } from '../../utils';
import { IndicatorRef } from '../Indicator/Indicator';
import styles from './DefaultUI.module.css';

import { PLAYER_CONTAINER_CLASS } from '../../constants';
import Controls from '../Controls';
import MobileBackwardIndicator from '../Indicator/MobileBackwardIndicator';
import MobileForwardIndicator from '../Indicator/MobileForwardIndicator';
import MobileControls from '../MobileControls';
import MobileOverlay from '../MobileOverlay';
import Overlay from '../Overlay';
import Player from '../Player/Player';
import Subtitle from '../Subtitle';

const noop = () => {};

const defaultComponents: Components = {
  Controls,
  MobileControls,
  MobileBackwardIndicator,
  MobileForwardIndicator,
  MobileOverlay,
  Overlay,
  Player,
  Subtitle,
};

const DefaultUI = React.forwardRef<HTMLVideoElement, NetPlayerProps>(
  ({ hlsRef = React.createRef(), components, ...props }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const { setIsInteracting } = useInteract();
    const interactingTimeout = React.useRef<NodeJS.Timeout>();
    const backIndicatorRef = React.useRef<IndicatorRef>(null);
    const forwardIndicatorRef = React.useRef<IndicatorRef>(null);
    const resetInteractingCycle = React.useCallback(() => {
      setIsInteracting(true);
      if (interactingTimeout.current) {
        clearTimeout(interactingTimeout.current);
      }
      interactingTimeout.current = setTimeout(() => {
        setIsInteracting(false);
      }, 3000);
    }, [setIsInteracting]);
    const uiComponents = React.useMemo(
      () => ({
        Controls: components?.Controls || defaultComponents.Controls,
        MobileControls:
          components?.MobileControls || defaultComponents.MobileControls,
        MobileBackwardIndicator:
          components?.MobileBackwardIndicator ||
          defaultComponents.MobileBackwardIndicator,
        MobileForwardIndicator:
          components?.MobileForwardIndicator ||
          defaultComponents.MobileForwardIndicator,
        MobileOverlay:
          components?.MobileOverlay || defaultComponents.MobileOverlay,
        Overlay: components?.Overlay || defaultComponents.Overlay,
        Player: components?.Player || defaultComponents.Player,
        Subtitle: components?.Subtitle || defaultComponents.Subtitle,
      }),
      [components]
    );
    const handleDoubleTap: React.DOMAttributes<HTMLDivElement>['onTouchStart'] =
      React.useCallback((e) => {
        if (!videoRef.current) return;
        const { clientX } = e.changedTouches[0];
        const widthPercent = 45;
        const width = (window.innerWidth * widthPercent) / 100;
        if (clientX < width) {
          backIndicatorRef?.current?.show();
          videoRef.current.currentTime = videoRef.current.currentTime - 10;
        } else if (clientX > window.innerWidth - width) {
          forwardIndicatorRef?.current?.show();
          videoRef.current.currentTime = videoRef.current.currentTime + 10;
        }
      }, []);
    const handleTap: React.DOMAttributes<HTMLDivElement>['onTouchStart'] =
      React.useCallback(
        (e) => {
          const target = e.target as HTMLDivElement;
          const videoOverlay = document.querySelector('.mobile-overlay');
          if (!videoOverlay) {
            resetInteractingCycle();
            return;
          }
          const shouldCloseControls =
            target.classList.contains('mobile-overlay');
          if (shouldCloseControls) {
            setIsInteracting(false);
            return;
          }
          resetInteractingCycle();
        },
        [resetInteractingCycle, setIsInteracting]
      );
    const onTap = useDoubleTap({
      onDoubleTap: handleDoubleTap,
      onTap: handleTap,
      tapThreshold: 250,
    });
    useGlobalHotKeys(videoRef.current!);
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
      <div
        onClick={!isMobile ? resetInteractingCycle : noop}
        onMouseMove={!isMobile ? resetInteractingCycle : noop}
        onTouchStart={isMobile ? onTap : noop}
        className={classNames(PLAYER_CONTAINER_CLASS, styles.container)}
      >
        <uiComponents.MobileBackwardIndicator ref={backIndicatorRef} />
        <uiComponents.MobileForwardIndicator ref={forwardIndicatorRef} />
        
        <div className={styles.playerContainer}>
          <uiComponents.Player ref={playerRef} hlsRef={hlsRef} {...props} />
          <uiComponents.Subtitle />
        </div>
        <div className={styles.overlayContainer}>
          {isMobile ? <uiComponents.MobileOverlay /> : <uiComponents.Overlay />}
        </div>
        <div className={styles.controlsContainer}>
          {isMobile ? (
            <uiComponents.MobileControls />
          ) : (
            <uiComponents.Controls />
          )}
        </div>
      </div>
    );
  }
);

DefaultUI.displayName = 'DefaultUI';

export default React.memo(DefaultUI);
