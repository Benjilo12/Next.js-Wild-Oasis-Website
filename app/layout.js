import Logo from "./components/Logo";
import Navigation from "./components/navigation";

//we can export the metadata
export const metadata = {
  title: "The wild Oasis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
