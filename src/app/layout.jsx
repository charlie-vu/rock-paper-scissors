import "@/styles/globals.scss";

export const metadata = {
  title: "Frontend Mentor | Multi-step form",
  description: "FE Mentor Challenge",
  icons: {
    icon: "/favicon-32x32.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
