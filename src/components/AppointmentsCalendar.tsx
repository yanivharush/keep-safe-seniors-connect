
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Plus, Bell } from 'lucide-react';

const AppointmentsCalendar = () => {
  const [appointments] = useState([
    {
      id: 1,
      title: 'ד"ר כהן - רופא משפחה',
      date: '2024-12-27',
      time: '10:00',
      location: 'רח׳ הרצל 25, תל אביב',
      type: 'doctor',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'בדיקת דם',
      date: '2024-12-31',
      time: '08:30',
      location: 'מעבדות אסותא, קניון עזריאלי',
      type: 'test',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'ד"ר לוי - קרדיולוג',
      date: '2025-01-03',
      time: '14:00',
      location: 'בית חולים איכילוב',
      type: 'specialist',
      status: 'pending'
    },
    {
      id: 4,
      title: 'חיסון שפעת',
      date: '2025-01-08',
      time: '16:00',
      location: 'קופת חולים כללית - סניף רמת גן',
      type: 'vaccination',
      status: 'confirmed'
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'test': return 'bg-green-100 text-green-800';
      case 'specialist': return 'bg-purple-100 text-purple-800';
      case 'vaccination': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'doctor': return 'רופא';
      case 'test': return 'בדיקה';
      case 'specialist': return 'מומחה';
      case 'vaccination': return 'חיסון';
      default: return 'אחר';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">יומן תורים</h2>
          <p className="text-gray-600">נהל את התורים והבדיקות הרפואיות שלך</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg">
          <Plus className="h-5 w-5 ml-2" />
          הוסף תור
        </Button>
      </div>

      {/* Next Appointment */}
      <Card className="bg-gradient-to-l from-blue-50 to-purple-50 rounded-2xl shadow-lg border-r-4 border-blue-500">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-600" />
            התור הקרוב
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{appointments[0].title}</h3>
              <p className="text-lg text-gray-600 mt-2">{formatDate(appointments[0].date)}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{appointments[0].time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{appointments[0].location}</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">מחר</div>
              <Badge className={getTypeColor(appointments[0].type)}>
                {getTypeText(appointments[0].type)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="grid gap-4">
        {appointments.slice(1).map((appointment) => (
          <Card key={appointment.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-800">{appointment.title}</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg text-gray-600">{formatDate(appointment.date)}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <Badge className={getTypeColor(appointment.type)}>
                        {getTypeText(appointment.type)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{appointment.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="px-4 py-2 rounded-xl">
                    ערוך
                  </Button>
                  <Button variant="outline" className="px-4 py-2 rounded-xl">
                    בטל
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsCalendar;
