import DeviceInfo from 'react-native-device-info';

const baseUrl = 'http://3.88.167.229:5000';

const getDeviceId = (): string => {
  return DeviceInfo.getUniqueId();
};

export const urlTasks = `${baseUrl}/api/devices/${getDeviceId()}/tasks/`;
