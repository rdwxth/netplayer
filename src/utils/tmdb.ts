const TMDB_API_KEY = 'f1dd7f2494de60ef4946ea81fd5ebaba';

export const getNextEpisode = async (tmdbId: number, season: number, episode: number): Promise<{ season: number, episode: number } | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${tmdbId}/season/${season}/episode/${episode}?api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();
    console.log('TMDB API response:', data);

    if (data.success === false) {
        return null;
    }

    const nextEpisode = episode + 1;
    const nextEpisodeResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${tmdbId}/season/${season}/episode/${nextEpisode}?api_key=${TMDB_API_KEY}`
    );
    const nextEpisodeData = await nextEpisodeResponse.json();

    if (nextEpisodeData.success === false) {
        const nextSeason = season + 1;
        const nextSeasonResponse = await fetch(
            `https://api.themoviedb.org/3/tv/${tmdbId}/season/${nextSeason}/episode/1?api_key=${TMDB_API_KEY}`
        );
        const nextSeasonData = await nextSeasonResponse.json();

        if (nextSeasonData.success === false) {
            return null;
        }

        return { season: nextSeason, episode: 1 };
    }

    return { season, episode: nextEpisode };
};
