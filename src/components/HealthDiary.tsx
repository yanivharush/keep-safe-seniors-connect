
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Heart, Calendar } from 'lucide-react';

const HealthDiary = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2024-12-26',
      bloodPressure: '120/80',
      sugar: '95',
      weight: '72',
      notes: 'הרגשה טובה, הלכתי לטיול של 30 דקות'
    },
    {
      id: 2,
      date: '2024-12-25',
      bloodPressure: '118/78',
      sugar: '88',
      weight: '72.2',
      notes: 'יום רגוע, שתיתי הרבה מים'
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    bloodPressure: '',
    sugar: '',
    weight: '',
    notes: ''
  });

  const addEntry = () => {
    if (newEntry.bloodPressure || newEntry.sugar || newEntry.weight) {
      setEntries(prev => [{
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...newEntry
      }, ...prev]);
      setNewEntry({ bloodPressure: '', sugar: '', weight: '', notes: '' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">יומן בריאות</h2>
          <p className="text-gray-600">רשום את המדידות והתחושות שלך</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg">
              <Plus className="h-5 w-5 ml-2" />
              הוסף מדידה
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-xl">הוסף מדידה חדשה</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bloodPressure" className="text-lg">לחץ דם</Label>
                <Input
                  id="bloodPressure"
                  value={newEntry.bloodPressure}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, bloodPressure: e.target.value }))}
                  className="mt-1 text-lg p-3"
                  placeholder="לדוגמה: 120/80"
                />
              </div>
              <div>
                <Label htmlFor="sugar" className="text-lg">רמת סוכר</Label>
                <Input
                  id="sugar"
                  value={newEntry.sugar}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, sugar: e.target.value }))}
                  className="mt-1 text-lg p-3"
                  placeholder="לדוגמה: 95"
                />
              </div>
              <div>
                <Label htmlFor="weight" className="text-lg">משקל (ק"ג)</Label>
                <Input
                  id="weight"
                  value={newEntry.weight}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, weight: e.target.value }))}
                  className="mt-1 text-lg p-3"
                  placeholder="לדוגמה: 72"
                />
              </div>
              <div>
                <Label htmlFor="notes" className="text-lg">הערות</Label>
                <Input
                  id="notes"
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, notes: e.target.value }))}
                  className="mt-1 text-lg p-3"
                  placeholder="איך הרגשת היום?"
                />
              </div>
              <Button onClick={addEntry} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                הוסף מדידה
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Health Entries */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                {new Date(entry.date).toLocaleDateString('he-IL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {entry.bloodPressure && (
                  <div className="bg-red-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600 font-medium">לחץ דם</span>
                    </div>
                    <span className="text-2xl font-bold text-red-700">{entry.bloodPressure}</span>
                  </div>
                )}
                {entry.sugar && (
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-blue-600 font-medium">סוכר</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-700">{entry.sugar}</span>
                  </div>
                )}
                {entry.weight && (
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-purple-600 font-medium">משקל</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-700">{entry.weight} ק"ג</span>
                  </div>
                )}
              </div>
              {entry.notes && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">הערות:</h4>
                  <p className="text-gray-800">{entry.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthDiary;
