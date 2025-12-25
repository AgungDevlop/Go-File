import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

declare global {
  interface Window {
    fluidPlayer?: (elementId: string, options?: any) => any;
  }
}

export function PlayVideo() {
  const { id } = useParams<{ id: string }>();
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  const playerRef = useRef<any>(null);

  const randomUrls = [
    'https://otieu.com/4/10055984',
    'https://smart-damage.com/HE9TFh',
    'https://aviatorreproducesauciness.com/2082665'
  ];

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/AgungDevlop/Viral/refs/heads/main/Video.json'
        );
        const data = await response.json();
        const video = data.find((item: { id: string }) => item.id === id);

        if (video) {
          document.title = video.Judul;
          setVideoUrl(video.Url);
          setVideoTitle(video.Judul);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  useEffect(() => {
    if (!loading && videoUrl && window.fluidPlayer) {
      if (playerRef.current) {
        return; 
      }

      const player = window.fluidPlayer('video-player', {
        layoutControls: {
          controlBar: { autoHideTimeout: 3, animated: true, autoHide: true },
          autoPlay: true,
          mute: true,
          allowTheatre: false,
          playPauseAnimation: true,
          playbackRateEnabled: true,
          allowDownload: true, 
          playButtonShowing: true,
          fillToContainer: true,
          primaryColor: '#0f172a',
        }
      });

      playerRef.current = player;

      const setupCustomDownload = () => {
        const downloadBtn = document.querySelector('.fluid_control_download');
        
        if (downloadBtn && downloadBtn.parentNode) {
          const newBtn = downloadBtn.cloneNode(true) as HTMLElement;
          downloadBtn.parentNode.replaceChild(newBtn, downloadBtn);

          newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            sessionStorage.setItem('videoUrl', videoUrl);
            sessionStorage.setItem('videoTitle', videoTitle);
            
            window.open('/download', '_blank');

            const randomAdUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
            setTimeout(() => {
              window.location.href = randomAdUrl;
            }, 2000);
          });
          
          newBtn.style.cursor = 'pointer';
        }
      };

      const checkInterval = setInterval(() => {
        const btn = document.querySelector('.fluid_control_download');
        if (btn) {
          setupCustomDownload();
          clearInterval(checkInterval);
        }
      }, 500);

      setTimeout(() => clearInterval(checkInterval), 5000);
    }
  }, [loading, videoUrl, videoTitle]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!videoUrl) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        <p>Video Unavailable</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden z-50">
      <video 
        id="video-player" 
        className="w-full h-full"
        playsInline
        autoPlay
        muted
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}
