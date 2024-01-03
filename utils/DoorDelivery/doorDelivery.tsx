import { Info } from "lucide-react"

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
import { getDeliveryWindow } from "../shared/shared"

export default function DoorDelivery() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Info className=" cursor-pointer h-4 w-4 hover:text-purple-600" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Door Delivery</DialogTitle>
          <DialogDescription>
            Delivery Fees ₦ 700. <br/>
            {getDeliveryWindow()}
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
