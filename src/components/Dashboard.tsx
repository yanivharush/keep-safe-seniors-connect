
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Heart, Calendar, FileText, Video, Activity, Clock } from 'lucide-react';

const Dashboard = () => {
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
              <p className="text-lg font-medium">ד"ר גבריאל הרוש</p>
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

export default Dashboard;
