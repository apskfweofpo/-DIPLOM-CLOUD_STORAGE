export class DateFormatter {
  static formateDate(dateString: string): string {
    const [day, month, year, hours, minutes, seconds] = dateString
      .split(/[.: ]/)
      .map((i) => Number(i));

    const date = new Date(
      year ?? 0,
      month - 1 ?? 0,
      day ?? 0,
      hours ?? 0,
      minutes ?? 0,
      seconds ?? 0,
    );

    return date.toISOString();
  }
}
