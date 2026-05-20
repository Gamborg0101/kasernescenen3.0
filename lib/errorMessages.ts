interface Message {
  success: boolean;
  error: string | null;
}

export const sessionError: Message = {
  success: false,
  error: 'Der er ikke en aktiv session',
};

export const ratelimitError: Message = {
  success: false,
  error: 'Ratelimit reached',
};

export const failedToCreateBooking: Message = {
  success: false,
  error: 'Noget gik galt imens du forsøgte at lave en booking',
};
export const failedToDeleteBooking: Message = {
  success: false,
  error: 'Noget gik galt imens du forsøgte at slette en booking',
};

export const failedToCleanupDb: Message = {
  success: false,
  error: 'Noget gik galt imens du forsøgte at lave en oprydning af databasen',
};

export const failedToUpdateRoom: Message = {
  success: false,
  error: 'Noget gik galt imens du forsøgte at opdatere rummet',
};

export const failedToDeleteRoom: Message = {
  success: false,
  error: 'Noget gik galt imens du forsøgte at slette et rum',
};

export const failedToCreateRoom: Message = {
  success: false,
  error: 'Noget gik galt imens du forsøgte at lave et rum',
};

export const failedToCreateUser: Message = {
  success: false,
  error: 'Noget gik galt imens du forsøgte at oprette en bruger',
};

export const failedToDeleteUser: Message = {
  success: false,
  error: 'Noget gik galt imens du forsøgte at slette en bruger',
};

export const failedToUpdateUser: Message = {
  success: false,
  error: 'Noget gik galt imens du forsøgte at opdatere en bruger',
};

export const userIsNotAdmin: Message = {
  success: false,
  error: 'Noget gik galt imens du forsøgte at slette en bruger',
};

export const unauthorizedAccess: Message = { success: false, error: 'Unauthorized' };

export const failedToFindRoom: Message = { success: false, error: 'Noget gik galt med at finde rummet' };

export const success: Message = { success: true, error: null };
