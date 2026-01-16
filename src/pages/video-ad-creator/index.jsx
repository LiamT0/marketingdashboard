import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TemplateCard from './components/TemplateCard';
import VideoPreview from './components/VideoPreview';
import ConfigurationPanel from './components/ConfigurationPanel';
import ExportOptions from './components/ExportOptions';

const VideoAdCreator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [videoConfig, setVideoConfig] = useState({
    companyName: '',
    tagline: '',
    website: '',
    mainMessage: '',
    benefits: [],
    cta: '',
    voiceover: 'professional-male',
    music: 'corporate-upbeat',
    style: 'modern-professional',
    duration: '30',
    includeROI: true,
    includeTestimonials: false,
    includeComparison: true,
    includeCompetitor: false
  });

  const templates = [
  {
    id: 1,
    name: "AI Revolution in Construction",
    description: "Showcase how AI is transforming construction projects with real-time insights and automation",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_163efc9cc-1767706491090.png",
    thumbnailAlt: "Modern construction site with digital overlay showing AI technology integration and data analytics on building structure",
    duration: "30s",
    views: "12.5K",
    rating: "4.8",
    isPopular: true
  },
  {
    id: 2,
    name: "Before & After Success Story",
    description: "Demonstrate dramatic improvements in project efficiency and cost savings with AI adoption",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1443e9a37-1767123248397.png",
    thumbnailAlt: "Split screen comparison showing traditional construction methods on left and modern AI-powered construction with digital tools on right",
    duration: "45s",
    views: "8.3K",
    rating: "4.9",
    isPopular: true
  },
  {
    id: 3,
    name: "ROI Calculator Showcase",
    description: "Highlight potential savings and revenue increase with interactive ROI calculations",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_18523168d-1767396082746.png",
    thumbnailAlt: "Business professional analyzing financial charts and graphs on tablet showing construction project ROI and cost savings data",
    duration: "30s",
    views: "9.7K",
    rating: "4.7",
    isPopular: false
  },
  {
    id: 4,
    name: "Customer Testimonial Feature",
    description: "Feature real construction companies sharing their AI transformation success stories",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1ae6ca20c-1763295201668.png",
    thumbnailAlt: "Construction company owner in hard hat and safety vest standing at job site giving testimonial interview with confident smile",
    duration: "60s",
    views: "7.2K",
    rating: "4.8",
    isPopular: false
  },
  {
    id: 5,
    name: "Tech Innovation Spotlight",
    description: "Focus on cutting-edge AI technology features and their practical construction applications",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_17747438e-1766581901882.png",
    thumbnailAlt: "Close-up of hands using tablet with augmented reality construction planning software showing 3D building models and blueprints",
    duration: "30s",
    views: "6.8K",
    rating: "4.6",
    isPopular: false
  },
  {
    id: 6,
    name: "Competitive Advantage",
    description: "Position your company ahead of competitors with AI-powered construction solutions",
    thumbnail: "https://images.unsplash.com/photo-1723107638712-0dd0f6ebc7d8",
    thumbnailAlt: "Aerial view of multiple construction sites with one highlighted showing advanced technology implementation and superior progress",
    duration: "45s",
    views: "5.9K",
    rating: "4.7",
    isPopular: false
  }];


  const tabs = [
  { id: 'templates', label: 'Templates', icon: 'LayoutGrid' },
  { id: 'configure', label: 'Configure', icon: 'Settings' },
  { id: 'preview', label: 'Preview', icon: 'Eye' },
  { id: 'export', label: 'Export', icon: 'Download' }];


  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            setActiveTab('preview');
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setActiveTab('configure');
  };

  const handleGenerate = () => {
    if (!videoConfig?.companyName || !videoConfig?.mainMessage || !videoConfig?.cta) {
      return;
    }
    setIsGenerating(true);
    setGenerationProgress(0);
  };

  const handleExport = (exportData) => {
    console.log('Exporting video:', exportData);
    alert(`Video exported successfully!\nFormat: ${exportData?.format}\nPlatforms: ${exportData?.platforms?.join(', ')}`);
  };

  const handleYouTubeUpload = () => {
    console.log('Uploading to YouTube');
    alert('Video uploaded to YouTube successfully!\n\nYour video is now processing and will be available shortly.');
  };

  const videoData = {
    template: selectedTemplate,
    duration: parseInt(videoConfig?.duration) || 30,
    companyName: videoConfig?.companyName
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <Breadcrumb />

          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                  Video Ad Creator
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Generate high-quality construction AI advertisement videos for YouTube
                </p>
              </div>
              <Button
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={() => navigate('/dashboard')}>

                Back to Dashboard
              </Button>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} color="var(--color-primary)" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    AI-Powered Video Generation
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Create professional construction industry videos in minutes. Select a template, customize your content, and generate high-quality ads optimized for YouTube and social media platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-border mb-6 md:mb-8 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => {
                  if (tab?.id === 'configure' && !selectedTemplate) {
                    alert('Please select a template first');
                    return;
                  }
                  if (tab?.id === 'preview' && !selectedTemplate) {
                    alert('Please select a template and configure your video');
                    return;
                  }
                  if (tab?.id === 'export' && !selectedTemplate) {
                    alert('Please generate a video first');
                    return;
                  }
                  setActiveTab(tab?.id);
                }}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 font-medium transition-smooth border-b-2 flex-shrink-0 ${
                activeTab === tab?.id ?
                'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'}`
                }>

                  <Icon name={tab?.icon} size={18} />
                  <span className="text-sm md:text-base">{tab?.label}</span>
                </button>
              )}
            </div>
          </div>

          {activeTab === 'templates' &&
          <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-1">
                    Choose Your Template
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Select from professionally designed construction industry video templates
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Video" size={16} />
                  <span>{templates?.length} templates available</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {templates?.map((template) =>
              <TemplateCard
                key={template?.id}
                template={template}
                onSelect={handleTemplateSelect}
                isSelected={selectedTemplate?.id === template?.id} />

              )}
              </div>
            </div>
          }

          {activeTab === 'configure' &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <ConfigurationPanel
                config={videoConfig}
                onConfigChange={setVideoConfig}
                onGenerate={handleGenerate}
                isGenerating={isGenerating} />

              </div>
              <div className="lg:col-span-1">
                <VideoPreview
                videoData={videoData}
                isGenerating={isGenerating}
                progress={generationProgress} />

              </div>
            </div>
          }

          {activeTab === 'preview' &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <VideoPreview
                videoData={videoData}
                isGenerating={isGenerating}
                progress={generationProgress} />

                
                {selectedTemplate && !isGenerating &&
              <div className="mt-6 bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-4">
                      Video Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Icon name="Building2" size={18} className="text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Company</p>
                          <p className="text-sm text-muted-foreground">{videoConfig?.companyName || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="MessageSquare" size={18} className="text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Main Message</p>
                          <p className="text-sm text-muted-foreground">{videoConfig?.mainMessage || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Target" size={18} className="text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Call-to-Action</p>
                          <p className="text-sm text-muted-foreground">{videoConfig?.cta || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Clock" size={18} className="text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Duration</p>
                          <p className="text-sm text-muted-foreground">{videoConfig?.duration} seconds</p>
                        </div>
                      </div>
                    </div>
                  </div>
              }
              </div>
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <Button
                      variant="outline"
                      fullWidth
                      iconName="Settings"
                      iconPosition="left"
                      onClick={() => setActiveTab('configure')}>

                        Edit Configuration
                      </Button>
                      <Button
                      variant="outline"
                      fullWidth
                      iconName="RefreshCw"
                      iconPosition="left"
                      onClick={handleGenerate}>

                        Regenerate Video
                      </Button>
                      <Button
                      variant="default"
                      fullWidth
                      iconName="Download"
                      iconPosition="left"
                      onClick={() => setActiveTab('export')}>

                        Export Video
                      </Button>
                    </div>
                  </div>

                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          Video Generated Successfully
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Your construction AI advertisement is ready for export and distribution across platforms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          {activeTab === 'export' &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <ExportOptions
                videoData={videoData}
                onExport={handleExport}
                onYouTubeUpload={handleYouTubeUpload} />

              </div>
              <div className="lg:col-span-1">
                <VideoPreview
                videoData={videoData}
                isGenerating={false}
                progress={100} />

              </div>
            </div>
          }
        </div>
      </main>
    </div>);

};

export default VideoAdCreator;