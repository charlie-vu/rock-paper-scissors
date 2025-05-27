import "@/styles/globals.scss";

export const metadata = {
  title: "Frontend Mentor | Rock, Paper, Scissors",
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

        <div className="attribution position-absolute bottom-0">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
          Coded by <a href="https://www.frontendmentor.io/profile/charlie-vu" target="_blank">Ngoc-Van Vu</a>.
        </div>
      </body>
    </html>
  );
}
