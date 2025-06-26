
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Clock, Check, Bell } from 'lucide-react';

const MedicationTracker = () => {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'מטפורמין',
      dosage: '500mg',
      time: '08:00',
      taken: true,
      frequency: 'פעמיים ביום'
    },
    {
      id: 2,
      name: 'אינסולין',
      dosage: '10 יחידות',
      time: '12:00',
      taken: false,
      frequency: 'לפני ארוחות'
    },
    {
      id: 3,
      name: 'ויטמין D',
      dosage: '1000 יחידות',
      time: '19:00',
      taken: false,
      frequency: 'פעם ביום'
    }
  ]);

  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    time: '',
    frequency: ''
  });

  const markAsTaken = (id: number) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === id ? { ...med, taken: true } : med
      )
    );
  };

  const addMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.time) {
      setMedications(prev => [...prev, {
        id: Date.now(),
        ...newMedication,
        taken: false
      }]);
      setNewMedication({ name: '', dosage: '', time: '', frequency: '' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">מעקב תרופות</h2>
          <p className="text-gray-600">נהל את התרופות והתזכורות שלך</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg">
              <Plus className="h-5 w-5 ml-2" />
              הוסף תרופה
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-xl">הוסף תרופה חדשה</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-lg">שם התרופה</Label>
                <Input
                  id="name"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 text-lg p-3"
                  placeholder="לדוגמה: מטפורמין"
                />
              </div>
              <div>
                <Label htmlFor="dosage" className="text-lg">מינון</Label>
                <Input
                  id="dosage"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                  className="mt-1 text-lg p-3"
                  placeholder="לדוגמה: 500mg"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-lg">שעה</Label>
                <Input
                  id="time"
                  type="time"
                  value={newMedication.time}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, time: e.target.value }))}
                  className="mt-1 text-lg p-3"
                />
              </div>
              <div>
                <Label htmlFor="frequency" className="text-lg">תדירות</Label>
                <Input
                  id="frequency"
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, frequency: e.target.value }))}
                  className="mt-1 text-lg p-3"
                  placeholder="לדוגמה: פעמיים ביום"
                />
              </div>
              <Button onClick={addMedication} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                הוסף תרופה
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Medications List */}
      <div className="grid gap-4">
        {medications.map((medication) => (
          <Card key={medication.id} className={`bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
            medication.taken ? 'border-l-4 border-green-500' : 'border-l-4 border-orange-500'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{medication.name}</h3>
                    <Badge className={`${
                      medication.taken 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {medication.taken ? 'נלקח' : 'ממתין'}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-gray-600">
                    <p className="text-lg flex items-center gap-2">
                      <span className="font-medium">מינון:</span> {medication.dosage}
                    </p>
                    <p className="text-lg flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">שעה:</span> {medication.time}
                    </p>
                    <p className="text-lg flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span className="font-medium">תדירות:</span> {medication.frequency}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {!medication.taken && (
                    <Button
                      onClick={() => markAsTaken(medication.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                    >
                      <Check className="h-5 w-5 ml-2" />
                      סמן כנלקח
                    </Button>
                  )}
                  {medication.taken && (
                    <div className="flex items-center text-green-600 text-lg font-medium">
                      <Check className="h-5 w-5 ml-2" />
                      נלקח בהצלחה
                    </div>
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

export default MedicationTracker;
