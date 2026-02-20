export type UserInfo = {
  name: string;
  email: string;
};

export type WeekViewProps = {
  userInfo: UserInfo;
};

export type WeekProps = {
  selectedWeek: Date;
  roomNumber: number;
  userInfo: UserInfo;
};
