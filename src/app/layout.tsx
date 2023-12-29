import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {NotesProvider} from '@/context/NoteContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Note list',
  description: 'Using Nextjs, Typescript and prisma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotesProvider>{children}</NotesProvider>
      </body>
    </html>
  )
}
