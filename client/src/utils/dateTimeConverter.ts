export const timeConverter = (time: Date) => {
  const hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
  const min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  const sec = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
  return hour + ':' + min + ':' + sec;
};

export const dateConverter = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? '0' + (1 + date.getMonth()) : date.getMonth();
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return day + '/' + month + '/' + year;
};

export const mergeDateTime = (date: Date, time: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
    time.getHours(), time.getMinutes(), time.getSeconds());
};
