import { DefaultSession } from 'next-auth';
//https://authjs.dev/getting-started/typescript

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      isRegistered: boolean;
      googleId: string;
    } & DefaultSession['user'];
  }
}

export type UserInfo = {
  name: string;
  email: string;
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
