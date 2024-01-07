"use client"

import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"

export function SellerSiteHeader() {
  const pathname = usePathname()
  const displaySearchInput = pathname.startsWith('/seller-hub');

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        <MainNav />
          <div className="flex gap-x-4">
            <ThemeToggle />
            {displaySearchInput && <div className="">
            <Link href={`/seller-hub/join-us`}>
              <Button className='bg-purple-500 hover:bg-purple-600'>
                Register
              </Button>
            </Link>
          </div>}
        </div>
      </div>
    </header>
  )
}
