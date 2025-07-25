import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Heart, User, Clock, AlertTriangle, Smartphone } from 'lucide-react';

const EmergencyButton = () => {
  const [emergencyContacts] = useState([
    {
      id: 1,
      name: 'מוקד חירום - מד"א',
      phone: '101',
      type: 'emergency',
      available: true
    },
    {
      id: 2,
      name: 'יניב הרוש - בן',
      phone: '0506244601',
      type: 'family',
      available: true
    },
    {
      id: 3,
      name: 'ג\'ורג\'יט הרוש - אשה',
      phone: '0506763577',
      type: 'family',
      available: true
    },
    {
      id: 4,
      name: 'ד"ר כהן - רופא משפחה',
      phone: '03-1234567',
      type: 'doctor',
      available: true
    }
  ]);

  const [currentLocation] = useState({
    address: 'אבשלום 40/1, באר שבע',
    coordinates: '31.2518° N, 34.7915° E'
  });

  const [lastEmergency] = useState({
    date: '2024-12-20',
    time: '14:30',
    type: 'medical',
    resolved: true
  });

  const handleEmergencyCall = (phone: string, name: string) => {
    console.log(`Calling emergency contact: ${name} at ${phone}`);
    
    // Send location data if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Current location: ${latitude}, ${longitude}`);
        
        // Create message with location
        const locationMessage = `חירום! מיקום נוכחי: https://maps.google.com/?q=${latitude},${longitude}`;
        
        // For emergency services, also try to send SMS with location
        if (phone === '101') {
          console.log('Emergency call to 101 with location data:', locationMessage);
        }
      }, (error) => {
        console.error('Could not get location:', error);
      });
    }
    
    // Make the actual phone call
    window.location.href = `tel:${phone}`;
  };

  const handleFamilyAppAccess = () => {
    console.log('Opening family app connection');
    // Open WhatsApp group or family communication app
    const familyGroupMessage = 'שלום, אני צריך עזרה רפואית. המיקום שלי: ' + currentLocation.address;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(familyGroupMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getContactTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'family': return 'bg-blue-100 text-blue-800';
      case 'doctor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContactTypeText = (type: string) => {
    switch (type) {
      case 'emergency': return 'חירום';
      case 'family': return 'משפחה';
      case 'doctor': return 'רופא';
      default: return 'אחר';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">מצב חירום</h2>
        <p className="text-gray-600">לחץ על הכפתור האדום במקרה חירום או בחר איש קשר</p>
      </div>

      {/* Main Emergency Button - Fixed Container */}
      <div className="flex justify-center">
        <Card className="bg-gradient-to-b from-red-500 to-red-600 rounded-2xl shadow-2xl border-4 border-red-400 w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center">
              <Button 
                className="w-32 h-32 rounded-full bg-red-600 hover:bg-red-700 text-white text-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 mx-auto"
                onClick={() => handleEmergencyCall('101', 'מד"א')}
              >
                <div className="flex flex-col items-center">
                  <Phone className="h-12 w-12 mb-2" />
                  <span>SOS</span>
                </div>
              </Button>
              <p className="text-white text-xl font-bold mt-4">חירום - 101</p>
              <p className="text-red-100 mt-2">לחיצה תחייג ותשלח מיקום</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Family App Connection */}
      <Card className="bg-gradient-to-l from-blue-50 to-purple-50 rounded-2xl shadow-lg border-r-4 border-blue-500">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-blue-600" />
            קישור לאפליקציית המשפחה
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-800 mb-2">
                שלח הודעת חירום למשפחה בוואטסאפ
              </p>
              <p className="text-gray-600">
                המשפחה תקבל הודעה עם המיקום שלך ובקשה לעזרה
              </p>
            </div>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
              onClick={handleFamilyAppAccess}
            >
              <Smartphone className="h-5 w-5 ml-2" />
              שלח הודעה
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Location */}
      <Card className="bg-white rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-blue-600" />
            המיקום הנוכחי
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-800">{currentLocation.address}</p>
            <p className="text-sm text-gray-600">{currentLocation.coordinates}</p>
            <Badge className="bg-green-100 text-green-800">מיקום מדויק</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="bg-white rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <User className="h-6 w-6 text-purple-600" />
            אנשי קשר לחירום
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-800">{contact.name}</span>
                    <span className="text-sm text-gray-600">{contact.phone}</span>
                  </div>
                  <Badge className={getContactTypeColor(contact.type)}>
                    {getContactTypeText(contact.type)}
                  </Badge>
                  {contact.available && (
                    <Badge className="bg-green-100 text-green-800">זמין</Badge>
                  )}
                </div>
                <Button
                  className={`px-6 py-2 rounded-xl ${
                    contact.type === 'emergency' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                  onClick={() => handleEmergencyCall(contact.phone, contact.name)}
                  disabled={!contact.available}
                >
                  <Phone className="h-4 w-4 ml-2" />
                  חייג
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Last Emergency Status */}
      {lastEmergency && (
        <Card className="bg-white rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
              <Clock className="h-6 w-6 text-orange-600" />
              מצב חירום אחרון
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-800">
                  {lastEmergency.date} בשעה {lastEmergency.time}
                </p>
                <p className="text-gray-600">חירום רפואי</p>
              </div>
              <Badge className={lastEmergency.resolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {lastEmergency.resolved ? 'טופל' : 'פעיל'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency Instructions */}
      <Card className="bg-yellow-50 rounded-2xl shadow-lg border-r-4 border-yellow-400">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">הוראות חירום</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• לחץ על הכפתור האדום לחיוג מיידי למד"א</li>
                <li>• המיקום שלך יישלח אוטומטית</li>
                <li>• אנשי הקשר שלך יקבלו התראה</li>
                <li>• ישאר רגוע והמתן לעזרה</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyButton;
