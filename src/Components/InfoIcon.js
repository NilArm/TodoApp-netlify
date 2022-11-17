import React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure
  } from '@chakra-ui/react';
import {InfoOutlineIcon} from '@chakra-ui/icons';
import './css/InfoIcon.css'

function InfoIcon(){
        const { isOpen, onOpen, onClose } = useDisclosure()
        const btnRef = React.useRef()
      
        return (
          <>
            <InfoOutlineIcon ref={btnRef} onClick={onOpen}/>
            <Drawer
              isOpen={isOpen}
              placement='right'
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>About ToDO</DrawerHeader>
      
                <DrawerBody>
                  <ul>
                    <li>
                        localstorage is in use.
                    </li>
                    <li>
                        you can perform following actions:
                        <ul className="innerUL">
                            <li>
                                Add tasks.
                            </li>
                            <li>
                                Edit tasks.
                            </li>
                            <li>
                                Delete tasks.
                            </li>
                            <li>
                                Mark as complete.
                            </li>
                            <li>
                                Clear all tasks.
                            </li>
                            <li>
                                Redo/Renew task.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Chakra-UI is used for :
                        <ul className="innerUL">
                            <li>
                                Add/Edit/Delete/Renewed Alerts.
                            </li>
                            <li>
                                Icons.
                            </li>
                            <li>
                                Clear All pop-up.
                            </li>
                            <li>
                                Side drawer. 
                            </li>
                        </ul>
                    </li>
                    <li>
                        This version is does not support mobile phone resolutions.
                    </li>
                  </ul>
                </DrawerBody>
      
                <DrawerFooter>
                  <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        )
}

export default InfoIcon