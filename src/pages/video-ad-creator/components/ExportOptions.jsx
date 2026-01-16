import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';


const ExportOptions = ({ videoData, onExport, onYouTubeUpload }) => {
  const [selectedFormat, setSelectedFormat] = useState('mp4-1080p');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);

  const formatOptions = [
    { value: 'mp4-1080p', label: 'MP4 - 1080p (Recommended)' },
    { value: 'mp4-720p', label: 'MP4 - 720p' },
    { value: 'mp4-4k', label: 'MP4 - 4K Ultra HD' },
    { value: 'webm-1080p', label: 'WebM - 1080p' },
    { value: 'mov-1080p', label: 'MOV - 1080p (Apple)' }
  ];

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: 'Youtube', color: 'text-red-500' },
    { id: 'facebook', name: 'Facebook', icon: 'Facebook', color: 'text-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: 'Instagram', color: 'text-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin', color: 'text-blue-700' },
    { id: 'twitter', name: 'Twitter/X', icon: 'Twitter', color: 'text-sky-500' }
  ];

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms((prev) =>
      prev?.includes(platformId)
        ? prev?.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleExport = () => {
    onExport({ format: selectedFormat, platforms: selectedPlatforms });
    setShowExportModal(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm">
      <div className="p-4 md:p-6 border-b border-border">
        <h3 className="font-heading font-semibold text-foreground text-lg md:text-xl flex items-center gap-2">
          <Icon name="Download" size={24} />
          Export & Distribution
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Download or publish your video across platforms
        </p>
      </div>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="space-y-4">
          <Select
            label="Export Format"
            options={formatOptions}
            value={selectedFormat}
            onChange={setSelectedFormat}
            description="Choose the best format for your needs"
          />

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">File Size:</span>
              <span className="font-semibold text-foreground">~45 MB</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Resolution:</span>
              <span className="font-semibold text-foreground">1920x1080</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Frame Rate:</span>
              <span className="font-semibold text-foreground">30 FPS</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bitrate:</span>
              <span className="font-semibold text-foreground">8 Mbps</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4 md:pt-6 space-y-4">
          <h4 className="font-heading font-semibold text-foreground">
            Direct Platform Publishing
          </h4>
          <p className="text-sm text-muted-foreground">
            Select platforms to publish your video directly
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {platforms?.map((platform) => (
              <div
                key={platform?.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-smooth ${
                  selectedPlatforms?.includes(platform?.id)
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => handlePlatformToggle(platform?.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`${platform?.color}`}>
                    <Icon name={platform?.icon} size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{platform?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedPlatforms?.includes(platform?.id) ? 'Selected' : 'Click to select'}
                    </p>
                  </div>
                  {selectedPlatforms?.includes(platform?.id) && (
                    <Icon name="CheckCircle2" size={20} color="var(--color-primary)" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-4 md:pt-6 space-y-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="Youtube"
            iconPosition="left"
            onClick={onYouTubeUpload}
            disabled={!videoData?.template}
          >
            Upload to YouTube
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="Download"
            iconPosition="left"
            onClick={() => setShowExportModal(true)}
            disabled={!videoData?.template}
          >
            Download Video
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="Share2"
            iconPosition="left"
            disabled={selectedPlatforms?.length === 0 || !videoData?.template}
            onClick={handleExport}
          >
            Publish to Selected Platforms ({selectedPlatforms?.length})
          </Button>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Pro Tip</p>
              <p className="text-xs text-muted-foreground">
                For best YouTube results, upload in 1080p MP4 format. Include your target keywords in the video title and description for better SEO.
              </p>
            </div>
          </div>
        </div>
      </div>
      {showExportModal && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-modal"
            onClick={() => setShowExportModal(false)}
          />
          <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg shadow-elevation-xl max-w-md w-full">
              <div className="p-6 border-b border-border">
                <h3 className="font-heading font-semibold text-foreground text-xl">
                  Download Video
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <Icon name="CheckCircle2" size={24} color="var(--color-success)" />
                  <div>
                    <p className="font-medium text-foreground">Video Ready</p>
                    <p className="text-sm text-muted-foreground">
                      Your video is ready to download
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Format: <span className="font-semibold text-foreground">MP4 1080p</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Size: <span className="font-semibold text-foreground">~45 MB</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Duration: <span className="font-semibold text-foreground">{videoData?.duration}s</span>
                  </p>
                </div>
              </div>
              <div className="p-6 border-t border-border flex gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowExportModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExport}
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportOptions;