import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaExclamationTriangle, FaSpinner, FaPlayCircle } from 'react-icons/fa';

export const VerifLink: React.FC = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionTriggered, setActionTriggered] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const adUrls = [
    'https://otieu.com/4/10209209',
    'https://viiukuhe.com/dc/?blockID=406304',
    'https://jovial-fortune.com/cY2po8'
  ];

  const getRandomAdUrl = () => {
    const randomIndex = Math.floor(Math.random() * adUrls.length);
    return adUrls[randomIndex];
  };

  useEffect(() => {
    if (!videoId) {
      setIsLoading(false);
      return;
    }

    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/AgungDevlop/Viral/refs/heads/main/Video.json'
        );
        const data = await response.json();
        const video = data.find((item: { id: string }) => item.id === videoId);

        if (video) {
          setVideoUrl(video.Url);
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  const handleVideoPlay = () => {
    if (videoId && !actionTriggered) {
      setActionTriggered(true);
      setIsRedirecting(true); // Aktifkan status redirecting untuk menampilkan spinner

      // 1. Buka video di tab baru secara instan
      window.open(`/e/${videoId}?autoplay=true`, '_blank');

      // 2. Redirect tab saat ini SETELAH 2 detik
      setTimeout(() => {
        window.location.href = getRandomAdUrl();
      }, 2000); // 2000 milidetik = 2 detik
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <FaSpinner className="text-6xl text-blue-500 animate-spin mb-5" />
        <p className="text-xl">Loading Video Preview...</p>
      </div>
    );
  }

  if (!videoId || !videoUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
        <FaExclamationTriangle className="text-6xl text-yellow-500 mb-5" />
        <h1 className="text-4xl font-bold text-red-600 mb-3">Error</h1>
        <p className="text-lg text-gray-700 max-w-md">
          Video not found or failed to load. Please check the link and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Click Play to Watch Full Video
        </h1>
        <p className="text-md text-gray-600 mb-6 max-w-md mx-auto">
          Your video will open in a new tab without interruptions.
        </p>
        
        <div 
            className="relative w-full aspect-video bg-black rounded-lg shadow-xl overflow-hidden"
            onClick={handleVideoPlay}
        >
          {/* Tampilkan ikon play hanya jika belum diklik */}
          {!isRedirecting && (
            <div className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer">
              <FaPlayCircle className="text-white text-7xl md:text-8xl opacity-80 hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Tampilkan overlay loading saat proses redirect */}
          {isRedirecting && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black bg-opacity-75">
              <FaSpinner className="animate-spin text-white text-5xl mb-4" />
              <p className="text-white text-lg font-semibold">Opening video...</p>
            </div>
          )}

          <video
            key={videoUrl}
            width="100%"
            height="100%"
            preload="metadata"
            muted
            className="pointer-events-none" 
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};
