import React from 'react';
import { MessageSquare, Shield, Zap, Heart, Star, User, Bell, Settings, Image } from 'lucide-react';

const AuthImagePattern = ({ title, subtitle }) => {
  // Array of Lucide icons to use in the grid
  const icons = [
    MessageSquare, Shield, Zap, 
    Heart, Star, User, 
    Bell, Settings, Image
  ];
  
  // Array of gradient colors for the backgrounds
  const gradients = [
    'from-primary/20 to-secondary/20',
    'from-secondary/20 to-accent/20',
    'from-accent/20 to-primary/20',
  ];

  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-base-200 to-base-300 p-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
             style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
      </div>

      <div className="relative z-10 max-w-md text-center">
        {/* Icon grid */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {icons.map((Icon, i) => {
            const gradientIndex = i % gradients.length;
            return (
              <div
                key={i}
                className={`aspect-square rounded-2xl bg-gradient-to-br ${gradients[gradientIndex]} backdrop-blur-sm p-6 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  i % 3 === 0 ? "animate-pulse" : ""
                }`}
              >
                <Icon className="w-10 h-10 text-primary opacity-80" />
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{title}</h2>
          <p className="text-base-content/80 text-lg leading-relaxed">{subtitle}</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default AuthImagePattern;