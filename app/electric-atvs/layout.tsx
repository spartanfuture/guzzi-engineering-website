import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Spartan Mini Electric ATV | Quiet Adventure',
  description: 'Experience silent power with the Spartan Mini Electric ATV. Perfect for hunting, family adventures, and outdoor exploration.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
