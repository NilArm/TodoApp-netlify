import React, {useState, useEffect,useRef} from 'react';
import './css/ToDo.css';
import { MdDelete } from 'react-icons/md';
import {FiEdit3} from 'react-icons/fi';
import {AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,useDisclosure,Button,useToast} from '@chakra-ui/react'
function ToDo() {

  const[todo,setTodo]=useState("");
  const[tasks,setTasks]=useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const toast = useToast()

  useEffect(()=>{
    if(localStorage.getItem("localTodoTasks")){
      const storedList = JSON.parse(localStorage.getItem("localTodoTasks"))
      setTasks(storedList)
    }
  },[])

  const addTodo = (e) =>{
    if(todo){
        const newTodo = {id:new Date().toString(), title:todo}
        setTasks([...tasks,newTodo])
        localStorage.setItem("localTodoTasks",JSON.stringify([...tasks,newTodo]))
        setTodo("")
        toast({
                title: `Todo Added Successfully`,
                position: 'bottom-right',
                variant:'left-accent',
                status:'success',
                isClosable: true,
              })
    }
  }
  const handleDelete=(t)=>{
        const deleted = tasks.filter((tmp)=> tmp.id !== t.id);
        setTasks(deleted);
        localStorage.setItem("localTodoTasks",JSON.stringify(deleted));
        toast({
          title: `Todo Removed Successfully`,
          position: 'bottom-right',
          variant:'left-accent',
          status:'error',
          isClosable: true,
        })
  }

  const clearAll=()=>{
    onClose();
    setTasks([]);
    localStorage.setItem("localTodoTasks",JSON.stringify([]))
    toast({
      title: `All Cleared`,
      position: 'bottom-right',
      variant:'left-accent',
      status:'info',
      isClosable: true,
    })
  }
  return (
    <div className="bodyOfTodo"> 
      <h1 className='todoHeading'>Your todo's</h1>
      <div className="todoContainer">
        <div className='todoListItemContainer'>
          {
            tasks.map((t)=>(
              <div className='todoListItem' key={t.id}>
                  <span className='itemsTodo'>{t.title}</span><span className='itemsIconsSpan'><span className='itemsIcons'><FiEdit3/></span><span className='itemsIcons' ><MdDelete onClick={()=>handleDelete(t)}/></span></span>
              </div>
            ))
          }
        </div>
        <br />
        <div className='todoContainerEnd'>
        <input className='addTodoText' placeholder='Enter Todo' value={todo} type="text" onChange={(e)=>setTodo(e.target.value)}/>
        <button className='addTodoButton' onClick={addTodo}>Add Todo</button>
        </div>
      </div>
      <div>
        <button className='clearAllButton' onClick={onOpen}>Clear All</button>
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={clearAll} ml={3}>
                Clear All
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </div>
    </div>
  );
}

export default ToDo;
