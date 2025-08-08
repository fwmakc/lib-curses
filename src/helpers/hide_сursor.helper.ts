/**
 * Hides terminal cursor.
 *
 * @returns {void}
 */
export function hideCursor(): void {
  process.stdout.write('\x1b[?25l');
}
