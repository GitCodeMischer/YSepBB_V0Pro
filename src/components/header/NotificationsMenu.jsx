import React from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

/**
 * NotificationsMenu component for displaying user notifications
 */
export default function NotificationsMenu() {
  // Mock notification data - in a real app, this would come from props or context
  const notificationItems = [
    { id: 1, title: 'Campaign completed', message: 'Your Q3 campaign has finished with 145% ROI', time: '2h ago', read: false },
    { id: 2, title: 'New message', message: 'Sarah from Marketing sent you a message', time: '5h ago', read: false },
    { id: 3, title: 'System update', message: 'YSepBB was updated to version 2.0', time: '1d ago', read: false },
    { id: 4, title: 'Reminder', message: 'Team meeting in 30 minutes', time: '2d ago', read: true }
  ];

  return (
    <div className="absolute right-0 mt-2 notification-dropdown w-[calc(100vw-2rem)] sm:w-80 bg-[#121212]/90 backdrop-blur-md rounded-xl border border-[#222]/70 shadow-xl dropdown-animation z-50">
      <div className="px-4 py-3 border-b border-[#222]/70 flex items-center justify-between">
        <h3 className="font-medium text-white">Notifications</h3>
        <button className="text-xs text-[#50E3C2] hover:underline">Mark all as read</button>
      </div>
      
      <div className="mobile-dropdown">
        {notificationItems.map((item) => (
          <div key={item.id} className={`p-3 border-b border-[#1e1e1e]/70 last:border-0 hover:bg-[#1a1a1a]/70 transition-colors cursor-pointer ${!item.read ? 'bg-[#141414]/70' : ''}`}>
            <div className="flex items-start">
              <div className={`min-w-[8px] h-2 rounded-full mt-1.5 ${!item.read ? 'bg-[#50E3C2]' : 'bg-transparent'} mr-2 flex-shrink-0`}></div>
              <div className="w-full min-w-0">
                <div className="flex justify-between w-full">
                  <h4 className="text-sm font-medium text-white">{item.title}</h4>
                  <span className="text-xs text-gray-500 ml-2 whitespace-nowrap flex-shrink-0">{item.time}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 break-words w-full">{item.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-2 bg-[#0f0f0f]/70 text-center rounded-b-xl">
        <button className="text-sm text-[#50E3C2] hover:underline">View all notifications</button>
      </div>
    </div>
  );
} 