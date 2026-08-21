import "./globals.css";
import { Poppins, Roboto_Slab } from "next/font/google";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import PopupManager from "./components/PopupManager.jsx";
import Script from "next/script"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "P. R. Pote Patil College of Agriculture, Amravati.",
  description: "P. R. Pote Patil College of Agriculture, Amravati.",
  icons: {
    icon: "/agriculture.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NPKGZVRJ');
          `}
        </Script>
      </head>
      <body className={poppins.className}>
        <Header fontClass={robotoSlab.className} />
        {children}
        <PopupManager />
        <Footer />
      </body>
    </html>
  );
}
