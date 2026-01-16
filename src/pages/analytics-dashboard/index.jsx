import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricCard from './components/MetricCard';
import PerformanceChart from './components/PerformanceChart';
import CampaignPerformanceTable from './components/CampaignPerformanceTable';
import DateRangeSelector from './components/DateRangeSelector';
import InsightCard from './components/InsightCard';
import ExportReportModal from './components/ExportReportModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AnalyticsDashboard = () => {
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('30days');

  const keyMetrics = [
    {
      title: "Total Leads Generated",
      value: "2,847",
      change: "+18.2%",
      changeType: "positive",
      icon: "Users",
      iconColor: "primary",
      trend: true
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: "+5.3%",
      changeType: "positive",
      icon: "TrendingUp",
      iconColor: "success",
      trend: true
    },
    {
      title: "Average ROI",
      value: "342%",
      change: "+12.7%",
      changeType: "positive",
      icon: "DollarSign",
      iconColor: "accent",
      trend: true
    },
    {
      title: "Cost Per Lead",
      value: "$42.50",
      change: "-8.4%",
      changeType: "positive",
      icon: "Target",
      iconColor: "primary",
      trend: true
    }
  ];

  const leadGenerationData = [
    { name: "Jan", LinkedIn: 245, Facebook: 180, Twitter: 95 },
    { name: "Feb", LinkedIn: 312, Facebook: 220, Twitter: 125 },
    { name: "Mar", LinkedIn: 389, Facebook: 265, Twitter: 148 },
    { name: "Apr", LinkedIn: 445, Facebook: 298, Twitter: 172 },
    { name: "May", LinkedIn: 523, Facebook: 342, Twitter: 195 },
    { name: "Jun", LinkedIn: 598, Facebook: 385, Twitter: 218 }
  ];

  const engagementData = [
    { name: "Week 1", Posts: 45, Videos: 28, Engagement: 3200 },
    { name: "Week 2", Posts: 52, Videos: 32, Engagement: 3850 },
    { name: "Week 3", Posts: 48, Videos: 35, Engagement: 4100 },
    { name: "Week 4", Posts: 61, Videos: 42, Engagement: 4750 }
  ];

  const roiData = [
    { name: "Jan", Revenue: 45000, Cost: 12000, ROI: 275 },
    { name: "Feb", Revenue: 52000, Cost: 13500, ROI: 285 },
    { name: "Mar", Revenue: 61000, Cost: 15000, ROI: 307 },
    { name: "Apr", Revenue: 68000, Cost: 16200, ROI: 320 },
    { name: "May", Revenue: 78000, Cost: 18000, ROI: 333 },
    { name: "Jun", Revenue: 89000, Cost: 19500, ROI: 356 }
  ];

  const campaigns = [
    {
      id: 1,
      name: "AI Construction Revolution",
      platform: "LinkedIn",
      platformIcon: "Linkedin",
      leads: 1247,
      conversions: 312,
      roi: "+385%",
      status: "Active"
    },
    {
      id: 2,
      name: "Video Ad Series Q2",
      platform: "YouTube",
      platformIcon: "Youtube",
      leads: 892,
      conversions: 198,
      roi: "+298%",
      status: "Active"
    },
    {
      id: 3,
      name: "Facebook Lead Gen",
      platform: "Facebook",
      platformIcon: "Facebook",
      leads: 654,
      conversions: 145,
      roi: "+245%",
      status: "Active"
    },
    {
      id: 4,
      name: "Twitter Engagement",
      platform: "Twitter",
      platformIcon: "Twitter",
      leads: 423,
      conversions: 89,
      roi: "+187%",
      status: "Paused"
    },
    {
      id: 5,
      name: "LinkedIn Automation Test",
      platform: "LinkedIn",
      platformIcon: "Linkedin",
      leads: 356,
      conversions: 78,
      roi: "+165%",
      status: "Completed"
    }
  ];

  const insights = [
    {
      title: "Peak Engagement Time Detected",
      description: "Your LinkedIn posts receive 43% more engagement when published between 9-11 AM EST on Tuesdays and Wednesdays. Consider scheduling more content during these windows.",
      type: "optimization",
      priority: "high",
      actionLabel: "Adjust Schedule"
    },
    {
      title: "Video Ad Performance Surge",
      description: "Video advertisements are generating 2.3x more qualified leads compared to static content. Allocate more budget to video production for maximum ROI.",
      type: "success",
      priority: "medium",
      actionLabel: "View Details"
    },
    {
      title: "Chatbot Response Rate Declining",
      description: "LinkedIn chatbot response rate has dropped 15% this week. Review automated responses and update conversation flows to maintain lead quality.",
      type: "warning",
      priority: "high",
      actionLabel: "Review Chatbot"
    },
    {
      title: "Competitor Analysis Available",
      description: "New competitor benchmarking data shows opportunities in untapped construction AI segments. Review detailed analysis for strategic positioning.",
      type: "optimization",
      priority: "medium",
      actionLabel: "View Analysis"
    }
  ];

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
    console.log('Date range changed to:', range);
  };

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - AI Media Automation Suite</title>
        <meta name="description" content="Comprehensive performance tracking and ROI analysis for social media automation, lead generation, and video advertising campaigns" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <Breadcrumb />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Track performance, analyze ROI, and optimize your campaigns
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh Data
                </Button>
                <Button
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => setExportModalOpen(true)}
                >
                  Export Report
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <DateRangeSelector onRangeChange={handleDateRangeChange} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {keyMetrics?.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <PerformanceChart
                title="Lead Generation Trends"
                data={leadGenerationData}
                type="area"
                dataKeys={["LinkedIn", "Facebook", "Twitter"]}
                colors={["var(--color-primary)", "var(--color-accent)", "var(--color-success)"]}
                height={300}
              />
              <PerformanceChart
                title="Content Performance"
                data={engagementData}
                type="bar"
                dataKeys={["Posts", "Videos", "Engagement"]}
                colors={["var(--color-primary)", "var(--color-accent)", "var(--color-success)"]}
                height={300}
              />
            </div>

            <div className="mb-6 md:mb-8">
              <PerformanceChart
                title="Revenue & ROI Analysis"
                data={roiData}
                type="line"
                dataKeys={["Revenue", "Cost", "ROI"]}
                colors={["var(--color-success)", "var(--color-error)", "var(--color-accent)"]}
                height={350}
              />
            </div>

            <div className="mb-6 md:mb-8">
              <CampaignPerformanceTable campaigns={campaigns} />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
                </div>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                  AI-Powered Insights & Recommendations
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {insights?.map((insight, index) => (
                  <InsightCard key={index} {...insight} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <ExportReportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </>
  );
};

export default AnalyticsDashboard;