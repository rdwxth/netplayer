import React, { useState, useEffect } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { PLAYER_CONTAINER_CLASS } from '../../constants';
import { useVideoProps } from '../../contexts/VideoPropsContext';
import Dialog from '../Dialog';
import ServerIcon from '../icons/ServerIcon';
import NestedMenu from '../NestedMenu';
import Popover from '../Popover';
import ControlButton from './ControlButton';

const SeasonOption = ({ seasonNumber, onClick }: { seasonNumber: number, onClick: () => void }) => (
  <NestedMenu.Item
    onClick={onClick}
    title={`Season ${seasonNumber}`}
    value={seasonNumber.toString()}
    itemKey={seasonNumber.toString()}
  />
);

const EpisodeOption = ({ seasonNumber, episodeNumber, episodeName }: { seasonNumber: number, episodeNumber: number, episodeName: string }) => {
  const handleSwitch = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('season', seasonNumber.toString());
    url.searchParams.set('episode', episodeNumber.toString());
    window.history.replaceState(null, '', url.toString());
    window.location.reload(); // Refresh the page

  };

  console.log(seasonNumber);
  return (
    <NestedMenu.Item
      title={`Episode ${episodeNumber}: ${episodeName}`}
      value={episodeNumber.toString()}
      itemKey={episodeNumber.toString()}
      onClick={handleSwitch}
    />
  );
};

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <NestedMenu.Item
    onClick={onClick}
    title="< Back"
    itemKey="back"
    value="back" // Add the 'value' property with a value of "back"
  />
);

const SeasonsMenu = ({ seasons, onSeasonClick }: { seasons: { season_number: number }[], onSeasonClick: (seasonNumber: number) => void }) => (
  <NestedMenu style={{ maxHeight: '20rem', overflowY: 'auto' }}>
    {seasons.map((season, index) => (
      <SeasonOption
        key={index}
        seasonNumber={season.season_number}
        onClick={() => onSeasonClick(season.season_number)}
      />
    ))}
  </NestedMenu>
);

const EpisodesMenu = ({ episodes, onBackClick }: { episodes: { id: number, season_number: number, episode_number: number, name: string, overview: string }[], onBackClick: () => void }) => (
  <NestedMenu style={{ maxHeight: '20rem', overflowY: 'auto' }}>
    <BackButton onClick={onBackClick} />
    {episodes.map((episode, index) => (
      <EpisodeOption
        key={index}
        seasonNumber={episode.season_number}
        episodeNumber={episode.episode_number}
        episodeName={episode.name}
      />
    ))}
  </NestedMenu>
);

const selector = `.${PLAYER_CONTAINER_CLASS}`;

const EpisodesButton = () => {
  const { metadata } = useVideoProps();
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [error, setError] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [showEpisodes, setShowEpisodes] = useState(false);

  useEffect(() => {
    const fetchSeasonsAndEpisodes = async () => {
      try {
        if (metadata && metadata.tmdbId) {
          const seasonResponse = await fetch(`https://api.themoviedb.org/3/tv/${metadata.tmdbId}?api_key=f1dd7f2494de60ef4946ea81fd5ebaba&language=en-US`);
          if (!seasonResponse.ok) {
            throw new Error('Failed to fetch TV show details');
          }
          const seasonData = await seasonResponse.json();
          setSeasons(seasonData.seasons);
        }
      } catch (error: any) {
        console.error('Error fetching seasons:', error);
        setError(error.message);
      }
    };

    fetchSeasonsAndEpisodes();
  }, [metadata]);

  const fetchEpisodes = async (seasonNumber: any) => {
    try {
      const episodeResponse = await fetch(`https://api.themoviedb.org/3/tv/${metadata.tmdbId}/season/${seasonNumber}?api_key=f1dd7f2494de60ef4946ea81fd5ebaba&language=en-US`);
      if (!episodeResponse.ok) {
        throw new Error('Failed to fetch episodes');
      }
      const episodeData = await episodeResponse.json();
      setEpisodes(episodeData.episodes);
      setShowEpisodes(true);
    } catch (error: any) {
      console.error('Error fetching episodes:', error);
      setError(error.message);
    }
  };

  const handleSeasonClick = (seasonNumber: any) => {
    setSelectedSeason(seasonNumber);
    console.log(selectedSeason);
    fetchEpisodes(seasonNumber);
  };

  const handleBackClick = () => {
    setShowEpisodes(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <React.Fragment>
      {isMobile && (
        <Dialog
          portalSelector={selector}
          reference={
            <ControlButton tooltip="Seasons">
              <ServerIcon />
            </ControlButton>
          }
        >
          {!showEpisodes ? (
            <SeasonsMenu
              seasons={seasons}
              onSeasonClick={handleSeasonClick}
            />
          ) : (
            <EpisodesMenu
              episodes={episodes}
              onBackClick={handleBackClick}
            />
          )}
        </Dialog>
      )}
      {isDesktop && (
        <Popover
          portalSelector={selector}
          reference={
            <ControlButton tooltip="Seasons">
              <ServerIcon />
            </ControlButton>
          }
          position="top"
          overflowElement={selector}
        >
          {!showEpisodes ? (
            <SeasonsMenu
              seasons={seasons}
              onSeasonClick={handleSeasonClick}
            />
          ) : (
            <EpisodesMenu
              episodes={episodes}
              onBackClick={handleBackClick}
            />
          )}
        </Popover>
      )}
    </React.Fragment>
  );
};

export default EpisodesButton;
