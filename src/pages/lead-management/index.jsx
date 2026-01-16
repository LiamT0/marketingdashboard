import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import LeadFilters from './components/LeadFilters';
import LeadScoreCard from './components/LeadScoreCard';
import ConversionFunnel from './components/ConversionFunnel';
import LeadTableRow from './components/LeadTableRow';
import NurturingWorkflows from './components/NurturingWorkflows';
import BulkActionsBar from './components/BulkActionsBar';
import LeadMobileCard from './components/LeadMobileCard';

const LeadManagement = () => {
  const [filters, setFilters] = useState({
    search: '',
    source: 'all',
    qualification: 'all',
    stage: 'all',
    dateFrom: '',
    dateTo: '',
    tags: []
  });

  const [selectedLeads, setSelectedLeads] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'desc' });

  const mockLeads = [
  {
    id: 1,
    name: "Michael Rodriguez",
    company: "Rodriguez Construction LLC",
    email: "michael.r@rodriguezconst.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_111de63eb-1763293804928.png",
    avatarAlt: "Professional headshot of Hispanic man with short black hair wearing navy blue suit and white shirt in office setting",
    source: "LinkedIn",
    sourceIcon: "Linkedin",
    score: 92,
    qualification: "hot",
    stage: "qualified",
    lastContact: "2026-01-15T10:30:00",
    tags: ["AI Adoption", "Cost Saving", "Technology"],
    interactions: [
    {
      type: "email",
      content: "Responded positively to AI cost-saving case study. Requested detailed ROI analysis for their 50-person construction team.",
      date: "2026-01-15T10:30:00"
    },
    {
      type: "call",
      content: "30-minute discovery call discussing current project management challenges and AI automation opportunities.",
      date: "2026-01-14T14:00:00"
    },
    {
      type: "chat",
      content: "Engaged with LinkedIn chatbot about AI vs traditional methods comparison. Asked specific questions about implementation timeline.",
      date: "2026-01-13T16:45:00"
    }],

    aiRecommendation: "Schedule demo call within 48 hours. High engagement score indicates strong purchase intent. Prepare custom ROI calculator for their team size."
  },
  {
    id: 2,
    name: "Sarah Chen",
    company: "Chen & Associates Builders",
    email: "sarah@chenbuilders.com",
    phone: "+1 (555) 876-5432",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10d60e496-1763295319842.png",
    avatarAlt: "Professional headshot of Asian woman with long black hair wearing gray blazer and white blouse in modern office",
    source: "Chatbot",
    sourceIcon: "MessageSquare",
    score: 85,
    qualification: "hot",
    stage: "proposal",
    lastContact: "2026-01-14T15:20:00",
    tags: ["Efficiency", "Consultation", "AI Adoption"],
    interactions: [
    {
      type: "chat",
      content: "Completed full chatbot qualification flow. Expressed interest in AI-powered project scheduling and resource allocation tools.",
      date: "2026-01-14T15:20:00"
    },
    {
      type: "email",
      content: "Downloaded construction AI adoption whitepaper. Opened email 3 times and clicked on pricing page link.",
      date: "2026-01-13T09:15:00"
    }],

    aiRecommendation: "Send customized proposal focusing on project scheduling automation. Mention 40% time savings achieved by similar-sized firms."
  },
  {
    id: 3,
    name: "James Thompson",
    company: "Thompson Residential Contractors",
    email: "james.t@thompsonrc.com",
    phone: "+1 (555) 345-6789",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116c94415-1763295713677.png",
    avatarAlt: "Professional headshot of Caucasian man with gray hair and beard wearing blue denim shirt in construction site background",
    source: "Facebook",
    sourceIcon: "Facebook",
    score: 68,
    qualification: "warm",
    stage: "contacted",
    lastContact: "2026-01-12T11:45:00",
    tags: ["Cost Saving", "Technology"],
    interactions: [
    {
      type: "email",
      content: "Opened AI adoption comparison email. Clicked on video testimonial from construction company owner.",
      date: "2026-01-12T11:45:00"
    },
    {
      type: "chat",
      content: "Brief Facebook Messenger conversation about AI implementation costs. Concerned about training requirements for existing team.",
      date: "2026-01-11T16:30:00"
    }],

    aiRecommendation: "Address training concerns with case study showing 2-week onboarding success. Offer free training session for decision-makers."
  },
  {
    id: 4,
    name: "Emily Martinez",
    company: "Martinez Commercial Construction",
    email: "emily@martinezcommercial.com",
    phone: "+1 (555) 567-8901",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17a2808ab-1763299617889.png",
    avatarAlt: "Professional headshot of Hispanic woman with brown hair in ponytail wearing yellow hard hat and safety vest at construction site",
    source: "LinkedIn",
    sourceIcon: "Linkedin",
    score: 78,
    qualification: "warm",
    stage: "qualified",
    lastContact: "2026-01-13T14:00:00",
    tags: ["AI Adoption", "Efficiency", "Consultation"],
    interactions: [
    {
      type: "call",
      content: "45-minute consultation call discussing AI integration with existing project management software. Interested in pilot program.",
      date: "2026-01-13T14:00:00"
    },
    {
      type: "email",
      content: "Requested information about AI-powered safety monitoring systems for commercial construction sites.",
      date: "2026-01-12T10:20:00"
    }],

    aiRecommendation: "Propose 30-day pilot program for one active project. Highlight safety monitoring ROI and compliance benefits for commercial work."
  },
  {
    id: 5,
    name: "David Kim",
    company: "Kim Brothers Construction",
    email: "david@kimbrothers.com",
    phone: "+1 (555) 789-0123",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d29504f2-1763294463041.png",
    avatarAlt: "Professional headshot of Asian man with short black hair wearing white hard hat and orange safety vest smiling at camera",
    source: "Twitter/X",
    sourceIcon: "Twitter",
    score: 55,
    qualification: "cold",
    stage: "new",
    lastContact: "2026-01-11T09:30:00",
    tags: ["Technology"],
    interactions: [
    {
      type: "chat",
      content: "Responded to Twitter/X ad about AI in construction. Asked basic questions about what AI can do for small construction businesses.",
      date: "2026-01-11T09:30:00"
    }],

    aiRecommendation: "Send educational content series about AI basics in construction. Focus on small business success stories and affordable entry points."
  },
  {
    id: 6,
    name: "Lisa Anderson",
    company: "Anderson Remodeling & Design",
    email: "lisa@andersonremodel.com",
    phone: "+1 (555) 901-2345",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bee296a5-1763293974196.png",
    avatarAlt: "Professional headshot of Caucasian woman with blonde hair wearing black blazer and pearl necklace in bright office setting",
    source: "Website",
    sourceIcon: "Globe",
    score: 88,
    qualification: "hot",
    stage: "negotiation",
    lastContact: "2026-01-15T16:45:00",
    tags: ["AI Adoption", "Cost Saving", "Efficiency", "Consultation"],
    interactions: [
    {
      type: "email",
      content: "Negotiating contract terms for AI implementation across 3 active remodeling projects. Requested custom pricing for annual subscription.",
      date: "2026-01-15T16:45:00"
    },
    {
      type: "call",
      content: "Contract review call with decision-makers. Discussed implementation timeline and support requirements.",
      date: "2026-01-15T13:00:00"
    },
    {
      type: "email",
      content: "Downloaded all product documentation and technical specifications. Shared with IT consultant for review.",
      date: "2026-01-14T11:20:00"
    }],

    aiRecommendation: "Prepare final proposal with volume discount for multiple projects. Emphasize dedicated account manager and priority support."
  },
  {
    id: 7,
    name: "Robert Johnson",
    company: "Johnson Infrastructure Solutions",
    email: "robert@johnsoninfra.com",
    phone: "+1 (555) 012-3456",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18d854688-1763295573707.png",
    avatarAlt: "Professional headshot of African American man with short hair wearing blue button-down shirt and glasses in office environment",
    source: "LinkedIn",
    sourceIcon: "Linkedin",
    score: 72,
    qualification: "warm",
    stage: "contacted",
    lastContact: "2026-01-14T10:15:00",
    tags: ["Technology", "Efficiency"],
    interactions: [
    {
      type: "email",
      content: "Responded to LinkedIn outreach about AI for infrastructure projects. Interested in learning more about large-scale implementation.",
      date: "2026-01-14T10:15:00"
    },
    {
      type: "chat",
      content: "LinkedIn chat discussion about AI applications in civil engineering and infrastructure development.",
      date: "2026-01-13T15:40:00"
    }],

    aiRecommendation: "Schedule technical demo focusing on infrastructure-specific AI capabilities. Prepare case studies from civil engineering projects."
  },
  {
    id: 8,
    name: "Maria Garcia",
    company: "Garcia Family Builders",
    email: "maria@garciafamilybuilders.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a36548bd-1763296665300.png",
    avatarAlt: "Professional headshot of Hispanic woman with curly brown hair wearing red blouse and gold earrings smiling warmly at camera",
    source: "Chatbot",
    sourceIcon: "MessageSquare",
    score: 45,
    qualification: "cold",
    stage: "new",
    lastContact: "2026-01-10T14:30:00",
    tags: ["Cost Saving"],
    interactions: [
    {
      type: "chat",
      content: "Initial chatbot interaction asking about pricing. Concerned about upfront costs for small family business.",
      date: "2026-01-10T14:30:00"
    }],

    aiRecommendation: "Send information about flexible payment plans and small business packages. Include ROI calculator showing break-even timeline."
  }];


  const mockFunnelData = {
    new: 156,
    contacted: 98,
    qualified: 67,
    proposal: 34,
    closed: 23
  };

  const mockWorkflows = [
  {
    id: 1,
    name: "New Lead Nurturing",
    description: "Automated email sequence for newly acquired leads with educational content about AI in construction",
    status: "active",
    enrolled: 45,
    completed: 12,
    conversionRate: 26,
    avgDuration: "12 days"
  },
  {
    id: 2,
    name: "Hot Lead Fast Track",
    description: "Accelerated follow-up sequence for high-scoring leads with immediate demo scheduling",
    status: "active",
    enrolled: 23,
    completed: 15,
    conversionRate: 65,
    avgDuration: "5 days"
  },
  {
    id: 3,
    name: "Re-engagement Campaign",
    description: "Win-back sequence for cold leads with new case studies and success stories",
    status: "paused",
    enrolled: 67,
    completed: 8,
    conversionRate: 12,
    avgDuration: "21 days"
  }];


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      source: 'all',
      qualification: 'all',
      stage: 'all',
      dateFrom: '',
      dateTo: '',
      tags: []
    });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedLeads(filteredAndSortedLeads?.map((lead) => lead?.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (leadId, checked) => {
    if (checked) {
      setSelectedLeads((prev) => [...prev, leadId]);
    } else {
      setSelectedLeads((prev) => prev?.filter((id) => id !== leadId));
    }
  };

  const handleExport = () => {
    console.log('Exporting leads:', selectedLeads);
    alert(`Exporting ${selectedLeads?.length} leads to CSV...`);
  };

  const handleAssignWorkflow = (workflowId) => {
    console.log('Assigning workflow:', workflowId);
    alert('Workflow assigned successfully!');
  };

  const handleUpdateStatus = () => {
    console.log('Updating status for leads:', selectedLeads);
    alert('Lead status updated successfully!');
  };

  const handleSendEmail = (leadId) => {
    console.log('Sending email to lead:', leadId);
    alert('Email composer opened');
  };

  const handleScheduleMeeting = (leadId) => {
    console.log('Scheduling meeting with lead:', leadId);
    alert('Calendar scheduling opened');
  };

  const filteredAndSortedLeads = useMemo(() => {
    let filtered = mockLeads?.filter((lead) => {
      const matchesSearch = filters?.search === '' ||
      lead?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      lead?.email?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      lead?.company?.toLowerCase()?.includes(filters?.search?.toLowerCase());

      const matchesSource = filters?.source === 'all' ||
      lead?.source?.toLowerCase() === filters?.source?.toLowerCase();

      const matchesQualification = filters?.qualification === 'all' ||
      lead?.qualification === filters?.qualification;

      const matchesStage = filters?.stage === 'all' ||
      lead?.stage === filters?.stage;

      const matchesTags = filters?.tags?.length === 0 ||
      filters?.tags?.some((tag) => lead?.tags?.includes(tag));

      const matchesDateFrom = !filters?.dateFrom ||
      new Date(lead.lastContact) >= new Date(filters.dateFrom);

      const matchesDateTo = !filters?.dateTo ||
      new Date(lead.lastContact) <= new Date(filters.dateTo);

      return matchesSearch && matchesSource && matchesQualification &&
      matchesStage && matchesTags && matchesDateFrom && matchesDateTo;
    });

    filtered?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'lastContact') {
        return sortConfig?.direction === 'asc' ?
        new Date(aValue) - new Date(bValue) :
        new Date(bValue) - new Date(aValue);
      }

      if (typeof aValue === 'string') {
        return sortConfig?.direction === 'asc' ?
        aValue?.localeCompare(bValue) :
        bValue?.localeCompare(aValue);
      }

      return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [mockLeads, filters, sortConfig]);

  const topLead = mockLeads?.reduce((prev, current) =>
  prev?.score > current?.score ? prev : current
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <Breadcrumb />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                Lead Management
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Track, qualify, and nurture leads from social media automation and chatbot interactions
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Button variant="outline" iconName="Download" onClick={handleExport}>
                <span className="hidden sm:inline">Export Leads</span>
                <span className="sm:hidden">Export</span>
              </Button>
              <Button variant="default" iconName="Plus">
                <span className="hidden sm:inline">Add Lead</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <LeadScoreCard
              score={topLead?.score}
              trend="up"
              description={`${topLead?.name} from ${topLead?.company} shows highest engagement with AI adoption content and cost-saving case studies.`} />

            <div className="lg:col-span-2">
              <ConversionFunnel data={mockFunnelData} />
            </div>
          </div>

          <div className="mb-6">
            <LeadFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              resultCount={filteredAndSortedLeads?.length} />

          </div>

          <div className="hidden lg:block bg-card border border-border rounded-lg shadow-elevation-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="p-4 text-left w-12">
                      <Checkbox
                        checked={selectedLeads?.length === filteredAndSortedLeads?.length && filteredAndSortedLeads?.length > 0}
                        onChange={(e) => handleSelectAll(e?.target?.checked)} />

                    </th>
                    <th
                      className="p-4 text-left cursor-pointer hover:bg-muted transition-smooth"
                      onClick={() => handleSort('name')}>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">Contact</span>
                        <Icon
                          name={sortConfig?.key === 'name' ? sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown' : 'ChevronsUpDown'}
                          size={14} />

                      </div>
                    </th>
                    <th className="p-4 text-left hidden lg:table-cell">
                      <span className="text-sm font-medium text-foreground">Contact Info</span>
                    </th>
                    <th
                      className="p-4 text-left cursor-pointer hover:bg-muted transition-smooth hidden md:table-cell"
                      onClick={() => handleSort('source')}>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">Source</span>
                        <Icon
                          name={sortConfig?.key === 'source' ? sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown' : 'ChevronsUpDown'}
                          size={14} />

                      </div>
                    </th>
                    <th
                      className="p-4 text-left cursor-pointer hover:bg-muted transition-smooth"
                      onClick={() => handleSort('score')}>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">Score</span>
                        <Icon
                          name={sortConfig?.key === 'score' ? sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown' : 'ChevronsUpDown'}
                          size={14} />

                      </div>
                    </th>
                    <th className="p-4 text-left hidden xl:table-cell">
                      <span className="text-sm font-medium text-foreground">Stage</span>
                    </th>
                    <th
                      className="p-4 text-left cursor-pointer hover:bg-muted transition-smooth hidden lg:table-cell"
                      onClick={() => handleSort('lastContact')}>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">Last Contact</span>
                        <Icon
                          name={sortConfig?.key === 'lastContact' ? sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown' : 'ChevronsUpDown'}
                          size={14} />

                      </div>
                    </th>
                    <th className="p-4 text-left">
                      <span className="text-sm font-medium text-foreground">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedLeads?.map((lead) =>
                  <React.Fragment key={lead?.id}>
                      <tr className="border-b border-border">
                        <td className="p-4">
                          <Checkbox
                          checked={selectedLeads?.includes(lead?.id)}
                          onChange={(e) => handleSelectLead(lead?.id, e?.target?.checked)} />

                        </td>
                        <td colSpan="7" className="p-0">
                          <LeadTableRow
                          lead={lead}
                          onStatusUpdate={() => {}}
                          onSendEmail={handleSendEmail}
                          onScheduleMeeting={handleScheduleMeeting} />

                        </td>
                      </tr>
                    </React.Fragment>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:hidden space-y-4 mb-6">
            {filteredAndSortedLeads?.map((lead) =>
            <LeadMobileCard
              key={lead?.id}
              lead={lead}
              onStatusUpdate={() => {}}
              onSendEmail={handleSendEmail}
              onScheduleMeeting={handleScheduleMeeting} />

            )}
          </div>

          <NurturingWorkflows
            workflows={mockWorkflows}
            onAssignWorkflow={handleAssignWorkflow} />

        </div>
      </main>
      <BulkActionsBar
        selectedCount={selectedLeads?.length}
        onExport={handleExport}
        onAssignWorkflow={() => handleAssignWorkflow(1)}
        onUpdateStatus={handleUpdateStatus}
        onClearSelection={() => setSelectedLeads([])} />

    </div>);

};

export default LeadManagement;