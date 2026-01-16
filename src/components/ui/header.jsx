import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Content', path: '/content-generator', icon: 'FileText' },
    { label: 'Leads', path: '/lead-management', icon: 'Users' },
    { label: 'Social', path: '/social-media-manager', icon: 'Share2' },
    { label: 'Analytics', path: '/analytics-dashboard', icon: 'BarChart3' }
  ];

  const notifications = [
    { id: 1, type: 'lead', message: '3 new qualified leads', time: '5 min ago', unread: true },
    { id: 2, type: 'content', message: 'Video ad rendering complete', time: '15 min ago', unread: true },
    { id: 3, type: 'system', message: 'LinkedIn post scheduled successfully', time: '1 hour ago', unread: false }
  ];

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  const isActive = (path) => {
    if (path === '/content-generator') {
      return location?.pathname === '/content-generator' || location?.pathname === '/video-ad-creator';
    }
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-navigation bg-card shadow-elevation-md">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center transition-smooth hover:bg-primary/20">
                <Icon name="Zap" size={24} color="var(--color-primary)" />
              </div>
              <span className="font-heading font-semibold text-xl text-foreground hidden sm:block">
                AI Media Suite
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth font-medium ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleNotifications}
                className="relative"
              >
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {notificationOpen && (
                <>
                  <div
                    className="fixed inset-0 z-dropdown"
                    onClick={toggleNotifications}
                  />
                  <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-elevation-lg z-dropdown overflow-hidden">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-heading font-semibold text-foreground">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications?.map((notification) => (
                        <div
                          key={notification?.id}
                          className={`p-4 border-b border-border transition-smooth hover:bg-muted cursor-pointer ${
                            notification?.unread ? 'bg-accent/5' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${notification?.unread ? 'bg-accent' : 'bg-muted'}`} />
                            <div className="flex-1">
                              <p className="text-sm text-foreground">{notification?.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-border">
                      <Button variant="ghost" size="sm" fullWidth>
                        View all notifications
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMobileMenu}
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </Button>
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-background z-navigation lg:hidden"
            onClick={toggleMobileMenu}
          />
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-card z-navigation lg:hidden overflow-y-auto">
            <nav className="p-6 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={toggleMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth font-medium ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;