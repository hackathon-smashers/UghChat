import type { ReactNode } from "react"
import "./styles.css"
import Providers from "./providers"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head></head>
      <Providers>
        <body>
          <main className="flex w-full min-h-full">{children}</main>
        </body>
      </Providers>
    </html>
  )
}
