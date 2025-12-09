import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { FaExclamationTriangle, FaSpinner, FaPlay } from 'react-icons/fa';

export const VerifLink: React.FC = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();

  // LOGIKA EXTRAKSI ID YANG LEBIH KUAT
  const getRawId = () => {
    // 1. Coba dari React Router params
    if (params.id) return params.id;
    
    // 2. Coba dari query parameter (?v=...)
    const queryId = searchParams.get('v');
    if (queryId) return queryId;

    // 3. (PENTING) Coba ambil manual dari URL browser (fallback untuk GitHub Pages)
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    return lastSegment || null;
  };

  const rawId = getRawId();
  // Bersihkan ekstensi .mp4 jika ada
  const videoId = rawId ? rawId.replace('.mp4', '') : null;

  // --- DEBUGGING CONSOLE ---
  console.log("=== DEBUG VERIFLINK ===");
  console.log("Full URL:", window.location.href);
  console.log("Params dari Router:", params);
  console.log("Raw ID terdeteksi:", rawId);
  console.log("Video ID (Final):", videoId);
  // -------------------------

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionTriggered, setActionTriggered] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const adUrls = [
    'https://agungwandev.com',
  ];

  const getRandomAdUrl = () => {
    const randomIndex = Math.floor(Math.random() * adUrls.length);
    return adUrls[randomIndex];
  };

  useEffect(() => {
    if (!videoId) {
      console.error("Video ID is NULL/Empty");
      setIsLoading(false);
      return;
    }

    const fetchVideoData = async () => {
      try {
        console.log("Fetching JSON Data...");
        const response = await fetch(
          'https://raw.githubusercontent.com/AgungDevlop/Viral/refs/heads/main/Video.json'
        );
        const data = await response.json();
        
        // Cari video
        const video = data.find((item: { id: string }) => item.id === videoId);

        console.log("Hasil Pencarian di JSON:");
        console.log("Dicari ID:", videoId);
        console.log("Ditemukan:", video);

        if (video) {
          setVideoUrl(video.Url);
        } else {
          console.warn("ID tidak ditemukan di dalam Video.json!");
        }
      } catch (error) {
        console.error("Gagal mengambil data JSON:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  const handleVideoPlay = () => {
    if (videoId && !actionTriggered) {
      setActionTriggered(true);
      setIsRedirecting(true);

      window.open(`/e/${videoId}?autoplay=true`, '_blank');

      setTimeout(() => {
        window.location.href = getRandomAdUrl();
      }, 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
        <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 border-4 border-gray-600 rounded-full"></div>
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!videoId || !videoUrl) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black p-6 z-50">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="text-2xl text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Video Unavailable</h1>
          <p className="text-gray-400 mb-4 text-sm">
             ID: {videoId || "Not Detected"} <br/>
             (Cek Console F12 untuk detail)
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-colors mt-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
      <div 
        className="relative w-full h-full cursor-pointer group"
        onClick={handleVideoPlay}
      >
        <video
          key={videoUrl}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          preload="metadata"
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>

        {!isRedirecting && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="relative flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md rounded-full shadow-2xl border border-white/30 transition-transform duration-300 group-hover:scale-110">
              <FaPlay className="text-4xl text-white ml-2" />
              <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-30"></div>
            </div>
          </div>
        )}

        {isRedirecting && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/80 backdrop-blur-sm">
            <FaSpinner className="animate-spin text-white text-5xl mb-4" />
            <p className="text-white text-lg font-medium tracking-wide">Launching Player...</p>
          </div>
        )}
      </div>
    </div>
  );
};