import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react"
import NextNProgress from "nextjs-progressbar";
import { CartProvider, useCart } from "react-use-cart";
import Cart from "./cart";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
    <SessionProvider session={session}>
      <CartProvider>
      <NextNProgress color="#ff859d" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true}/>
        <Component {...pageProps} />
        <Toaster />
      </CartProvider>
    </SessionProvider>
    </>
  );
}

export default MyApp;
