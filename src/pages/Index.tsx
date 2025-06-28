
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, Heart, Phone, Plus, User, Users, Shield, FileText, Video, Activity } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import MedicationTracker from '@/components/MedicationTracker';
import MedicationReminders from '@/components/MedicationReminders';
import AppointmentsCalendar from '@/components/AppointmentsCalendar';
import EmergencyButton from '@/components/EmergencyButton';
import HealthDiary from '@/components/HealthDiary';
import ContactsList from '@/components/ContactsList';
import FamilyNotifications from '@/components/FamilyNotifications';
import FontSizeControl from '@/components/FontSizeControl';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'medication-reminders':
        return <MedicationReminders />;
      case 'appointments':
        return <AppointmentsCalendar />;
      case 'emergency':
        return <EmergencyButton />;
      case 'medications':
        return <MedicationTracker />;
      case 'diary':
        return <HealthDiary />;
      case 'contacts':
        return <ContactsList />;
      case 'family':
        return <FamilyNotifications />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50" dir="rtl">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-bold text-blue-800">לבריאות</h1>
                <span className="text-2xl text-gray-500">Lebriut</span>
              </div>
              <p className="text-xl text-gray-600 mb-1">שלום, גבריאל הרוש!</p>
              <p className="text-lg text-gray-500">המרכז הרפואי האישי שלך</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-xl text-xl font-bold"
                onClick={() => setActiveTab('emergency')}
              >
                <Shield className="h-8 w-8 ml-2" />
                חירום
              </Button>
              <div className="relative">
                <Bell className="h-8 w-8 text-blue-600" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">3</Badge>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Font Size Control */}
        <div className="mb-6">
          <FontSizeControl />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { id: 'overview', label: 'דשבורד ראשי', icon: Heart },
            { id: 'medication-reminders', label: 'תזכורות תרופות', icon: Bell },
            { id: 'appointments', label: 'יומן תורים', icon: Calendar },
            { id: 'emergency', label: 'לחצן חירום', icon: Shield },
            { id: 'medications', label: 'ניהול תרופות', icon: Plus },
            { id: 'diary', label: 'יומן בריאות', icon: FileText },
            { id: 'contacts', label: 'אנשי קשר', icon: Phone },
            { id: 'family', label: 'משפחה', icon: Users }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`flex items-center gap-2 px-6 py-3 text-lg rounded-xl transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:scale-105'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content Area */}
        <div className="transition-all duration-300">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
