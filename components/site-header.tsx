"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Edit, ShoppingBag } from "lucide-react"
import { useStateContext } from "@/context/stateContext"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const {totalQuantity} = useStateContext();
  
  const defaultSearchQuery = searchParams.get('search') ?? ''
  
  if (pathname.startsWith('/studio')) return null;

  const displaySearchInput = pathname.endsWith('/');

  const handleSubmit = (event : React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search');
    router.push(`/?search=${searchQuery}`)
    router.refresh();
    // console.log(searchQuery);
  }
  // console.log('displaySearchInput',displaySearchInput);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">

        <MainNav />

        {displaySearchInput && <form  onKeyUp={handleSubmit} className="hidden items-center lg:inline-flex">
          <Input
            id="search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search products..."
            className="h-9 lg:w-[300px]"
            defaultValue={defaultSearchQuery}
          />
        </form>}

        <div className="flex items-center space-x-1">
          <Link href="/cart">
            <Button size="sm" variant="ghost">

              <ShoppingBag className="h-5 w-5" />

              <span className="ml-2 text-sm font-bold">{totalQuantity}</span>

              <span className="sr-only">Cart</span>
              
            </Button>
          </Link>

          <ThemeToggle />

          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton>
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>

          {process.env.NODE_ENV === 'development' && (
            <Link href={'/studio'}>
              <Button size="sm" variant="ghost">
                <Edit className="h-5 w-5" />
              </Button>
            </Link>
          )}
          
        </div>
      </div>
    </header>
  )
}
