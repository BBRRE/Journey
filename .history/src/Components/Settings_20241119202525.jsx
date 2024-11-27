import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Settings = ({children}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);


  return (
    <>
    <div onClick={handleOpen} className=' hover:cursor-pointer '> 
      {children}
    </div>
    <Dialog
    open={open}
    handler={handleOpen}
    animate={{
      mount: { scale: 1, y: 0 },
      unmount: { scale: 0.9, y: -100 },
    }}
  >
    <DialogHeader>Settings</DialogHeader>
    <DialogBody className='font-bold px-10 pt-0'>
      Settings Comming soon...
      <br />
      <br />
      Tips when Uploading Logs:
      <li>
        Start your trip from when you get to the first activity like a hotel stay or resturant.
      </li>
      <li>
        Only include flights if its part of the journey: <br /> eg.. for a 1 week stay in Spain followed by a 2 week stay in the Uk, you would include the flight from Spain to the UK.
      </li>
      <li>
        Try to add as many images as you can
      </li>
      <br />
      <br />
      Contact me: <a href="https://twitter.com/__BRRE__" target='_blank' className='font-extralight italic'>Twitter: @__BRRE__</a>
    </DialogBody>
  </Dialog>
  </>
  )
}

export default Settings