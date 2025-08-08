/**
 * Executes a given callback function in a loop until the callback returns false.
 *
 * @param {function} callback - A function that returns a boolean value.
 *                              The loop will continue as long as this function returns true.
 * @returns {Promise<void>} A promise that resolves when the loop is exited.
 *
 * @example
 * // Example of using the loop function
 * loop(async () => {
 *   const continueLooping = await someAsyncConditionCheck();
 *   return continueLooping; // Loop continues while this is true
 * });
 */
export async function loop(callback: () => Promise<boolean>): Promise<void> {
  let infinite = true;
  // eslint-disable-next-line no-constant-condition
  while (infinite) {
    infinite = await callback();
  }
}
