import type { ReactNode } from "react"
import "./styles.css"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head></head>
      <body>
        <main className="flex w-full min-h-full">{children}</main>
      </body>
    </html>
  )
}
