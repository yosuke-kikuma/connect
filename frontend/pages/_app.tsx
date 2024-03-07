import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/src/state/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

// import { AuthContextProvider } from "@/src/state/AuthContext";

// function App({ Component, pageProps }) {
//   return (
//     <AuthContextProvider>
//       <Component {...pageProps} />
//     </AuthContextProvider>
//   );
// }
