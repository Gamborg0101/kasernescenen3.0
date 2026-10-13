interface Message {
  success: boolean;
  error: string | null;
}
export const successDeleteUser: Message = {
  success: true,
  error: null,
};

export const successUpdateUser: Message = {
  success: true,
  error: null,
};

export const successUpdateRoom: Message = {
  success: true,
  error: null,
};

export const successDeleteRoom: Message = {
  success: true,
  error: null,
};

export const successCreateRoom: Message = {
  success: true,
  error: null,
};
