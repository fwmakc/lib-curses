import { clearScreen } from './clear_screen.helper';
import { position } from './position.helper';

/**
 * Initializes terminal screen by clearing it and positioning cursor at top-left corner.
 *
 * @returns {void}
 */
export function initScreen(): void {
  clearScreen();
  position(0, 0);
}
