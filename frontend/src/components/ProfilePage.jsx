import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PageBackground from "./shared/PageBackground";
import Layout from "./shared/Layout";
import LoadingSpinner from "./shared/LoadingSpinner";

function ProfilePage() {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setProfileData({
      name: currentUser.name || "",
      email: currentUser.email || "",
      bio: currentUser.bio || "",
    });
    setIsLoading(false);
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: profileData.name,
      bio: profileData.bio,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
        <div className="relative z-[1] container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
                Profile
              </h1>
              <div className="flex gap-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : null}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-semibold text-neutral-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold text-neutral-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-neutral-400 cursor-not-allowed"
                  />
                  <p className="mt-1 text-xs text-neutral-500">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block mb-2 text-sm font-semibold text-neutral-300"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  ></textarea>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center text-3xl text-white font-bold">
                    {currentUser.name
                      ? currentUser.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {currentUser.name}
                    </h2>
                    <p className="text-neutral-400">{currentUser.email}</p>
                    <p className="text-neutral-300 mt-2">
                      Joined on{" "}
                      {new Date(currentUser.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-2">Bio</h3>
                  <p className="text-neutral-300">
                    {currentUser.bio || "No bio provided yet."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Activity Section */}
          <div className="mt-8 bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {/* Activity Cards */}
              <div className="bg-zinc-800/70 rounded-lg p-4 border border-zinc-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold">
                      Uploaded new track
                    </h3>
                    <p className="text-neutral-400 text-sm mt-1">
                      "Midnight Echoes" - Electronic / Ambient
                    </p>
                  </div>
                  <span className="text-xs text-neutral-500">2 days ago</span>
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <div className="bg-zinc-700 h-16 w-16 rounded flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo-400"
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
                  <div className="flex-1">
                    <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-neutral-500">0:00</span>
                      <span className="text-xs text-neutral-500">3:45</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="px-2 py-1 bg-zinc-700 rounded text-xs text-neutral-300">
                    128 plays
                  </span>
                  <span className="px-2 py-1 bg-zinc-700 rounded text-xs text-neutral-300">
                    24 likes
                  </span>
                </div>
              </div>

              <div className="bg-zinc-800/70 rounded-lg p-4 border border-zinc-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold">
                      Joined new group
                    </h3>
                    <p className="text-neutral-400 text-sm mt-1">
                      "Electronic Music Producers"
                    </p>
                  </div>
                  <span className="text-xs text-neutral-500">1 week ago</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="bg-zinc-700 h-8 w-8 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-neutral-300">
                    Group with 1,245 members
                  </span>
                </div>
              </div>

              <div className="bg-zinc-800/70 rounded-lg p-4 border border-zinc-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold">
                      Received feedback
                    </h3>
                    <p className="text-neutral-400 text-sm mt-1">
                      On "Urban Dreams" from @producer_jane
                    </p>
                  </div>
                  <span className="text-xs text-neutral-500">2 weeks ago</span>
                </div>
                <div className="mt-3 p-3 bg-zinc-700/50 rounded border border-zinc-600 text-sm text-neutral-300 italic">
                  "Love the bass line on this track! The mix is clean and the
                  arrangement keeps me engaged throughout. Would love to
                  collaborate sometime."
                </div>
              </div>
            </div>

            <button className="mt-6 w-full py-3 text-indigo-400 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-700">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
