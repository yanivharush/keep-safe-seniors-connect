
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, Heart, Phone, Plus, User, Users, Shield, FileText, Video, Activity } from 'lucide-react';
import MedicationTracker from '@/components/MedicationTracker';
import HealthDiary from '@/components/HealthDiary';
import ContactsList from '@/components/ContactsList';
import FamilyNotifications from '@/components/FamilyNotifications';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'medications':
        return <MedicationTracker />;
      case 'diary':
        return <HealthDiary />;
      case 'contacts':
        return <ContactsList />;
      case 'family':
        return <FamilyNotifications />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50" dir="rtl">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-bold text-blue-800">לבריאות</h1>
                <span className="text-2xl text-gray-500">Lebriut</span>
              </div>
              <p className="text-xl text-gray-600 mb-1">שלום, רות!</p>
              <p className="text-lg text-gray-500">המרכז הרפואי האישי שלך</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-xl text-xl font-bold">
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

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { id: 'overview', label: 'סקירה כללית', icon: Heart },
            { id: 'medications', label: 'תרופות', icon: Plus },
            { id: 'diary', label: 'יומן בריאות', icon: Calendar },
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

// Overview Tab Component
const OverviewTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Today's Medications */}
      <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <Plus className="h-6 w-6 text-green-600" />
            תרופות היום
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-lg font-medium">מטפורמין</span>
              <Badge className="bg-green-100 text-green-800">נלקח</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-lg font-medium">אינסולין</span>
              <Badge className="bg-yellow-100 text-yellow-800">ממתין</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-lg font-medium">ויטמין D</span>
              <Badge className="bg-blue-100 text-blue-800">19:00</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Measurements */}
      <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-600" />
            מדידות אחרונות
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">לחץ דם</span>
              <span className="text-xl font-bold text-green-600">120/80</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">סוכר</span>
              <span className="text-xl font-bold text-blue-600">95</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">משקל</span>
              <span className="text-xl font-bold text-purple-600">72 ק"ג</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Appointments */}
      <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            תורים קרובים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-medium">ד"ר כהן</p>
              <p className="text-sm text-gray-600">מחר 10:00</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-lg font-medium">בדיקת דם</p>
              <p className="text-sm text-gray-600">יום ג' 08:30</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Files */}
      <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <FileText className="h-6 w-6 text-orange-600" />
            תיק רפואי
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl text-lg">
              צפה בתיק רפואי
            </Button>
            <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl text-lg">
              העלה מסמך חדש
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video Calls */}
      <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <Video className="h-6 w-6 text-purple-600" />
            ייעוץ מרחוק
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl text-lg">
              שיחת וידאו עם רופא
            </Button>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg">
              שיחה עם המשפחה
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Daily Health */}
      <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <Activity className="h-6 w-6 text-green-600" />
            בריאות יומית
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">צעדים היום</span>
              <span className="text-xl font-bold text-green-600">2,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">מים</span>
              <span className="text-xl font-bold text-blue-600">6 כוסות</span>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl">
              עצות תזונה היום
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
