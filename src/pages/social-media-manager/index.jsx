import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AccountCard from './components/AccountCard';
import ContentCalendar from './components/ContentCalendar';
import PerformanceMetrics from './components/PerformanceMetrics';
import AutomationSettings from './components/AutomationSettings';
import BulkScheduler from './components/BulkScheduler';

const SocialMediaManager = () => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [showBulkScheduler, setShowBulkScheduler] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const socialAccounts = [
    {
      id: 1,
      platform: "LinkedIn",
      accountName: "AI Construction Solutions",
      status: "connected",
      followers: 12847,
      postsThisMonth: 24,
      engagementRate: 8.4,
      lastPost: "2 hours ago"
    },
    {
      id: 2,
      platform: "Facebook",
      accountName: "BuildTech AI",
      status: "connected",
      followers: 8532,
      postsThisMonth: 18,
      engagementRate: 6.2,
      lastPost: "5 hours ago"
    },
    {
      id: 3,
      platform: "Twitter",
      accountName: "@AIConstruction",
      status: "error",
      errorMessage: "Authentication token expired. Please reconnect your account."
    }
  ];

  const scheduledPosts = [
    {
      id: 1,
      content: "How AI is revolutionizing construction project management in 2026. Learn about the latest automation tools that are saving contractors 40% on project timelines.",
      scheduledTime: "2026-01-16T14:00:00",
      platforms: ["LinkedIn", "Facebook"],
      status: "scheduled"
    },
    {
      id: 2,
      content: "Case Study: Construction firm reduces costs by $2.3M annually using AI-powered resource optimization. Download our free whitepaper to learn their strategy.",
      scheduledTime: "2026-01-17T09:30:00",
      platforms: ["LinkedIn", "Twitter"],
      status: "scheduled"
    },
    {
      id: 3,
      content: "AI adoption in construction is following the same trajectory as electricity did 100 years ago. Are you ready for the transformation?",
      scheduledTime: "2026-01-17T16:00:00",
      platforms: ["LinkedIn", "Facebook", "Twitter"],
      status: "scheduled"
    },
    {
      id: 4,
      content: "New video: Watch how AI-powered drones are conducting site inspections 10x faster than traditional methods. Link in bio.",
      scheduledTime: "2026-01-18T11:00:00",
      platforms: ["Facebook", "Twitter"],
      status: "scheduled"
    },
    {
      id: 5,
      content: "Join our webinar: 'AI Implementation Roadmap for Construction Companies' - January 25th, 2026. Register now for early bird pricing.",
      scheduledTime: "2026-01-19T10:00:00",
      platforms: ["LinkedIn"],
      status: "scheduled"
    }
  ];

  const performanceMetrics = [
    {
      title: "Total Reach",
      value: 145832,
      change: 12.5,
      icon: "Users",
      color: "primary"
    },
    {
      title: "Engagement Rate",
      value: "7.8%",
      change: 3.2,
      icon: "TrendingUp",
      color: "success"
    },
    {
      title: "New Followers",
      value: 2847,
      change: 18.4,
      icon: "UserPlus",
      color: "accent"
    },
    {
      title: "Posts Published",
      value: 42,
      change: -5.2,
      icon: "FileText",
      color: "secondary"
    }
  ];

  const platformComparison = [
    { platform: "LinkedIn", engagement: 8400, reach: 52000 },
    { platform: "Facebook", engagement: 6200, reach: 48000 },
    { platform: "Twitter", engagement: 4800, reach: 45832 }
  ];

  const engagementTrends = [
    { date: "Jan 1", likes: 420, comments: 85, shares: 42 },
    { date: "Jan 5", likes: 580, comments: 120, shares: 68 },
    { date: "Jan 10", likes: 720, comments: 145, shares: 92 },
    { date: "Jan 15", likes: 890, comments: 178, shares: 115 },
    { date: "Jan 16", likes: 950, comments: 195, shares: 128 }
  ];

  const automationSettings = {
    autoPostingEnabled: true,
    postingFrequency: "twice-daily",
    timeZone: "EST",
    preferredTime: "09:00",
    autoResponseEnabled: true,
    responseDelay: "15min",
    greetingMessage: "Thank you for connecting! I\'d love to discuss how AI can transform your construction business.",
    requireApproval: false,
    approvalNotifications: true,
    crossPostEnabled: true,
    platformOptimization: true
  };

  const handleConnect = (account) => {
    console.log("Connecting account:", account);
  };

  const handleDisconnect = (account) => {
    console.log("Disconnecting account:", account);
  };

  const handleAccountSettings = (account) => {
    console.log("Opening settings for:", account);
  };

  const handleReschedule = (post) => {
    console.log("Rescheduling post:", post);
  };

  const handleEditPost = (post) => {
    console.log("Editing post:", post);
  };

  const handleDeletePost = (post) => {
    console.log("Deleting post:", post);
  };

  const handleSaveSettings = (settings) => {
    console.log("Saving settings:", settings);
    setShowSettings(false);
  };

  const handleBulkSchedule = (data) => {
    console.log("Bulk scheduling:", data);
    setShowBulkScheduler(false);
  };

  const tabs = [
    { id: 'accounts', label: 'Accounts', icon: 'Link' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <Breadcrumb />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                Social Media Manager
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Manage your social media presence across multiple platforms
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                iconPosition="left"
                onClick={() => setShowSettings(!showSettings)}
              >
                Automation
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="CalendarPlus"
                iconPosition="left"
                onClick={() => setShowBulkScheduler(!showBulkScheduler)}
              >
                Bulk Schedule
              </Button>
            </div>
          </div>

          {showBulkScheduler && (
            <div className="mb-6">
              <BulkScheduler
                onSchedule={handleBulkSchedule}
                onCancel={() => setShowBulkScheduler(false)}
              />
            </div>
          )}

          {showSettings && (
            <div className="mb-6">
              <AutomationSettings
                settings={automationSettings}
                onSave={handleSaveSettings}
              />
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center gap-2 border-b border-border overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-smooth whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab?.id
                      ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span className="text-sm md:text-base">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {activeTab === 'accounts' && (
              <>
                <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="Info" size={20} className="text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Connect your social media accounts to enable automated posting and engagement tracking
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {socialAccounts?.map((account) => (
                    <AccountCard
                      key={account?.id}
                      account={account}
                      onConnect={handleConnect}
                      onDisconnect={handleDisconnect}
                      onSettings={handleAccountSettings}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === 'calendar' && (
              <ContentCalendar
                scheduledPosts={scheduledPosts}
                onReschedule={handleReschedule}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
              />
            )}

            {activeTab === 'analytics' && (
              <PerformanceMetrics
                metrics={performanceMetrics}
                platformComparison={platformComparison}
                engagementTrends={engagementTrends}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SocialMediaManager;