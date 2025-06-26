import moment from "moment";

export function formatDate(timestamp: number, format = "DD/MM/YYYY") {
  return moment.unix(timestamp).format(format);
}

export function formatDateTime(timestamp: number) {
  return moment.unix(timestamp).format("HH:mm, DD/MM/YYYY");
}
export function formatFullDateTime(timestamp: number) {
  return moment.unix(timestamp).format("HH:mm:ss, DD/MM/YYYY");
}

export function formatDateDay(timestamp: number) {
  return moment.unix(timestamp).format("dddd, MM-DD-YYYY");
}

export function generateTimeSeries(
  step: number,
  addHour = 0,
  format = "h:mm a"
) {
  const dt = new Date(1970, 0, 1);
  const rc = [];
  while (dt.getDate() === 1) {
    rc.push(moment(dt).add(addHour, "hour").format(format));
    // rc.push(dt.toLocaleTimeString('en-US'))
    dt.setMinutes(dt.getMinutes() + step);
  }
  return rc;
}

export function generateDuration() {
  let seconds = 300;
  const durations = [];
  while (seconds <= 60 * 60 * 12) {
    const h = Math.floor(seconds / 3600);
    const m = (seconds % 3600) / 60;
    let label = secondToMinuteString(seconds);
    durations.push({
      label,
      value: seconds,
    });
    seconds += 300;
  }
  return durations;
}

export function secondToMinuteString(second: number) {
  const h = Math.floor(second / 3600);
  const m = (second % 3600) / 60;
  let label = "";
  if (h == 0) {
    label = `${m}m`;
  } else {
    if (m == 0) {
      label = `${h}h`;
    } else {
      label = `${h}h ${m}m`;
    }
  }
  return label;
}

export function formatDateTimeToString(date: number | Date | string | null) {
  if (!date) return "-";
  let d: Date;
  if (typeof date === "number") {
    d = new Date(date < 10000000000 ? date * 1000 : date);
  } else {
    d = new Date(date);
  }
  if (isNaN(d.getTime())) return "-";
  return (
    d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) +
    ", " +
    d.toLocaleDateString("vi-VN")
  );
}
