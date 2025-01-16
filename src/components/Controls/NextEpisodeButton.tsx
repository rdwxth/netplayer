import React, { useEffect, useState } from 'react';
import ControlButton from './ControlButton';
import { useVideo } from '../../contexts/VideoContext';
import { useVideoProps } from '../../contexts/VideoPropsContext';
import { getNextEpisode } from '../../utils/tmdb';
import FastForwardIcon from '../icons/FastForward';

interface NextEpisodeButtonProps {
    className?: string;
}

const NextEpisodeButton: React.FC<NextEpisodeButtonProps> = ({ className }) => {
    const { videoState, videoEl } = useVideo();
    const { metadata, autoplaySettings } = useVideoProps();
    const [nextEpisode, setNextEpisode] = useState<{ season: number, episode: number } | null>(null);

    useEffect(() => {
        if (metadata?.tmdbId && metadata?.type === 'tv' && metadata?.season && metadata?.episode) {
            getNextEpisode(metadata.tmdbId, metadata.season, metadata.episode).then((nextEpisode: React.SetStateAction<{ season: number; episode: number; } | null>) => {
                if (nextEpisode) {
                    setNextEpisode(nextEpisode);
                    console.log('Next episode:', nextEpisode);
                }
            });
        }
    }, [metadata]);

    const handleClick = () => {
        if (nextEpisode && videoEl) {
            const url = new URL(window.location.href);
            url.searchParams.set('s', nextEpisode.season.toString());
            url.searchParams.set('e', nextEpisode.episode.toString());
            window.history.pushState({}, '', url.toString());
            videoEl.src = url.toString();
            videoEl.play();
        }
    };

    useEffect(() => {
        if (autoplaySettings.enabled && nextEpisode && videoEl) {
            const handleTimeUpdate = () => {
                if (videoEl.currentTime >= videoEl.duration - autoplaySettings.timeBeforeEnd * 60) {
                    console.log('Autoplaying next episode');
                    handleClick();
                }
            };

            videoEl.addEventListener('timeupdate', handleTimeUpdate);
            return () => {
                videoEl.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
        return undefined;
    }, [autoplaySettings, nextEpisode, videoEl]);

    if (!nextEpisode || videoState.currentTime < videoState.duration - 8 * 60) {
        return <></>;
    }

    return (
        <ControlButton onClick={handleClick} className={`next-episode-button ${className}`}>
            <FastForwardIcon />
        </ControlButton>
    );
};

export default NextEpisodeButton;
