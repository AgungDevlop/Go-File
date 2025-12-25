import { FaCloudDownloadAlt, FaFileVideo, FaExclamationCircle, FaArrowRight } from 'react-icons/fa';

export function Download() {
  const videoUrl = sessionStorage.getItem('videoUrl');
  const videoTitle = sessionStorage.getItem('videoTitle');

  const randomUrls = [
    'https://otieu.com/4/10055984',
    'https://smart-damage.com/HE9TFh',
    'https://aviatorreproducesauciness.com/2082665'
  ];
  
  const handleDownload = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');

      setTimeout(() => {
        const randomUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
        window.location.href = randomUrl;
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-white p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900"></div>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <FaCloudDownloadAlt className="text-4xl text-slate-900" />
          </div>
          
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Ready to Download
          </h1>
          
          <p className="text-slate-500 mb-8 text-sm font-medium">
            Your content is prepared and ready for secure transfer.
          </p>

          {videoUrl ? (
            <div className="w-full space-y-6">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4 text-left group hover:border-slate-300 transition-colors">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-slate-900">
                    <FaFileVideo size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">
                        {videoTitle || 'Untitled Video'}
                    </p>
                    <p className="text-xs text-slate-500">MP4 Format • High Quality</p>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full group relative flex items-center justify-center gap-3 bg-slate-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-900/20 active:scale-95"
              >
                <span>Start Download</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-xs text-slate-400">
                The download will start in a new window automatically.
              </p>
            </div>
          ) : (
            <div className="w-full bg-red-50 border border-red-100 rounded-xl p-6 flex flex-col items-center gap-3">
              <FaExclamationCircle className="text-3xl text-red-500" />
              <div>
                <h3 className="text-red-900 font-bold">Download Unavailable</h3>
                <p className="text-red-600 text-sm mt-1">
                    Session expired or invalid URL. Please return to player.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
