export const timeConverter = (time) => {
  const hour = time.getUTCHours();
  const min = time.getUTCMinutes() < 10 ? '0' + time.getUTCMinutes() : time.getUTCMinutes();
  const sec = time.getUTCSeconds() < 10 ? '0' + time.getUTCSeconds() : time.getUTCSeconds();
  return hour + ':' + min + ':' + sec;
};

export const dateConverter = (date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth()+1 < 10 ? '0' + (1+date.getUTCMonth()) : date.getUTCMonth();
  const day = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate();
  return day + '/' + month + '/' + year;
};

export const mergeDateTime = (date, time) => {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds());
};
