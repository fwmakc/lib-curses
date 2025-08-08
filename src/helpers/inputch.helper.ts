import * as readline from 'readline';

/**
 * Prompts user for a single character input, displaying an optional message, and applies a provided callback to input.
 *
 * @param {string} [printedString=''] - Message displayed to user when prompting for input.
 * @param {function} [callback=(key) => key] - A callback function that processes user input before resolving promise. Defaults to an identity function that returns input unchanged.
 * @returns {Promise<string>} A promise that resolves to processed user input.
 */
export async function inputch(
  printedString = '',
  callback: (key: string) => string = (key) => key,
): Promise<string> {
  return new Promise((resolve) => {
    const { stdin, stdout } = process;
    stdin.setRawMode(true);
    stdout.write(printedString);

    const rl: any = readline.createInterface({
      input: stdin,
      output: undefined,
      terminal: true,
    });

    const handleKeyPress = (key: string) => {
      stdin.setRawMode(false);
      rl.input.off('data', handleKeyPress);
      rl.close();

      const result: string = callback(key.toString());

      resolve(result);
    };

    rl.input.on('data', handleKeyPress);

    rl.on('SIGINT', () => {
      rl.close();
      process.exit();
    });
  });
}
