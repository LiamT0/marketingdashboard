import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Generate Content',
      description: 'Create AI-powered LinkedIn posts',
      icon: 'FileText',
      color: 'primary',
      path: '/content-generator'
    },
    {
      title: 'Create Video Ad',
      description: 'Generate engaging video advertisements',
      icon: 'Video',
      color: 'accent',
      path: '/video-ad-creator'
    },
    {
      title: 'Manage Leads',
      description: 'View and qualify new leads',
      icon: 'Users',
      color: 'success',
      path: '/lead-management'
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions?.map((action) => (
        <div
          key={action?.path}
          className="bg-card border border-border rounded-lg p-6 shadow-elevation-sm hover:shadow-elevation-md transition-smooth cursor-pointer group"
          onClick={() => handleActionClick(action?.path)}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${action?.color}/10 group-hover:bg-${action?.color}/20 transition-smooth`}>
              <Icon name={action?.icon} size={24} color={`var(--color-${action?.color})`} />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-smooth">
                {action?.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {action?.description}
              </p>
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={(e) => {
                  e?.stopPropagation();
                  handleActionClick(action?.path);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;