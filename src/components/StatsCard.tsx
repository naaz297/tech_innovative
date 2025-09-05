import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: 'green' | 'blue' | 'yellow' | 'purple';
  subtitle?: string;
  onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, subtitle, onClick }) => {
  const colorClasses = {
    green: 'from-green-100 to-emerald-50 border-green-200',
    blue: 'from-blue-100 to-sky-50 border-blue-200',
    yellow: 'from-yellow-100 to-amber-50 border-yellow-200',
    purple: 'from-purple-100 to-fuchsia-50 border-purple-200'
  } as const;

  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${colorClasses[color]} border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : -1}
    >
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
