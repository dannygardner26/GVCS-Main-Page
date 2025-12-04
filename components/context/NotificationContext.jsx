import React, { useState } from 'react';

export const NotificationContext = React.createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (message, type = 'success', duration = 3000) => {
        const id = Date.now();
        const notification = { id, message, type };
        setNotifications(prev => [...prev, notification]);

        if (duration > 0) {
            setTimeout(() => {
                setNotifications(prev => prev.filter(n => n.id !== id));
            }, duration);
        }

        return id;
    };

    const showConfirm = (message, onConfirm, onCancel) => {
        const id = Date.now();
        const notification = {
            id,
            message,
            type: 'confirm',
            onConfirm: () => {
                onConfirm();
                setNotifications(prev => prev.filter(n => n.id !== id));
            },
            onCancel: () => {
                if (onCancel) onCancel();
                setNotifications(prev => prev.filter(n => n.id !== id));
            }
        };
        setNotifications(prev => [...prev, notification]);
        return id;
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification, showConfirm, removeNotification }}>
            {children}
            <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded-lg shadow-lg border-2 animate-fade-in-up ${
                            notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                            notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                            notification.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                            notification.type === 'confirm' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                            'bg-gray-50 border-gray-200 text-gray-800'
                        }`}
                    >
                        {notification.type === 'confirm' ? (
                            <div>
                                <p className="font-semibold mb-3">{notification.message}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={notification.onConfirm}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={notification.onCancel}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">{notification.message}</p>
                                <button
                                    onClick={() => removeNotification(notification.id)}
                                    className="ml-4 text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = React.useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};

export default NotificationProvider;
