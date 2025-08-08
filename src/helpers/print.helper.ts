import { addch } from './addch.helper';

/**
 * Prints a string to terminal at a specified position (x, y), followed by a newline.
 *
 * @param {any} string - String to be printed. This will be converted to a string, if necessary.
 * @param {number} [x=-1] - Horizontal position (column) where string should be printed. Default is no specific position.
 * @param {number} [y=-1] - Vertical position (row) where string should be printed. Default is no specific position.
 * @returns {void}
 */
export function print(string: any, x = -1, y = -1): void {
  string = String(string) + '\n';
  addch(string, x, y);
}
