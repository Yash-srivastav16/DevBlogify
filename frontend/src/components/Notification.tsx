import React from 'react';
import { Notification as Notify, NotificationGroup } from '@progress/kendo-react-notification';
import {
    Typography,
  } from "@mui/material";

interface NotificationProps {
  notification: {
    message: string;
    type: 'success' | 'error';
  } | null;
}


const Notification: React.FC<NotificationProps> = ({ notification }) => {
  if (!notification) return null; 
  console.log(notification)

  return (
    <NotificationGroup style={ {top: "13px", left: '50%', transform: 'translateX(-50%)',zIndex: 2000} }>
    <Notify
      type={{
        style: notification.type,
        icon: true,
      }}
      style={{
        zIndex: 12000,
      }}
    >
      <Typography>{notification.message}</Typography>
    </Notify>
    </NotificationGroup>
  );
};

export default Notification;
