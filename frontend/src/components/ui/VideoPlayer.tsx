import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../assets/icons';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  duration?: number;
  currentTime?: number;
  onTimeUpdate?: (currentTime: number) => void;
  onProgress?: (progress: number) => void;
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  autoPlay?: boolean;
  controls?: boolean;
  showProgress?: boolean;
  showQuality?: boolean;
  showPlaybackSpeed?: boolean;
  showFullscreen?: boolean;
  qualities?: Array<{ label: string; src: string }>;
  playbackSpeeds?: number[];
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  duration,
  currentTime: externalCurrentTime,
  onTimeUpdate,
  onProgress,
  onEnded,
  onPlay,
  onPause,
  autoPlay = false,
  controls = true,
  showProgress = true,
  showQuality = true,
  showPlaybackSpeed = true,
  showFullscreen = true,
  qualities = [],
  playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2],
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentQuality, setCurrentQuality] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);
      
      if (videoDuration > 0) {
        const progress = (time / videoDuration) * 100;
        onProgress?.(progress);
      }
    };

    const handleDurationChange = () => {
      setVideoDuration(video.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setLoading(false);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleLoadStart = () => {
      setLoading(true);
    };

    const handleCanPlay = () => {
      setLoading(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [onTimeUpdate, onProgress, onPlay, onPause, onEnded, videoDuration]);

  useEffect(() => {
    if (externalCurrentTime !== undefined && videoRef.current) {
      videoRef.current.currentTime = externalCurrentTime;
    }
  }, [externalCurrentTime]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * videoDuration;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const changeQuality = (qualityIndex: number) => {
    const video = videoRef.current;
    if (!video || !qualities[qualityIndex]) return;

    const currentTimeValue = video.currentTime;
    video.src = qualities[qualityIndex].src;
    video.currentTime = currentTimeValue;
    setCurrentQuality(qualityIndex);
    setShowQualityMenu(false);
  };

  const changePlaybackSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    switch (e.code) {
      case 'Space':
        e.preventDefault();
        togglePlay();
        break;
      case 'KeyF':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'KeyM':
        e.preventDefault();
        toggleMute();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, currentTime - 10);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(videoDuration, currentTime + 10);
        }
        break;
    }
  };

  const progressPercentage = videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0;

  return (
    <div 
      className={`relative bg-black rounded-lg overflow-hidden group ${className}`}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        className="w-full h-full object-contain"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(true)}
      />

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icons.Loader className="animate-spin h-12 w-12 text-white" />
        </div>
      )}

      {/* Play Button Overlay */}
      {!isPlaying && !loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-4 transition-all duration-200"
          >
            <Icons.Play className="h-12 w-12 ml-1" />
          </button>
        </div>
      )}

      {/* Title */}
      {title && (
        <div className="absolute top-4 left-4 right-4">
          <h3 className="text-white text-lg font-semibold truncate bg-black bg-opacity-50 px-3 py-1 rounded">
            {title}
          </h3>
        </div>
      )}

      {/* Controls */}
      {controls && (
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Progress Bar */}
          {showProgress && (
            <div className="px-4 py-2">
              <div
                ref={progressRef}
                className="w-full h-2 bg-gray-600 rounded-full cursor-pointer hover:h-3 transition-all duration-200"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-blue-500 rounded-full relative"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-blue-400 transition-colors duration-200"
              >
                {isPlaying ? (
                  <Icons.Pause className="h-6 w-6" />
                ) : (
                  <Icons.Play className="h-6 w-6" />
                )}
              </button>

              {/* Volume */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-blue-400 transition-colors duration-200"
                >
                  {isMuted || volume === 0 ? (
                    <Icons.VolumeX className="h-5 w-5" />
                  ) : volume < 0.5 ? (
                    <Icons.Volume1 className="h-5 w-5" />
                  ) : (
                    <Icons.Volume2 className="h-5 w-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Time */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(videoDuration || duration || 0)}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Playback Speed */}
              {showPlaybackSpeed && (
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="text-white hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {playbackSpeed}x
                  </button>
                  {showSpeedMenu && (
                    <div className="absolute bottom-8 right-0 bg-black bg-opacity-90 rounded-lg py-2 min-w-16">
                      {playbackSpeeds.map((speed) => (
                        <button
                          key={speed}
                          onClick={() => changePlaybackSpeed(speed)}
                          className={`block w-full px-3 py-1 text-sm text-left hover:bg-gray-700 ${
                            speed === playbackSpeed ? 'text-blue-400' : 'text-white'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quality */}
              {showQuality && qualities.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                    className="text-white hover:text-blue-400 transition-colors duration-200"
                  >
                    <Icons.Settings className="h-5 w-5" />
                  </button>
                  {showQualityMenu && (
                    <div className="absolute bottom-8 right-0 bg-black bg-opacity-90 rounded-lg py-2 min-w-20">
                      {qualities.map((quality, index) => (
                        <button
                          key={index}
                          onClick={() => changeQuality(index)}
                          className={`block w-full px-3 py-1 text-sm text-left hover:bg-gray-700 ${
                            index === currentQuality ? 'text-blue-400' : 'text-white'
                          }`}
                        >
                          {quality.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Fullscreen */}
              {showFullscreen && (
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-blue-400 transition-colors duration-200"
                >
                  {isFullscreen ? (
                    <Icons.Minimize className="h-5 w-5" />
                  ) : (
                    <Icons.Maximize className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;