import { useNotificationContext } from '../contexts/NotificationContext';

export function useNotification() {
  const { addNotification } = useNotificationContext();

  return {
    notifySuccess: (message, title = 'Success') => addNotification(message, 'success', title),
    notifyWarning: (message, title = 'Warning') => addNotification(message, 'warning', title),
    notifyError: (message, title = 'Error') => addNotification(message, 'error', title),
    notifyInfo: (message, title = 'Information') => addNotification(message, 'info', title),
  };
}
