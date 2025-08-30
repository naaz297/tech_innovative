import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DateTimePickerProps {
  onSelect: (date: Date) => void;
  onClose: () => void;
  initialDate?: Date;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onSelect, onClose, initialDate }) => {
  const { language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(
    initialDate ? initialDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState(
    initialDate ? initialDate.toTimeString().slice(0, 5) : '09:00'
  );

  const handleConfirm = () => {
    const dateTime = new Date(`${selectedDate}T${selectedTime}`);
    onSelect(dateTime);
    onClose();
  };

  const months = language === 'hi' 
    ? ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const today = new Date();
  const selectedDateObj = new Date(selectedDate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6" />
              <h3 className="text-lg font-bold">
                {language === 'hi' ? 'दिनांक और समय चुनें' : 'Select Date & Time'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 p-1 rounded hover:bg-opacity-30 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-green-600" />
              {language === 'hi' ? 'दिनांक चुनें' : 'Select Date'}
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-lg"
            />
            <p className="text-sm text-gray-600 mt-2">
              {language === 'hi' ? 'चुना गया:' : 'Selected:'} {selectedDateObj.getDate()} {months[selectedDateObj.getMonth()]} {selectedDateObj.getFullYear()}
            </p>
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-blue-600" />
              {language === 'hi' ? 'समय चुनें' : 'Select Time'}
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-lg"
            />
          </div>

          {/* Quick Date Options */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              {language === 'hi' ? 'त्वरित विकल्प:' : 'Quick Options:'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedDate(today.toISOString().split('T')[0])}
                className="p-2 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
              >
                {language === 'hi' ? 'आज' : 'Today'}
              </button>
              <button
                onClick={() => {
                  const tomorrow = new Date(today);
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  setSelectedDate(tomorrow.toISOString().split('T')[0]);
                }}
                className="p-2 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
              >
                {language === 'hi' ? 'कल' : 'Tomorrow'}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {language === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              {language === 'hi' ? 'पुष्टि करें' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;