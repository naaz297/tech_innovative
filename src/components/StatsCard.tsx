import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: 'green' | 'blue' | 'yellow';
  subtitle?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, subtitle }) => {
  const colorClasses = {
    green: 'from-green-100 to-emerald-50 border-green-200',
    blue: 'from-blue-100 to-sky-50 border-blue-200',
    yellow: 'from-yellow-100 to-amber-50 border-yellow-200'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
        <div className="bg-white p-3 rounded-full shadow-md">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;