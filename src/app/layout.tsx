import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="theme-color" content="#0b5fff" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="9f9784df-8594-4ed0-b42f-b16ee3581cfc"></script>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
