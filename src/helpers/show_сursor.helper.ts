/**
 * Makes the terminal cursor visible.
 *
 * @returns {void}
 */
export function showCursor(): void {
  process.stdout.write('\x1b[?25h');
}
