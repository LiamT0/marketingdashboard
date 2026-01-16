import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplateCard = ({ template, onSelect, isSelected }) => {
  return (
    <div
      className={`bg-card border-2 rounded-lg overflow-hidden transition-smooth cursor-pointer group ${
        isSelected ? 'border-primary shadow-elevation-md' : 'border-border hover:border-primary/50 shadow-elevation-sm hover:shadow-elevation-md'
      }`}
      onClick={() => onSelect(template)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={template?.thumbnail}
          alt={template?.thumbnailAlt}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
        {template?.isPopular && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Icon name="TrendingUp" size={14} />
            <span>Popular</span>
          </div>
        )}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={24} color="var(--color-primary-foreground)" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-heading font-semibold text-foreground text-base md:text-lg line-clamp-1">
            {template?.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
            <Icon name="Clock" size={16} />
            <span className="text-sm whitespace-nowrap">{template?.duration}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {template?.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Icon name="Eye" size={16} />
              <span className="text-xs md:text-sm">{template?.views}</span>
            </div>
            <div className="flex items-center gap-1 text-success">
              <Icon name="ThumbsUp" size={16} />
              <span className="text-xs md:text-sm">{template?.rating}</span>
            </div>
          </div>
          
          <Button
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            iconName={isSelected ? 'Check' : 'Play'}
            iconPosition="left"
            onClick={(e) => {
              e?.stopPropagation();
              onSelect(template);
            }}
          >
            {isSelected ? 'Selected' : 'Preview'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;