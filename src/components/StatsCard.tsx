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
    green: 'from-green-100 to-emerald-50 dark:from-gray-800 dark:to-gray-700 border-green-200 dark:border-gray-600',
    blue: 'from-blue-100 to-sky-50 dark:from-gray-800 dark:to-gray-700 border-blue-200 dark:border-gray-600',
    yellow: 'from-yellow-100 to-amber-50 dark:from-gray-800 dark:to-gray-700 border-yellow-200 dark:border-gray-600',
    purple: 'from-purple-100 to-fuchsia-50 dark:from-gray-800 dark:to-gray-700 border-purple-200 dark:border-gray-600'
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
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
        <div className="bg-white dark:bg-gray-900 p-3 rounded-full shadow-md text-gray-800 dark:text-gray-100">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
