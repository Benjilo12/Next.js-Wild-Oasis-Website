import Logo from "./_components/Logo";
import Navigation from "@/app/_components/navigation";
import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";

//configure fonts
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

//we can export the metadata
export const metadata = {
  // title: "The wild Oasis",
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis", // Corrected from 'default'
  },
  description:
    "Luxurious cabin hotel, located in the heart of Ghana-Volta region, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}
      >
        <header>
          <Logo />
          <Navigation />
        </header>
        {children}
        <footer>Copyright by the wild Oasis</footer>
      </body>
    </html>
  );
}
