
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Bell, Phone, Calendar, Pill, X } from 'lucide-react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'call',
      title: 'יניב הבן שלי התקשר',
      message: 'שיחה לא נענתה מיניב - 14:30',
      time: '14:30',
      isRead: false,
      icon: Phone
    },
    {
      id: 2,
      type: 'doctor',
      title: 'ד"ר כהן התקשר',
      message: 'מזכירת ד"ר כהן התקשרה - יש לקבוע תור',
      time: '13:15',
      isRead: false,
      icon: Phone
    },
    {
      id: 3,
      type: 'medication',
      title: 'לגשת למרפאה לקחת תרופות',
      message: 'זמן לרכישת תרופות חודשיות - מטפורמין ואינסולין',
      time: '12:00',
      isRead: false,
      icon: Pill
    },
    {
      id: 4,
      type: 'appointment',
      title: 'תזכורת תור',
      message: 'תור אצל ד"ר כהן מחר בשעה 10:00',
      time: '11:30',
      isRead: true,
      icon: Calendar
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const getNotificationColor = (type: string, isRead: boolean) => {
    if (isRead) return 'bg-gray-50 border-gray-200';
    
    switch (type) {
      case 'call': return 'bg-green-50 border-green-200';
      case 'doctor': return 'bg-blue-50 border-blue-200';
      case 'medication': return 'bg-orange-50 border-orange-200';
      case 'appointment': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative cursor-pointer">
          <Bell className="h-8 w-8 text-blue-600 hover:text-blue-700 transition-colors" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-[80vh] flex flex-col" dir="rtl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">הודעות</DialogTitle>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllAsRead}
                className="text-sm"
              >
                סמן הכל כנקרא
              </Button>
            )}
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-3 mt-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">אין הודעות חדשות</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <Card 
                  key={notification.id} 
                  className={`rounded-xl border-2 transition-all duration-200 hover:shadow-md ${getNotificationColor(notification.type, notification.isRead)}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.isRead ? 'bg-gray-100' : 
                        notification.type === 'call' ? 'bg-green-100' :
                        notification.type === 'doctor' ? 'bg-blue-100' :
                        notification.type === 'medication' ? 'bg-orange-100' :
                        'bg-purple-100'
                      }`}>
                        <IconComponent className={`h-5 w-5 ${
                          notification.isRead ? 'text-gray-500' :
                          notification.type === 'call' ? 'text-green-600' :
                          notification.type === 'doctor' ? 'text-blue-600' :
                          notification.type === 'medication' ? 'text-orange-600' :
                          'text-purple-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className={`text-sm font-medium ${notification.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                              {notification.title}
                            </h4>
                            <p className={`text-sm mt-1 ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                          </div>
                          <div className="flex gap-1">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8 p-0 hover:bg-blue-100"
                              >
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeNotification(notification.id)}
                              className="h-8 w-8 p-0 hover:bg-red-100"
                            >
                              <X className="h-3 w-3 text-gray-400 hover:text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationCenter;
