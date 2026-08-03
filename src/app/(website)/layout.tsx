import { Footer } from '@/shared/components/footer'
import { Header } from '@/shared/components/header'
import React from 'react'

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}
