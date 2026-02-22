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
