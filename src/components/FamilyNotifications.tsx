
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Heart, Bell, Calendar } from 'lucide-react';

const FamilyNotifications = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'sent',
      content: 'היום עשיתי בדיקת דם - הכל תקין! הלחץ 120/80 והסוכר 95.',
      timestamp: '2024-12-26 14:30',
      recipient: 'כל המשפחה'
    },
    {
      id: 2,
      type: 'received',
      content: 'כל הכבוד אמא! שמחים לשמוע שהכל בסדר. נתראה בשישי בערב. אוהבים אותך! 💕',
      timestamp: '2024-12-26 15:15',
      sender: 'יואב'
    },
    {
      id: 3,
      type: 'sent',
      content: 'תזכורת: מחר יש לי תור אצל ד"ר כהן בשעה 10:00',
      timestamp: '2024-12-25 18:00',
      recipient: 'מיכל'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [{
        id: Date.now(),
        type: 'sent',
        content: newMessage,
        timestamp: new Date().toLocaleString('he-IL'),
        recipient: 'כל המשפחה'
      }, ...prev]);
      setNewMessage('');
    }
  };

  const quickMessages = [
    'הכל בסדר היום, הרגשה טובה! 😊',
    'לקחתי את כל התרופות בזמן',
    'מחר יש לי תור אצל הרופא',
    'צריך עזרה עם קניות השבוע'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">תקשורת עם המשפחה</h2>
          <p className="text-gray-600">שתף עדכונים וקבל תמיכה מבני המשפחה</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg">
              <Plus className="h-5 w-5 ml-2" />
              שלח הודעה
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-xl">שלח עדכון למשפחה</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="message" className="text-lg">הודעה</Label>
                <Input
                  id="message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="mt-1 text-lg p-3"
                  placeholder="מה תרצה לשתף?"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-lg">הודעות מהירות:</Label>
                <div className="grid gap-2">
                  {quickMessages.map((msg, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-right justify-start p-3 h-auto"
                      onClick={() => setNewMessage(msg)}
                    >
                      {msg}
                    </Button>
                  ))}
                </div>
              </div>
              <Button onClick={sendMessage} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                שלח הודעה
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Status Updates */}
      <Card className="bg-gradient-to-l from-green-50 to-blue-50 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            עדכון מהיר על המצב
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl">
              הכל בסדר! 😊
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
              לקחתי תרופות ✅
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl">
              תור אצל רופא 🏥
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl">
              צריך עזרה 🤗
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messages History */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          הודעות אחרונות
        </h3>
        
        {messages.map((message) => (
          <Card key={message.id} className={`rounded-2xl shadow-lg transition-all duration-300 ${
            message.type === 'sent' 
              ? 'bg-blue-50 border-l-4 border-blue-500 ml-8' 
              : 'bg-green-50 border-r-4 border-green-500 mr-8'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className={`h-4 w-4 ${
                    message.type === 'sent' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                  <span className="text-sm font-medium text-gray-600">
                    {message.type === 'sent' 
                      ? `נשלח אל: ${message.recipient}` 
                      : `מאת: ${message.sender}`
                    }
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  {message.timestamp}
                </div>
              </div>
              <p className="text-lg text-gray-800">{message.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FamilyNotifications;
