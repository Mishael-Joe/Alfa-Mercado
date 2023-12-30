"use client"

import { useRouter, useSearchParams } from "next/navigation"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "./ui/button"
import Link from "next/link"

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "school supplies", label: "School Supplies" },
      { value: "fashion", label: "Fashion" },
      { value: "body care products", label: "Body Care" },
      { value: "phone accessories", label: "Phones Accessories" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "xs", label: "X-Small" },
      { value: "s", label: "Small" },
      { value: "m", label: "Medium" },
      { value: "l", label: "Large" },
      { value: "xl", label: "X-Large" },
      { value: "one-size", label: "One Size" },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "black", label: "Black" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
    ],
  },
]

export function ProductFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const searchValues = Array.from(searchParams.entries())
  //  {" "}

  return (
    <form className="sticky top-20">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section, i) => (
        <Accordion key={i} type="single" collapsible>
          <AccordionItem value={`item-${i}`}>

            <AccordionTrigger>
              <span>
              {section.name}
                <span className="ml-1 text-xs font-extrabold uppercase text-gray-400">
                  {searchParams.get(section.id) ? `(${searchParams.get(section.id)})` : ''}
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox 
                    id={`filter-${section.id}-${optionIdx}`} 
                    checked={searchValues.some(([key, value]) => key === section.id && value === option.value)}
                    onClick={(event) => {
                      const params = new URLSearchParams(searchParams)
                      const checked = event.currentTarget.dataset.state === 'checked'
                      checked ? params.delete(section.id) : params.set(section.id, option.value)
                      router.replace(`/?${params.toString()}`)
                    }}
                    />

                    <label
                     htmlFor={`filter-${section.id}-${optionIdx}`}
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>

          </AccordionItem>
        </Accordion>
      ))}

      <Link href={'/join-us'}>
        <Button className="mt-8 hidden lg:inline-flex w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500">Sell on Alfa</Button>
      </Link>
    </form>
  )
}
