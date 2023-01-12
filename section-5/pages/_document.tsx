import { Html, Head, Main, NextScript } from 'next/document';

/* 
    _document.tsx/jsx - файл, рендерится ТОЛЬКО на сервере,
    а значит, никакие обработчики событий тут доступны не будут.
    Используется для установления языка, шрифтов и другой кастомизации CSS.
*/

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
