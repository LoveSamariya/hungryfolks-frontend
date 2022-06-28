import { PAGE_SIZE, __PERMANENT__KEY__ } from '../constants/constants';

const millisecondsInDay = 24 * 3600 * 1000;
export function permanentKey(key) {
  return __PERMANENT__KEY__ + key;
}

export function diffInDays(d1, d2) {
  const diffInMilliseconds = new Date(d1) - new Date(d2);
  const positiveDiffInMilliseconds = Math.abs(diffInMilliseconds);
  const diffInDays = positiveDiffInMilliseconds / millisecondsInDay;
  const diffInDaysInteger = Math.floor(diffInDays);
  return diffInDaysInteger;
}
