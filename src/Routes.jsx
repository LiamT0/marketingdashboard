import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SocialMediaManager from './pages/social-media-manager';
import AnalyticsDashboard from './pages/analytics-dashboard';
import VideoAdCreator from './pages/video-ad-creator';
import Dashboard from './pages/dashboard';
import LeadManagement from './pages/lead-management';
import ContentGenerator from './pages/content-generator';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/social-media-manager" element={<SocialMediaManager />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/video-ad-creator" element={<VideoAdCreator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lead-management" element={<LeadManagement />} />
        <Route path="/content-generator" element={<ContentGenerator />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
