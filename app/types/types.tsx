import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      role: string;
      isRegistered: boolean;
      googleId: string;
    } & DefaultSession['user'];
  }
}

export type User = {
  id: number;
  googleId: string;
  firstName: string;
  lastName: string;
  role: string;
  studentNumber: number;
  category: string | null;
  phone: number;
  email: string;
  note: string | null;
  cardNumber: number;
};

export type SessionUser = {
  name: string;
  email: string;
  image?: string;
  id?: number;
};

export type WeekViewProps = {
  userInfo: SessionUser;
};

export type Booking = {
  id: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  roomId: number;
  reason: string;
};

export type WeekProps = {
  selectedWeek: Date;
  roomNumber: number;
  userInfo: SessionUser;
  Booking: Booking;
  handleHourClick: (hour: Date) => void;
};

export type BookingInfoProps = {
  id: number;
  roomId: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  room: {
    roomNum: number;
    name: string;
  };
};

export type RoomType = {
  id: number;
  name: string;
  roomNum: number;
  capacity: number;
  location: string;
};
