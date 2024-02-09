import "@mantine/core/styles.css";

import { MantineProvider, createTheme } from "@mantine/core";
import type { AppProps } from "next/app";

export const theme = createTheme({
  primaryColor: "blue",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
