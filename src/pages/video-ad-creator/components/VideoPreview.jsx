import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPreview = ({ videoData, isGenerating, progress }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const percent = (e?.clientX - rect?.left) / rect?.width;
    setCurrentTime(percent * videoData?.duration);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-sm">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-semibold text-foreground text-lg md:text-xl">
            Video Preview
          </h3>
          {videoData?.template && (
            <span className="text-sm text-muted-foreground">
              {videoData?.template?.name}
            </span>
          )}
        </div>
        {isGenerating && (
          <div className="flex items-center gap-2 text-accent">
            <Icon name="Loader2" size={16} className="animate-spin" />
            <span className="text-sm font-medium">Generating video... {progress}%</span>
          </div>
        )}
      </div>
      <div className="relative bg-background aspect-video">
        {!videoData?.template ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
            <Icon name="Video" size={64} className="mb-4 opacity-50" />
            <p className="text-base md:text-lg font-medium">Select a template to preview</p>
            <p className="text-sm mt-2">Choose from construction industry templates</p>
          </div>
        ) : isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-base md:text-lg font-medium text-foreground mb-2">
              Rendering your video
            </p>
            <div className="w-64 md:w-80 bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Estimated time: {Math.ceil((100 - progress) / 10)} minutes
            </p>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/90 rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-primary transition-smooth">
                  <Icon
                    name={isPlaying ? 'Pause' : 'Play'}
                    size={32}
                    color="var(--color-primary-foreground)"
                  />
                </div>
                <p className="text-foreground font-medium text-sm md:text-base">
                  {videoData?.companyName || 'Your Company'} - AI Construction Ad
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="space-y-3">
                <div
                  className="w-full bg-muted/80 rounded-full h-1.5 cursor-pointer group"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-primary rounded-full transition-all group-hover:h-2"
                    style={{ width: `${(currentTime / videoData?.duration) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={togglePlay}
                      className="text-foreground hover:text-primary"
                    >
                      <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
                    </Button>

                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                        className="text-foreground hover:text-primary"
                      >
                        <Icon
                          name={volume === 0 ? 'VolumeX' : volume < 50 ? 'Volume1' : 'Volume2'}
                          size={20}
                        />
                      </Button>
                      {showVolumeSlider && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-card border border-border rounded-lg p-3 shadow-elevation-md">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(Number(e?.target?.value))}
                            className="w-24 accent-primary"
                          />
                        </div>
                      )}
                    </div>

                    <span className="text-sm text-foreground font-medium whitespace-nowrap">
                      {formatTime(currentTime)} / {formatTime(videoData?.duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-foreground hover:text-primary hidden md:flex"
                    >
                      <Icon name="Settings" size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-foreground hover:text-primary"
                    >
                      <Icon name="Maximize" size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {videoData?.template && !isGenerating && (
        <div className="p-4 md:p-6 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="text-center">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Duration</p>
              <p className="text-sm md:text-base font-semibold text-foreground">
                {videoData?.duration}s
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Resolution</p>
              <p className="text-sm md:text-base font-semibold text-foreground">1080p</p>
            </div>
            <div className="text-center">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Format</p>
              <p className="text-sm md:text-base font-semibold text-foreground">MP4</p>
            </div>
            <div className="text-center">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Size</p>
              <p className="text-sm md:text-base font-semibold text-foreground">~45 MB</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPreview;