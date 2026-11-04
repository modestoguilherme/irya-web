export const PORTAL_TIME_ZONE = "America/Sao_Paulo";

export function formatPortalDate(
  value: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" },
): string {
  if (!value) return "-";
  let date: Date;
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    // Datas sem hora representam um dia de calendario, sem conversao para o dia anterior.
    const [year, month, day] = value.split("-").map(Number);
    date = new Date(Date.UTC(year, month - 1, day, 15));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return "-";
  } else {
    date = value instanceof Date ? value : new Date(value);
  }
  if (!Number.isFinite(date.getTime())) return "-";
  return new Intl.DateTimeFormat("pt-BR", { ...options, timeZone: PORTAL_TIME_ZONE }).format(date);
}
