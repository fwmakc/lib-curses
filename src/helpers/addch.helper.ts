import { position } from './position.helper';

/**
 * Outputs a given string at specified position on screen.
 *
 * @param {any} string - String or value to be output.
 * @param {number} [x=-1] - X coordinate for output. Default is no specific position.
 * @param {number} [y=-1] - Y coordinate for output. Default is no specific position.
 * @returns {void}
 */
export function addch(string: any, x = -1, y = -1): void {
  position(x, y);
  process.stdout.write(String(string));
}
