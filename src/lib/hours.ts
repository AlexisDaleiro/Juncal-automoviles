export type Slot = { open: string; close: string } | null;

const WEEKDAY: Slot = { open: "09:30", close: "18:00" };

/** Real schedule from juncalautomoviles.com. Index 0 is Sunday. */
export const SCHEDULE: Slot[] = [null, WEEKDAY, WEEKDAY, WEEKDAY, WEEKDAY, WEEKDAY, { open: "09:00", close: "13:00" }];

export const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

export const HOUR_GROUPS = [
  { label: "Lunes a viernes", days: [1, 2, 3, 4, 5], text: "09:30 – 18:00" },
  { label: "Sábados", days: [6], text: "09:00 – 13:00" },
  { label: "Domingos", days: [0], text: "Cerrado" },
];

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Weekday and minutes since midnight in Montevideo, whatever the visitor's own timezone is. */
export function montevideoClock(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Montevideo",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function openStatus(date: Date): { open: boolean; label: string } {
  const { day, minutes } = montevideoClock(date);
  const today = SCHEDULE[day];
  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: `Abierto ahora · hasta las ${today.close}` };
  }
  if (today && minutes < toMinutes(today.open)) {
    return { open: false, label: `Cerrado ahora · abre hoy a las ${today.open}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const slot = SCHEDULE[d];
    if (slot) return { open: false, label: `Cerrado ahora · abre ${i === 1 ? "mañana" : `el ${DAY_NAMES[d]}`} a las ${slot.open}` };
  }
  return { open: false, label: "Cerrado ahora" };
}
