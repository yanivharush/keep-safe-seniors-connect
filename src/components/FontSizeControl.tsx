
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Minus, Type } from 'lucide-react';

const FontSizeControl = () => {
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    // Apply font size to the entire app
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    // Save preference to localStorage
    localStorage.setItem('preferredFontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    // Load saved font size preference
    const savedFontSize = localStorage.getItem('preferredFontSize');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }
  }, []);

  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
    }
  };

  const resetFontSize = () => {
    setFontSize(16);
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-800">גודל כתב</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={decreaseFontSize}
              disabled={fontSize <= 12}
              className="h-8 w-8 p-0 rounded-full"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-gray-600 min-w-[3rem] text-center">
              {fontSize}px
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={increaseFontSize}
              disabled={fontSize >= 24}
              className="h-8 w-8 p-0 rounded-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFontSize}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              איפוס
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FontSizeControl;
