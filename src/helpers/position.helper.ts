/**
 * Moves terminal cursor to a specified position (x, y).
 *
 * @param {number} [x=-1] - Horizontal position (column). Default is no action.
 * @param {number} [y=-1] - Vertical position (row). Default is no action.
 * @returns {void}
 */
export function position(x = -1, y = -1): void {
  if (x >= 0 || y >= 0) {
    process.stdout.write(`\x1b[${y + 1};${x + 1}H`);
  }
}
