import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "./shared/Layout";
import PageBackground from "./shared/PageBackground";
import LoadingSpinner from "./shared/LoadingSpinner";

function HomePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    genre: "",
    description: "",
    isPublic: true,
  });

  // Mock data for demonstration
  const recentTracks = [
    {
      id: "track1",
      title: "Midnight Echoes",
      artist: "Skyline Dreams",
      genre: "Electronic",
      uploadDate: "2 days ago",
      plays: 127,
      likes: 24,
      isPublic: true,
    },
    {
      id: "track2",
      title: "Urban Reflections",
      artist: "City Pulse",
      genre: "Lo-fi",
      uploadDate: "1 week ago",
      plays: 342,
      likes: 56,
      isPublic: true,
    },
    {
      id: "track3",
      title: "Sunset Boulevard",
      artist: "Ocean Waves",
      genre: "Chill",
      uploadDate: "2 weeks ago",
      plays: 215,
      likes: 41,
      isPublic: false,
    },
  ];

  const communityTracks = [
    {
      id: "comm1",
      title: "Neon Dreams",
      artist: "Night Vision",
      genre: "Synthwave",
      uploadDate: "1 day ago",
      plays: 432,
      likes: 87,
    },
    {
      id: "comm2",
      title: "Morning Light",
      artist: "Dawn Chorus",
      genre: "Ambient",
      uploadDate: "3 days ago",
      plays: 198,
      likes: 35,
    },
    {
      id: "comm3",
      title: "City Lights",
      artist: "Urban Echo",
      genre: "Electronic",
      uploadDate: "5 days ago",
      plays: 267,
      likes: 52,
    },
    {
      id: "comm4",
      title: "Deep Blue",
      artist: "Ocean Current",
      genre: "Downtempo",
      uploadDate: "1 week ago",
      plays: 321,
      likes: 64,
    },
  ];

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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUploadForm({
      ...uploadForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    // In a real app, this would upload the file to a server
    console.log("Uploading track:", uploadForm, selectedFile);

    // Mock successful upload
    setTimeout(() => {
      setUploadModalOpen(false);
      setSelectedFile(null);
      setUploadForm({
        title: "",
        genre: "",
        description: "",
        isPublic: true,
      });
      // Would typically refresh the track list here
    }, 1000);
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
          {/* Upload Section */}
          <div className="mb-10 bg-zinc-900/30 backdrop-blur-sm rounded-lg p-6 border border-zinc-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Share Your Music
                </h1>
                <p className="text-neutral-400 mt-1">
                  Upload and share your tracks with the community
                </p>
              </div>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Upload Track
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {recentTracks.length}
                </div>
                <div className="text-sm text-neutral-400">Your Tracks</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">684</div>
                <div className="text-sm text-neutral-400">Total Plays</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">121</div>
                <div className="text-sm text-neutral-400">Total Likes</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">8</div>
                <div className="text-sm text-neutral-400">Followers</div>
              </div>
            </div>
          </div>

          {/* Your Tracks Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Your Tracks</h2>
              <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentTracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-zinc-900/30 backdrop-blur-sm rounded-lg p-4 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-indigo-400"
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
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold truncate">
                          {track.title}
                        </h3>
                        {!track.isPublic && (
                          <span className="px-2 py-0.5 bg-zinc-800 rounded text-xs text-neutral-400">
                            Private
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <span>{track.genre}</span>
                        <span>•</span>
                        <span>{track.uploadDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden md:flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-neutral-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 10.5v.5m0 4.5v.5m0-5h2a2 2 0 012 2v1a2 2 0 01-2 2h-2m-6-6v.5m0 4.5v.5m0-5h2a2 2 0 012 2v1a2 2 0 01-2 2h-2"
                            />
                          </svg>
                          <span className="text-sm text-neutral-500">
                            {track.plays}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-neutral-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          <span className="text-sm text-neutral-500">
                            {track.likes}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
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
                        <button className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors">
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
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Tracks Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Community Tracks</h2>
              <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                Explore More
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {communityTracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-zinc-900/30 backdrop-blur-sm rounded-lg p-4 border border-zinc-800 hover:border-zinc-700 transition-colors"
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
                        {track.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-neutral-400">
                        <span>{track.artist}</span>
                        <span>•</span>
                        <span>{track.genre}</span>
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
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-lg w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Upload Track</h2>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-semibold text-neutral-300">
                  Audio File
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center ${selectedFile ? "border-indigo-500 bg-indigo-900/20" : "border-zinc-700 hover:border-zinc-500"}`}
                >
                  {selectedFile ? (
                    <div className="text-white">
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-neutral-400 mt-1">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="text-neutral-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 mx-auto mb-2 text-neutral-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-1">Drag and drop your audio file here</p>
                      <p className="text-sm">or</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="track-file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("track-file").click()
                    }
                    className="mt-3 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm"
                  >
                    {selectedFile ? "Change File" : "Browse Files"}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-semibold text-neutral-300"
                >
                  Track Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={uploadForm.title}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Enter track title"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="genre"
                  className="block mb-2 text-sm font-semibold text-neutral-300"
                >
                  Genre
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={uploadForm.genre}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  required
                >
                  <option value="" disabled>
                    Select a genre
                  </option>
                  <option value="Electronic">Electronic</option>
                  <option value="Lo-fi">Lo-fi</option>
                  <option value="Ambient">Ambient</option>
                  <option value="Hip Hop">Hip Hop</option>
                  <option value="Rock">Rock</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Classical">Classical</option>
                  <option value="Pop">Pop</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-semibold text-neutral-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={uploadForm.description}
                  onChange={handleFormChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Describe your track (optional)"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  checked={uploadForm.isPublic}
                  onChange={handleFormChange}
                  className="w-4 h-4 text-indigo-600 bg-zinc-800 border-zinc-700 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="isPublic"
                  className="ml-2 text-sm text-neutral-300"
                >
                  Make this track public
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-5 py-2.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                  disabled={
                    !selectedFile || !uploadForm.title || !uploadForm.genre
                  }
                >
                  Upload Track
                </button>
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default HomePage;
