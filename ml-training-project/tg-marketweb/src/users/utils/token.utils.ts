import { randomInt } from 'crypto';

export function generateResetCode() {
  return randomInt(100000, 999999).toString();
}
