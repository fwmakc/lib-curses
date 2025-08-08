Простая работа с консолью.

Библиотка javascript/typescript (ES6) для node.js.

- работа через потоки ввода/вывода,
- работа со встроенными функциями ноды,
- привычные методы input, print, getch,
- бесконечный цикл loop с возможностью выхода,
- асинхронная пауза.

Нужно понимать, что библиотека написана для простой и быстрой работы. Она не является заменой curses из c и c++.

Если вам нужен более мощный функционал, то стоит обратить внимание на другие библиотеки.

# Установка

```
npm install lib-curses
```

или

```
yarn add lib-curses
```

# Начало работы

Можно импортировать методы как с отдельные функции:

```
import { initScreen, print } from 'lib-curses';

initScreen();
print('Hello world');
```

или вызывать их как статические методы объекта:

```
import * as curses from 'lib-curses';

curses.initScreen();
curses.print('Hello world');
```

# Список методов

**addch(string: any, x = -1, y = -1): void**

Вывод символов в консоль.

Вторым и третьим необязательными параметрами можно задать смещение по осям x и y относительно верхнего левого угла.

Отсчет начинается с нуля. Любые значения меньше нуля игнорируют смещение. И таким образом, вывод идет в текущем месте расположения курсора.

**clearLine(y: number): void**

Очищает строку.

**clearScreen(): void**

Очищает экран.

**async getch(): Promise<Buffer>**

Считывает ввод с клавиатуры. Возвращает объект Buffer.

> Обратите внимание, что любые сочетания клавиш (ctrl + c) и специальные вызовы (SIGINT) не будут обработаны автоматически. Поэтому вам придется обрабатывать их самостоятельно.

**hideCursor(): void**

Скрывает курсор.

**initScreen(): void**

Подготовка экрана консоли к работе.

**async input(printedString = '', callback: (key: string) => string = (key) => key): Promise<string>**

Требует ввод строки в консоль. Возвращает введенное пользователем значение.

Первым необязательным параметром можно передать строку, которая будет выведена перед запросом ввода.

Вторым необязательным параметром можно задать callback-функцию, которая будет обрабатывать полученное значение и возвращать его.

**async inputch(printedString = '', callback: (key: string) => string = (key) => key): Promise<string>**

Требует ввод символа в консоль.

Отличие от **input** только в том, что ввод ожидает нажатия любой клавиши и возвращает ее значение.

**async loop(callback: () => Promise<boolean>, milliseconds = 0): Promise<void>**

Запускает цикл.

В цикле вызывается функция callback, пока она возвращает true.

Цикл завершится, когда функция callback вернет false.

Вторым необязательным аргументом можно передать задержку между итерациями.

**position(x = -1, y = -1): void**

Задает позицию курсора по осям x и y относительно верхнего левого угла.

Отсчет начинается с нуля. Любые значения меньше нуля игнорируют смещение. И таким образом, вывод идет в текущем месте расположения курсора.

**print(string: any, x = -1, y = -1): void**

Вывод строки в консоль.

Отличие от **addch** только в том, что в конце вывода добавляется символ перевода строки.

**showCursor(): void**

Возвращает показ курсора.

**async wait(milliseconds: number): Promise<void>**

Пауза для асинхронного кода.

# Обработка ошибок

Все вызовы возвращают ошибки как есть, без дополнительных перехватов и обработки. Поэтому оборачиваем в try/catch самостоятельно.

```
async function customInput(question) {
  try {
    const userInput = await input(question);

    return { userInput };
  } catch (error) {
    return { error };
  }
}
```

# Примеры

# Простой вывод

Вывод символов:

```
addch('Hello world');
```

Вывод строки:

```
print('Hello world');
```

Посмотрим как это работает, если повторить несколько вызовов последовательно.

Например:

```
addch('1');
addch('2');
print('3');
print('4');
addch('5');
addch('6');
print('7');
print('8');
```

выведет в консоль:

```
123
4
567
8
```

# Вывод в заданное место

Такой пример со счетчиком:

```
let count = 0;

setInterval(() => {
  clearLine(4);
  print(`Counter: ${count}`, 0, 4);
  count++;
}, 1000);
```

выведет в консоль:

```




Counter: 0
```

# Запрос ввода пользователя

```
const userInput = input();
```

Выведет в консоль:

```
> _
```

Можно задать первый параметр. Например:

```
const userInput = input('What is your name: ');
```

Выведет в консоль:

```
> What is your name: _
```

# Ввод строки с обработкой

Следующий пример будет передавать только числа от 1 до 100 и 0 как неверное значение.

```
const string = await input('Input 1-100: ', (string) => {
  let answer = parseInt(string, 10) || 0;

  if (answer < 1) {
    answer = 0;
  }

  if (answer > 100) {
    answer = 0;
  }

  process.stdout.write(answer + '\n');
  return String(answer);
});

console.log(`Input: ${string}`);
```

