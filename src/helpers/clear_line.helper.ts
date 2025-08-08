/**
 * Clears specified line in terminal.
 *
 * @param {number} y - Y coordinate of line to be cleared.
 * @returns {void}
 */
export function clearLine(y: number): void {
  process.stdout.write(`\x1b[${y + 1};0H\x1b[K`);
}
