/**
 * Clears terminal screen and moves cursor to top-left corner.
 *
 * @returns {void}
 */
export function clearScreen(): void {
  process.stdout.write('\x1b[2J');
  process.stdout.write('\x1b[0;0H');
}