# Ввод символа с обработкой

Следующий пример задает ввод по-умолчанию, если никакой символ не был введен. По клавише **Esc** он прерывает выполнение программы.

```
const key = await inputch('(Y)es or (N)o: ', (key) => {
  if (key === '\x1B') {
    process.exit();
  }
  let answer = key.toString().trim().toLowerCase();
  if (!answer || /[^a-z]+/iu.test(answer)) {
    answer = 'y';
  }
  process.stdout.write(answer + '\n');
  return answer;
});

console.log(`Input: ${key}`);
```

# Ввод в заданном месте

Следующий пример задает ввод на пятой строке. Важно помнить, что смещение работает только после инициализации экрана консоли.

```
initScreen();
position(0, 4)
const string = await input('Write something: ');
console.log(`Input: ${string}`);
```

# Пример обработки inputch

В данном примере предлагается ввести максимум 5 символов. Ввод будет прерван после нажатия клавиши **Enter**.

```
let inputString = '';
let readyString = '';

initScreen();

const handler = (key: string) => {
  if (key === '\x0d') {
    readyString = inputString;
  }

  if (/\W/iu.test(key)) {
    return '';
  }

  inputString += key;
  if (inputString.length > 5) {
    inputString = key;
  }

  return key;
};

while (!readyString) {
  position(0, 0);
  const printedString = `Input max 5 symbols: ${`${inputString}_____`.slice(0, 5)}`;

  const key = await inputch(printedString, (key) => {
    position(printedString.length, 0);

    return handler(key);
  });
}

print(`> ${readyString}`, 0, 1);
```

# Обработка ввода с клавиатуры

Ввод с клавиатуры обрабатывается таким образом:

```
const key = await getch();
console.log(key);
```

Важно помнить, что метод **getch** не обрабатывает отдельно специальные вызовы (например SIGINT). Поэтому вам придется самостоятельно предусмотреть выход из программы.

Например, если вызывать **getch** в цикле, можно обработать прерывание так:

```
let infinite = true;

while (infinite) {
  const key = await getch();

  console.log({
    uint8: new Uint8Array(key),
    x16: [...new Uint8Array(key)].map((code) =>
      `${'0' + code.toString(16)}`.slice(-2),
    ),
    utf8: key.toString(),
    hex: key.toString('hex'),
  });

  if (key === '\x03') {
    infinite = false;
  }
}
```

# Пример обработки getch

В данном примере мы будем управлять символом **@** с помощью курсора.

Нажатие клавиш **Enter**, **Esc** или **Ctrl** + **C** прервет процесс.

```
const keys = {
  enter: '\x0d',
  esc: '\x1b',
  sigint: '\x03',
  up: '\x1B[A',
  down: '\x1B[B',
  left: '\x1B[D',
  right: '\x1B[C',
};

const w = 10, h = 10;
let x = 0, y = 0;

initScreen();
hideCursor();

addch('@', x, y);

let infinite = true;

while (infinite) {
  const code = await getch();
  const key = code.toString();

  const oldX = x, oldY = y;

  if (key === keys.up) { y -= 1; }
  if (key === keys.down) { y += 1; }
  if (key === keys.left) { x -= 1; }
  if (key === keys.right) { x += 1; }

  if (x < 0) { x = 0; }
  if (x > w) { x = w; }
  if (y < 0) { y = 0; }
  if (y > h) { y = h; }

  if (x !== oldX || y !== oldY) {
    addch(' ', oldX, oldY);
    addch('@', x, y);
  }

  if ([keys.enter, keys.esc, keys.sigint].includes(key)) {
    infinite = false;
  }
}
```

# Пример бесконечного цикла

Предположим, у нас есть асинхронная функция **main**:

```
async function main(): Promise<boolean> {
  if (...) {
    return false;
  }
  return true;
}
```

Запускать эту функцию в цикле можно самым простым способом, даже прямо из тела индексного файла:

```
loop(main);
```

Эквивалентный способ:

```
(async () => loop(main))();
```

Если функция **main** синхронная:

```
function main(): boolean {
  if (...) {
    return false;
  }
  return true;
}
```

запускать ее нужно внутри асинхронного вызова:

```
loop(async () => main());
```

Т.к. данный цикл асинхронный, то несколько циклов подряд будут запускаться параллельно.

Если вы хотите запускать их последовательно, вам нужно вызывать их через **await**:

```
await loop(...);
await loop(...);
```

Можно сделать обработку ошибок:

```
loop(() => main().catch((e) => {
  console.error(e);
  return false;
}));
```

# Пример паузы в цикле

Самый простой и правильный способ - задать паузу вторым аргументом:

```
loop(main, 1000)
```

Можно также добавлять задержки внутри кода исполняемой логики, например в функции main:

```
async function main(): Promise<boolean> {
  if (...) {
    return false;
  }

  await wait(1000);

  return true;
}
```

# Лицензия

Лицензия MIT, 2025
