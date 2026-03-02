import { DefaultSession } from 'next-auth';
//https://authjs.dev/getting-started/typescript

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      isRegistered: boolean;
      googleId: string;
    } & DefaultSession['user'];
  }
}

export type UserInfo = {
  name: string;
  email: string;
  phone: number;
};

export type WeekViewProps = {
  userInfo: UserInfo;
};

type allBookings = {
  endTime: Date;
  roomId: number;
  startTime: Date;
}[];

export type WeekProps = {
  selectedWeek: Date;
  roomNumber: number;
  userInfo: UserInfo;
  allBookings: allBookings;
  handleHourClick: (hour: Date) => void;
};

export type BookingCardProps = {
  id: number;
  roomId: number;
  bookingId: string;
  userId: number;
  startTime: Date;
  endTime: Date;
};

export type RoomType = {
  name: string;
  roomNum: number;
  capacity: number;
  location: string;
}[];
