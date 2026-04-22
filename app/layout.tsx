import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Detectives de Datos',
  description: 'Descubre patrones ocultos en datos reales — Actividades de estadística para el salón de clase',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
