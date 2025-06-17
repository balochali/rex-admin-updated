import localFont from "next/font/local";

export const ghetoshark = localFont({
  src: "../fonts/ghetoshark/ghetoshark.woff",
  display: "swap",
  weight: "100 900",
  style: "italic",
  variable: "--font-gheto",
});

export const satoshiMedium = localFont({
  src: "../fonts/satoshi/Satoshi-Variable.woff2",
  display: "swap",
  weight: "100 900",
  style: "italic",
  variable: "--font-gheto",
});

//satoshiItalic
export const satoshiItalic = localFont({
  src: "../fonts/satoshi/Satoshi-VariableItalic.woff2",
  display: "swap",
  weight: "100 900",
  style: "italic",
  variable: "--font-satoshi",
});

//aptos font styles
export const aptos = localFont({
  src: [
    {
      path: "../fonts/aptos/Aptos.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/aptos/aptos-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-aptos",
});
