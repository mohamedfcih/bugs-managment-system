import { map, take, timer, finalize } from 'rxjs';

export function convertSecondsToTime(seconds: number) {
  let minutes: any = Math.floor(seconds / 60);
  let extraSeconds: any = seconds % 60;

  minutes = minutes < 10 ? '0' + minutes : minutes;
  extraSeconds = extraSeconds < 10 ? '0' + extraSeconds : extraSeconds;

  return `${minutes}:${extraSeconds}`;
}

export function counterDown(from: number, onFinish: Function) {
  return timer(0, 1000).pipe(
    take(from + 1),
    map((s) => convertSecondsToTime(from - s)),
    finalize(() => onFinish())
  );
}

export function diffBetweenTowDates(
  date1: Date,
  date2: Date,
  diffIn: 'day' | 'min' | 'hour' | 'second' = 'second'
): number {
  // milliseconds
  let diffTime = Math.abs(date1.getTime() - date2.getTime());

  switch (diffIn) {
    case 'day':
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    case 'hour':
      return Math.ceil(diffTime / (1000 * 60 * 60));
    case 'min':
      return Math.ceil(diffTime / (1000 * 60));
    case 'second':
      return Math.ceil(diffTime / 1000);
  }
}
