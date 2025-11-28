import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-main",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Web Dev Mastery | High-Level Learning",
  description: "Master Web Development from Zero to Hero. 50 Interactive Levels. Pure HTML, CSS, and JavaScript.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable}`}>
        {children}
      </body>
    </html>
  );
}
