import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContentPreview = ({ generatedContent, onRegenerate, onSchedule, onSaveTemplate }) => {
  const calculateEngagementScore = (content) => {
    if (!content) return 0;
    const hasHashtags = content?.includes('#');
    const hasEmojis = /[\u{1F300}-\u{1F9FF}]/u?.test(content);
    const wordCount = content?.split(/\s+/)?.length;
    const hasCallToAction = /\b(learn|discover|explore|join|contact|visit)\b/i?.test(content);

    let score = 60;
    if (hasHashtags) score += 10;
    if (hasEmojis) score += 5;
    if (wordCount >= 100 && wordCount <= 300) score += 15;
    if (hasCallToAction) score += 10;

    return Math.min(score, 100);
  };

  const engagementScore = calculateEngagementScore(generatedContent);
  const characterCount = generatedContent ? generatedContent?.length : 0;
  const wordCount = generatedContent ? generatedContent?.split(/\s+/)?.length : 0;

  const mockMetrics = {
    estimatedReach: '2,500-3,200',
    estimatedEngagement: '180-240',
    estimatedClicks: '45-65',
    bestPostTime: 'Tuesday, 9:00 AM EST'
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm h-full flex flex-col">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground text-base md:text-lg">Content Preview</h3>
              <p className="text-xs md:text-sm text-muted-foreground">LinkedIn post preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            engagementScore >= 80 ? 'bg-success/10 text-success' :
            engagementScore >= 60 ? 'bg-accent/10 text-accent' : 'bg-error/10 text-error'}`
            }>
              {engagementScore}% Score
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Characters</p>
            <p className="text-lg md:text-xl font-semibold text-foreground data-text">{characterCount}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Words</p>
            <p className="text-lg md:text-xl font-semibold text-foreground data-text">{wordCount}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Est. Reach</p>
            <p className="text-sm md:text-base font-semibold text-foreground data-text">{mockMetrics?.estimatedReach}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Est. Engagement</p>
            <p className="text-sm md:text-base font-semibold text-foreground data-text">{mockMetrics?.estimatedEngagement}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {generatedContent ?
        <div className="bg-background rounded-lg border border-border p-4 md:p-6">
            <div className="flex items-start gap-3 mb-4">
              <Image
              src="https://img.rocket.new/generatedImages/rocket_gen_img_1dedfe473-1763295924083.png"
              alt="Professional headshot of construction business owner in hard hat and safety vest at construction site"
              className="w-12 h-12 rounded-full object-cover" />

              <div className="flex-1">
                <p className="font-medium text-foreground text-sm md:text-base">Your Company Name</p>
                <p className="text-xs text-muted-foreground">Construction AI Solutions • 1st</p>
                <p className="text-xs text-muted-foreground mt-1">Just now • 🌐</p>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-sm md:text-base text-foreground whitespace-pre-wrap leading-relaxed">
                {generatedContent}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Icon name="ThumbsUp" size={14} />
                    {mockMetrics?.estimatedEngagement?.split('-')?.[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="MessageCircle" size={14} />
                    {Math.floor(parseInt(mockMetrics?.estimatedEngagement?.split('-')?.[0]) * 0.3)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Repeat2" size={14} />
                    {Math.floor(parseInt(mockMetrics?.estimatedEngagement?.split('-')?.[0]) * 0.2)}
                  </span>
                </div>
              </div>
            </div>
          </div> :

        <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Icon name="FileText" size={32} color="var(--color-muted-foreground)" />
            </div>
            <h4 className="font-heading font-semibold text-foreground mb-2 text-base md:text-lg">No Content Generated</h4>
            <p className="text-sm text-muted-foreground max-w-sm">
              Select your topic and prompt settings, then click "Generate Content" to create your LinkedIn post.
            </p>
          </div>
        }
      </div>
      {generatedContent &&
      <div className="p-4 md:p-6 border-t border-border">
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <Icon name="Clock" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs md:text-sm font-medium text-foreground">Optimal Posting Time</p>
                <p className="text-xs text-muted-foreground">{mockMetrics?.bestPostTime}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
            variant="default"
            size="sm"
            iconName="Calendar"
            onClick={onSchedule}
            fullWidth>

              Schedule Post
            </Button>
            <Button
            variant="outline"
            size="sm"
            iconName="Save"
            onClick={onSaveTemplate}
            fullWidth>

              Save Template
            </Button>
            <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            onClick={onRegenerate}
            fullWidth>

              Regenerate
            </Button>
          </div>
        </div>
      }
    </div>);

};

export default ContentPreview;