"use client"

import { useRouter } from "next/navigation"
import { Filter, MenuIcon } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ProductFilters } from "@/components/product-filters"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Link from "next/link"

const sortOptions = [
  { name: "Newest", value: "/?date=desc" },
  { name: "Price, low to high", value: "/?price=asc" },
  { name: "Price, high to low", value: "/?price=desc" },
]

export function ProductSort() {

  const router = useRouter();

  return (
    <div className="flex items-center">

      <Select onValueChange={(value) => router.push(value, {scroll: false})}> {/*take note of this line, it should have been router.replace(value) and not router.push(value, {scroll: false}) in case of future issues*/}
        <SelectTrigger className="sm:w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.name} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Sheet>
        <SheetContent className="w-[300px]">
          
          <SheetHeader>
            <SheetTitle>Categories</SheetTitle>
            <SheetDescription>
              Narrow your product search using the options below.
            </SheetDescription>
          </SheetHeader>

          <ProductFilters />

          <form className="items-center lg:inline-flex pt-8">
            <Input
              id="search"
              name="search"
              type="search"
              autoComplete="off"
              placeholder="Search products..."
              className="h-9 lg:w-[300px]"
            />
          </form>
          
          <Link href={'/seller-hub'}>
            <Button className="mt-8 w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500">Sell on Alfa</Button>
          </Link>

        </SheetContent>

        <SheetTrigger className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
          <span className="sr-only">Filters</span>
          {/* <Filter className="h-5 w-5" aria-hidden="true" /> */}
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </SheetTrigger>
      </Sheet>
    </div>
  )
}
