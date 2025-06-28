import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Phone, Plus, User } from 'lucide-react';

const ContactsList = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'ד"ר גבריאל הרוש - רופא משפחה',
      phone: '03-1234567',
      type: 'רופא',
      notes: 'זמין בימי ב-ה, 8:00-16:00'
    },
    {
      id: 2,
      name: 'מרכז רפואי הדסה',
      phone: '02-6777111',
      type: 'בית חולים',
      notes: 'מקרי חירום'
    },
    {
      id: 3,
      name: 'יניב הרוש - בן',
      phone: '050-1234567',
      type: 'משפחה',
      notes: 'איש קשר ראשי'
    },
    {
      id: 4,
      name: 'ג\'ורג\'יט הרוש - בת',
      phone: '052-7654321',
      type: 'משפחה',
      notes: 'גרה בקרבת מקום'
    }
  ]);

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    type: '',
    notes: ''
  });

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts(prev => [...prev, {
        id: Date.now(),
        ...newContact
      }]);
      setNewContact({ name: '', phone: '', type: '', notes: '' });
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'רופא': return 'bg-blue-50 border-blue-200';
      case 'בית חולים': return 'bg-red-50 border-red-200';
      case 'משפחה': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getContactIconColor = (type: string) => {
    switch (type) {
      case 'רופא': return 'text-blue-600';
      case 'בית חולים': return 'text-red-600';
      case 'משפחה': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">אנשי קשר</h2>
          <p className="text-gray-600">רשימת הרופאים, בני המשפחה ואנשי הקשר החשובים</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-lg">
              <Plus className="h-5 w-5 ml-2" />
              הוסף איש קשר
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-xl">הוסף איש קשר חדש</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-lg">שם</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 text-lg p-3"
                  placeholder="לדוגמה: ד״ר לוי"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-lg">טלפון</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 text-lg p-3"
                  placeholder="לדוגמה: 03-1234567"
                />
              </div>
              <div>
                <Label htmlFor="type" className="text-lg">סוג</Label>
                <Input
                  id="type"
                  value={newContact.type}
                  onChange={(e) => setNewContact(prev => ({ ...prev, type: e.target.value }))}
                  className="mt-1 text-lg p-3"
                  placeholder="לדוגמה: רופא, משפחה, בית חולים"
                />
              </div>
              <div>
                <Label htmlFor="notes" className="text-lg">הערות</Label>
                <Input
                  id="notes"
                  value={newContact.notes}
                  onChange={(e) => setNewContact(prev => ({ ...prev, notes: e.target.value }))}
                  className="mt-1 text-lg p-3"
                  placeholder="הערות נוספות"
                />
              </div>
              <Button onClick={addContact} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg">
                הוסף איש קשר
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contacts Grid */}
      <div className="grid gap-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className={`rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${getContactColor(contact.type)}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getContactColor(contact.type)}`}>
                    <User className={`h-6 w-6 ${getContactIconColor(contact.type)}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{contact.name}</h3>
                    <p className="text-lg text-gray-600 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {contact.phone}
                    </p>
                    {contact.notes && (
                      <p className="text-sm text-gray-500 mt-1">{contact.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                    onClick={() => window.open(`tel:${contact.phone}`)}
                  >
                    <Phone className="h-5 w-5 ml-2" />
                    התקשר
                  </Button>
                  <span className={`text-sm px-3 py-1 rounded-full text-center font-medium ${
                    contact.type === 'רופא' ? 'bg-blue-100 text-blue-800' :
                    contact.type === 'בית חולים' ? 'bg-red-100 text-red-800' :
                    contact.type === 'משפחה' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {contact.type}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactsList;
