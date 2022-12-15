export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

export const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));

export const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));

export const range = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  a: number
) => lerp(x2, y2, invlerp(x1, y1, a));

export function decimalToHexString(number: number) {
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }
  return number.toString(16).toUpperCase();
}

export function leftpad(str, len, ch): string {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
}

export function decimalToUnicode(num: number): string {
  return String.fromCodePoint(num);
}
