import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function formatTime(date) {
  return format(new Date(date), "HH:mm:ss");
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
}

export function getCurrentHour() {
  return format(new Date(), "HH:mm:ss")
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}
