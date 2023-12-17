import { Copy, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FreeDelivery() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Info className=" cursor-pointer h-4 w-4 hover:text-purple-600" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Free Shipping</DialogTitle>
          <DialogDescription>
            Currently, we only support Free Delivery only within UNICAL Campus.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="sm:justify-start">
          {/* <DialogClose asChild>
            <Button type="button" variant="default">
              Close
            </Button>
          </DialogClose> */}
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
  )
}
