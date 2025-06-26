
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, Check, AlertTriangle, Plus } from 'lucide-react';

const MedicationReminders = () => {
  const [reminders] = useState([
    {
      id: 1,
      name: 'מטפורמין',
      dosage: '500mg',
      time: '08:00',
      status: 'taken',
      importance: 'high'
    },
    {
      id: 2,
      name: 'אינסולין',
      dosage: '10 יחידות',
      time: '12:00',
      status: 'pending',
      importance: 'critical'
    },
    {
      id: 3,
      name: 'ויטמין D',
      dosage: '1000 יחידות',
      time: '19:00',
      status: 'upcoming',
      importance: 'medium'
    },
    {
      id: 4,
      name: 'אמלודיפין',
      dosage: '5mg',
      time: '20:30',
      status: 'overdue',
      importance: 'high'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'taken': return 'נלקח';
      case 'pending': return 'ממתין';
      case 'upcoming': return 'בקרוב';
      case 'overdue': return 'פספס';
      default: return 'לא ידוע';
    }
  };

  const getImportanceIcon = (importance: string) => {
    if (importance === 'critical') return <AlertTriangle className="h-5 w-5 text-red-600" />;
    return <Bell className="h-5 w-5 text-blue-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">תזכורות לתרופות</h2>
          <p className="text-gray-600">עקוב אחר התרופות והתזכורות שלך היום</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg">
          <Plus className="h-5 w-5 ml-2" />
          הוסף תזכורת
        </Button>
      </div>

      {/* Today's Summary */}
      <Card className="bg-gradient-to-l from-blue-50 to-green-50 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-600" />
            סיכום היום
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-sm text-gray-600">נלקח</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-gray-600">ממתין</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-gray-600">בקרוב</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-600">פספס</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reminders List */}
      <div className="grid gap-4">
        {reminders.map((reminder) => (
          <Card key={reminder.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getImportanceIcon(reminder.importance)}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{reminder.name}</h3>
                    <p className="text-gray-600">{reminder.dosage}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-700">{reminder.time}</div>
                    <Badge className={getStatusColor(reminder.status)}>
                      {getStatusText(reminder.status)}
                    </Badge>
                  </div>
                  {reminder.status === 'pending' && (
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl">
                      <Check className="h-4 w-4 ml-2" />
                      נטלתי
                    </Button>
                  )}
                  {reminder.status === 'overdue' && (
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl">
                      <Check className="h-4 w-4 ml-2" />
                      נטלתי עכשיו
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MedicationReminders;
