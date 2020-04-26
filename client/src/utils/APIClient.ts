const baseUrl = 'http://3.88.167.229:5000';

const getDeviceId = (): string => {
  // @ts-ignore
  return Expo.Constants.deviceId;
};

export const urlTasks = `${baseUrl}/api/devices/${getDeviceId()}/tasks/`;
