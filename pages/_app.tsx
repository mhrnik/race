import React from "react";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

// import Web3 from "web3";
// function getLibrary(provider) {
//  return new Web3(provider);
// }

// import { Web3ReactProvider } from "@web3-react/core";
// we can return to this when we want to integrate metamask
// function MyApp({ Component, pageProps }) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//     // <Web3ReactProvider getLibrary={getLibrary}>
//     //   <Component {...pageProps} />
//     // </Web3ReactProvider>
//   )
// }

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
