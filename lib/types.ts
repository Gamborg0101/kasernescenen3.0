import { DefaultSession } from 'next-auth';
import { StudyProgram } from './colors';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; //Auth JS bruger typisk en streng
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
  study: StudyProgram;
  phone: number;
  email: string;
  note: string | null;
  cardNumber: number;
};

export type SessionUser = {
  name: string;
  email: string;
  image?: string;
  id?: string;
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

export type BookingWithUser = Booking & {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    study: string;
  };
};

export type CreateBooking = {
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
  reason: string;
  room: {
    roomNum: number;
    name: string;
  };
};
