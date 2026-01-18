
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import ReportList from './components/ReportList';
import Community from './components/Community';
import Profile from './components/Profile';
import NotificationDrawer, { Notification } from './components/NotificationDrawer';
import { User, PatientReport, ReportSeverity } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reports, setReports] = useState<PatientReport[]>([]);
  
  // Notification States
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'CRITICAL',
      title: 'Active Security Alert',
      message: 'Staff at Downtown General reported a physical escalation in the triage area.',
      time: '12m ago',
      isRead: false
    },
    {
      id: '2',
      type: 'COMMUNITY',
      title: 'New Discussion Pulse',
      message: 'Dr. Sarah Reid replied to your comment about de-escalation protocols.',
      time: '2h ago',
      isRead: false
    },
    {
      id: '3',
      type: 'SYSTEM',
      title: 'Sync Complete',
      message: 'Your Medical License MD-8872-XP has been successfully verified for 2025.',
      time: 'Yesterday',
      isRead: true
    }
  ]);

  // Initial dummy data
  useEffect(() => {
    const initialReports: PatientReport[] = [
      {
        id: '1',
        patientInitials: 'JD',
        incidentDate: '2024-05-15',
        behaviorType: 'Verbal Aggression',
        severity: ReportSeverity.MEDIUM,
        description: 'Patient became verbally abusive when refused prescription for controlled substances.',
        doctorName: 'Dr. Sarah Smith',
        clinicId: 'CLI-990',
        aiSummary: 'Risk of verbal escalation during boundary setting. Recommend calm but firm stance.'
      }
    ];
    setReports(initialReports);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    setView('login');
  };

  const addReport = (report: PatientReport) => {
    setReports([report, ...reports]);
    setActiveTab('reports');
    // Add a notification when a report is added
    const newNotif: Notification = {
      id: Date.now().toString(),
      type: 'SYSTEM',
      title: 'Report Logged',
      message: `Safety report for patient ${report.patientInitials} has been synced.`,
      time: 'Just now',
      isRead: false
    };
    setNotifications([newNotif, ...notifications]);
  };

  const markRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const hasUnread = notifications.some(n => !n.isRead);

  if (!user) {
    return view === 'login' ? (
      <LoginPage onLogin={handleLogin} onNavigateSignup={() => setView('signup')} />
    ) : (
      <SignupPage onSignup={handleLogin} onNavigateLogin={() => setView('login')} />
    );
  }

  return (
    <Layout user={user} onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && (
        <Dashboard 
          user={user} 
          reports={reports} 
          onNewReport={() => setActiveTab('reports')} 
          setActiveTab={setActiveTab}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          hasUnreadNotifications={hasUnread}
        />
      )}
      {activeTab === 'reports' && <ReportList reports={reports} onAddReport={addReport} />}
      {activeTab === 'community' && <Community user={user} />}
      {activeTab === 'profile' && <Profile user={user} reportCount={reports.length} />}

      <NotificationDrawer 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkRead={markRead}
        onClearAll={clearAllNotifications}
      />
    </Layout>
  );
};

export default App;
