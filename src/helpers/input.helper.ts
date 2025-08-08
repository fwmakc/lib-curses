import * as readline from 'readline';

/**
 * Prompts user for input, displaying an optional message, and applies a provided callback to input.
 *
 * @param {string} [printedString=''] - Message displayed to user when prompting for input.
 * @param {function} [callback=(key) => key] - A callback function that processes user input before resolving promise. Defaults to an identity function that returns input unchanged.
 * @returns {Promise<string>} A promise that resolves to processed user input.
 */
export async function input(
  printedString = '',
  callback: (key: string) => string = (key) => key,
): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(printedString, (answer) => {
      rl.close();
      const result: string = callback(answer);
      resolve(result);
    });

    rl.on('SIGINT', () => {
      rl.close();
      process.exit();
    });
  });
}
