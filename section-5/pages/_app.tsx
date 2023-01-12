import type { AppProps } from 'next/app';

/* 
    _app.tsx/jsx - файл, необходимый для инициализации страницы.
    Именно этот файл, именно тут мы используем Layout и другие 
    возможности. Доступен после генерации страницы.
*/

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
