import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location?.pathname?.split('/')?.filter((x) => x);

  const breadcrumbMap = {
    'dashboard': 'Dashboard',
    'content-generator': 'Content Generator',
    'video-ad-creator': 'Video Ad Creator',
    'lead-management': 'Lead Management',
    'social-media-manager': 'Social Media Manager',
    'analytics-dashboard': 'Analytics Dashboard'
  };

  if (pathnames?.length === 0 || location?.pathname === '/dashboard') {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
      <Link
        to="/dashboard"
        className="text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1"
      >
        <Icon name="Home" size={16} />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>
      {pathnames?.map((value, index) => {
        const to = `/${pathnames?.slice(0, index + 1)?.join('/')}`;
        const isLast = index === pathnames?.length - 1;
        const label = breadcrumbMap?.[value] || value;

        return (
          <React.Fragment key={to}>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            {isLast ? (
              <span className="text-foreground font-medium">{label}</span>
            ) : (
              <Link
                to={to}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;