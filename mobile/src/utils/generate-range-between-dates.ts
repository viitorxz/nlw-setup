import dayjs from 'dayjs';

export function generateRangeBetweenDates(): Date[] {
  const startDate = dayjs().startOf('year');
  const endDate = new Date();

  let dateRange: Date[] = [];
  let compareDate = startDate;

  while(compareDate.isBefore(endDate)) {
    dateRange.push(compareDate.toDate())
    compareDate = compareDate.add(1, 'day')
  }

  return dateRange;
}
