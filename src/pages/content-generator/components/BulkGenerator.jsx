import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BulkGenerator = ({ onBulkGenerate }) => {
  const [variationCount, setVariationCount] = useState('3');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    const count = parseInt(variationCount);
    if (count >= 1 && count <= 10) {
      setIsGenerating(true);
      setTimeout(() => {
        onBulkGenerate(count);
        setIsGenerating(false);
      }, 1500);
    }
  };

  const mockVariations = [
    {
      id: 1,
      preview: "🏗️ Remember when construction sites ran without electricity? Neither do we. That's because early adopters...",
      score: 92,
      estimatedReach: '2,800'
    },
    {
      id: 2,
      preview: "The construction industry is at a crossroads. Just like electricity transformed building in 1900s...",
      score: 88,
      estimatedReach: '2,600'
    },
    {
      id: 3,
      preview: "AI in construction isn't the future—it's happening now. Companies adopting AI are seeing 35% efficiency...",
      score: 90,
      estimatedReach: '2,750'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Copy" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground text-base md:text-lg">Bulk Generation</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Create multiple post variations</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              label="Number of Variations"
              type="number"
              min="1"
              max="10"
              value={variationCount}
              onChange={(e) => setVariationCount(e?.target?.value)}
              description="Generate 1-10 variations at once"
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="default"
              size="default"
              iconName="Zap"
              onClick={handleGenerate}
              loading={isGenerating}
              disabled={!variationCount || parseInt(variationCount) < 1 || parseInt(variationCount) > 10}
            >
              Generate
            </Button>
          </div>
        </div>

        {mockVariations?.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Generated Variations</p>
              <span className="text-xs text-muted-foreground">{mockVariations?.length} posts</span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {mockVariations?.map((variation) => (
                <div
                  key={variation?.id}
                  className="bg-muted/50 rounded-lg p-3 hover:bg-muted transition-smooth cursor-pointer border border-transparent hover:border-primary/20"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-xs md:text-sm text-foreground line-clamp-2 flex-1">
                      {variation?.preview}
                    </p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Icon name="TrendingUp" size={12} color="var(--color-success)" />
                      <span className="text-xs font-medium text-success">{variation?.score}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Est. Reach: {variation?.estimatedReach}</span>
                    <div className="flex gap-2">
                      <button className="hover:text-foreground transition-smooth">
                        <Icon name="Eye" size={14} />
                      </button>
                      <button className="hover:text-foreground transition-smooth">
                        <Icon name="Edit" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Icon name="Zap" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs md:text-sm font-medium text-foreground mb-1">A/B Testing Ready</p>
              <p className="text-xs text-muted-foreground">
                Test multiple variations to find the highest-performing content for your audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkGenerator;