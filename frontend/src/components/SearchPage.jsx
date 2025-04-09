import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "./shared/Layout";
import PageBackground from "./shared/PageBackground";
import LoadingSpinner from "./shared/LoadingSpinner";

function SearchPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock data for demonstration
  const mockResults = {
    tracks: [
      {
        id: "track1",
        title: "Midnight Echoes",
        artist: "Skyline Dreams",
        genre: "Electronic",
        plays: 12453,
      },
      {
        id: "track2",
        title: "Urban Reflections",
        artist: "City Pulse",
        genre: "Lo-fi",
        plays: 8721,
      },
      {
        id: "track3",
        title: "Sunset Boulevard",
        artist: "Ocean Waves",
        genre: "Chill",
        plays: 15632,
      },
    ],
    artists: [
      {
        id: "artist1",
        name: "Skyline Dreams",
        genre: "Electronic",
        followers: 24567,
      },
      {
        id: "artist2",
        name: "City Pulse",
        genre: "Lo-fi",
        followers: 18932,
      },
    ],
    playlists: [
      {
        id: "playlist1",
        title: "Chill Vibes",
        creator: "MusicLover",
        trackCount: 24,
      },
      {
        id: "playlist2",
        title: "Electronic Mix",
        creator: "BeatMaster",
        trackCount: 18,
      },
    ],
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentUser, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    // In a real app, this would make an API call
    // For demo, we'll filter the mock data
    const query = searchQuery.toLowerCase();

    const filteredTracks = mockResults.tracks.filter(
      (track) =>
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.genre.toLowerCase().includes(query),
    );

    const filteredArtists = mockResults.artists.filter(
      (artist) =>
        artist.name.toLowerCase().includes(query) ||
        artist.genre.toLowerCase().includes(query),
    );

    const filteredPlaylists = mockResults.playlists.filter(
      (playlist) =>
        playlist.title.toLowerCase().includes(query) ||
        playlist.creator.toLowerCase().includes(query),
    );

    setSearchResults({
      tracks: filteredTracks,
      artists: filteredArtists,
      playlists: filteredPlaylists,
    });
  };

  const getFilteredResults = () => {
    if (!searchResults || Object.keys(searchResults).length === 0) {
      return [];
    }

    switch (activeFilter) {
      case "tracks":
        return searchResults.tracks || [];
      case "artists":
        return searchResults.artists || [];
      case "playlists":
        return searchResults.playlists || [];
      case "all":
      default:
        return [
          ...(searchResults.tracks || []),
          ...(searchResults.artists || []),
          ...(searchResults.playlists || []),
        ];
    }
  };

  const renderResultItem = (item) => {
    // Track result
    if (item.title && item.artist) {
      return (
        <div
          key={item.id}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 border border-zinc-800 hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <span>{item.artist}</span>
                <span>•</span>
                <span>{item.genre}</span>
              </div>
            </div>
            <button className="w-8 h-8 bg-indigo-700 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
              </svg>
            </button>
          </div>
        </div>
      );
    }

    // Artist result
    if (item.name && item.followers !== undefined) {
      return (
        <div
          key={item.id}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 border border-zinc-800 hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate">{item.name}</h3>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <span>{item.genre}</span>
                <span>•</span>
                <span>{item.followers.toLocaleString()} followers</span>
              </div>
            </div>
            <button className="px-3 py-1.5 text-xs font-medium text-indigo-400 border border-indigo-800 rounded-lg hover:bg-indigo-900/30 transition-colors">
              Follow
            </button>
          </div>
        </div>
      );
    }

    // Playlist result
    if (item.title && item.trackCount !== undefined) {
      return (
        <div
          key={item.id}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 border border-zinc-800 hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <span>By {item.creator}</span>
                <span>•</span>
                <span>{item.trackCount} tracks</span>
              </div>
            </div>
            <button className="w-8 h-8 bg-indigo-700 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
              </svg>
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-neutral-950">
        <PageBackground />
        <div className="relative z-[1]">
          <LoadingSpinner size="large" color="indigo" />
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="relative min-h-screen bg-neutral-950">
        <PageBackground />
        <div className="relative z-[1] container mx-auto px-4 py-6 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-6">Search</h1>

            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for tracks, artists, or playlists..."
                  className="w-full px-4 py-3 pl-10 bg-zinc-800/70 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-r-lg transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {searchResults && Object.keys(searchResults).length > 0 && (
              <>
                <div className="flex overflow-x-auto hide-scrollbar mb-4 border-b border-zinc-800">
                  <button
                    className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                      activeFilter === "all"
                        ? "text-white border-b-2 border-indigo-500"
                        : "text-neutral-400 hover:text-white"
                    }`}
                    onClick={() => setActiveFilter("all")}
                  >
                    All Results
                  </button>
                  <button
                    className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                      activeFilter === "tracks"
                        ? "text-white border-b-2 border-indigo-500"
                        : "text-neutral-400 hover:text-white"
                    }`}
                    onClick={() => setActiveFilter("tracks")}
                  >
                    Tracks ({searchResults.tracks?.length || 0})
                  </button>
                  <button
                    className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                      activeFilter === "artists"
                        ? "text-white border-b-2 border-indigo-500"
                        : "text-neutral-400 hover:text-white"
                    }`}
                    onClick={() => setActiveFilter("artists")}
                  >
                    Artists ({searchResults.artists?.length || 0})
                  </button>
                  <button
                    className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                      activeFilter === "playlists"
                        ? "text-white border-b-2 border-indigo-500"
                        : "text-neutral-400 hover:text-white"
                    }`}
                    onClick={() => setActiveFilter("playlists")}
                  >
                    Playlists ({searchResults.playlists?.length || 0})
                  </button>
                </div>

                <div className="space-y-3">
                  {getFilteredResults().length > 0 ? (
                    getFilteredResults().map(renderResultItem)
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-neutral-400">
                        No results found for this filter.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {(!searchResults || Object.keys(searchResults).length === 0) &&
              searchQuery && (
                <div className="text-center py-12 bg-zinc-900/30 backdrop-blur-sm rounded-lg border border-zinc-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-neutral-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    No results found
                  </h2>
                  <p className="text-neutral-400">
                    We couldn't find any matches for "{searchQuery}"
                  </p>
                  <p className="text-neutral-500 text-sm mt-2">
                    Try different keywords or check your spelling
                  </p>
                </div>
              )}

            {(!searchResults || Object.keys(searchResults).length === 0) &&
              !searchQuery && (
                <div className="text-center py-12 bg-zinc-900/30 backdrop-blur-sm rounded-lg border border-zinc-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-neutral-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Search for music
                  </h2>
                  <p className="text-neutral-400">
                    Find your favorite tracks, artists, and playlists
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => setSearchQuery("electronic")}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm text-neutral-300 transition-colors"
                    >
                      Electronic
                    </button>
                    <button
                      onClick={() => setSearchQuery("lo-fi")}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm text-neutral-300 transition-colors"
                    >
                      Lo-fi
                    </button>
                    <button
                      onClick={() => setSearchQuery("ambient")}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm text-neutral-300 transition-colors"
                    >
                      Ambient
                    </button>
                    <button
                      onClick={() => setSearchQuery("jazz")}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm text-neutral-300 transition-colors"
                    >
                      Jazz
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbars while allowing scrolling */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Layout>
  );
}

export default SearchPage;
