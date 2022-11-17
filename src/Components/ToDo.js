import React, {useState, useEffect,useRef} from 'react';
import './css/ToDo.css';
import { MdDelete ,MdAutorenew } from 'react-icons/md';
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
  const[checkedTasks,setCheckedTasks]=useState([]);
  // const[checkedPresent,setCheckedPresent]=useState("noDisplay");
  const[editing,setEditing]=useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const toast = useToast()

  useEffect(()=>{
    if(localStorage.getItem("localTodoTasks")){
      const storedList = JSON.parse(localStorage.getItem("localTodoTasks"))
      setTasks(storedList)
    }
    if(localStorage.getItem("localCheckedTodoTasks")){
      const storedList2 = JSON.parse(localStorage.getItem("localCheckedTodoTasks"));
      setCheckedTasks(storedList2);
    }
  },[])
//make a seperate function to handle the checkbox effect with arguments of target value and todo id
  const addTodo = (e) =>{
    if(todo && editing){
      setEditing(false);
    }
    if(todo){
        const newTodo = {id:new Date().toString(), title:todo,checkClass:""}
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
  const handleDeletechecked=(t)=>{
    const deleted = checkedTasks.filter((tmp)=> tmp.id !== t.id);
    setCheckedTasks(deleted);
    localStorage.setItem("localCheckedTodoTasks",JSON.stringify(deleted));
    toast({
      title: `Todo Removed Successfully`,
      position: 'bottom-right',
      variant:'left-accent',
      status:'error',
      isClosable: true,
    })
}
  const handleDeleteUnchecked=(t)=>{
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

  const handleEdit=(t)=>{
    if(!editing){
      setTodo(t.title);
      setEditing(true);
      const deleted = tasks.filter((tmp)=> tmp.id !== t.id);
      setTasks(deleted);
      localStorage.setItem("localTodoTasks",JSON.stringify(deleted));
      }
      else{
        console.log("Editing");
      }
  }

  const taskRenew=(t)=>{
    const deleted = checkedTasks.filter((tmp)=> tmp.id !== t.id);
    setTasks([...tasks,t]);
    setCheckedTasks(deleted);
    localStorage.setItem("localTodoTasks",JSON.stringify([...tasks,t]))
    localStorage.setItem("localCheckedTodoTasks",JSON.stringify(deleted));
    toast({
      title: `Todo Renewed Successfully`,
      position: 'bottom-right',
      variant:'left-accent',
      status:'success',
      isClosable: true,
    })
  }

  const handleCheck=(t)=>{
    const deleted = tasks.filter((tmp)=> tmp.id !== t.id);
    localStorage.setItem("localTodoTasks",JSON.stringify([...deleted]))
    localStorage.setItem("localCheckedTodoTasks",JSON.stringify([...checkedTasks,t]));
    setTasks(deleted);
    setCheckedTasks([...checkedTasks,t]);
    
  }
  const clearAll=()=>{
    onClose();
    setTasks([]);
    setCheckedTasks([]);
    localStorage.setItem("localTodoTasks",JSON.stringify([]));
    localStorage.setItem("localCheckedTodoTasks",JSON.stringify([]))
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
                    <span style={{alignItems:'center',display:'flex',justifyContent:'center'}}><input className='todoCheckBox' onClick={()=>handleCheck(t)} type="checkbox"/></span><span>{t.title}</span><span className='itemsIconsSpan'><span className='itemsIcons'><FiEdit3 onClick={()=>handleEdit(t)}/></span><span className='itemsIcons' ><MdDelete onClick={()=>handleDeleteUnchecked(t)}/></span></span>
              </div>
            ))
          }
          <div>
          <div className={checkedTasks.length===0?"noDisplay":"yesDisplay"}>
            ------------Checked-----------
          </div>
          <div className='todoListItemContainer'>
          {
            checkedTasks.map((t)=>(
              <div className='todoListItem' key={t.id}>
                    <span style={{alignItems:'center',display:'flex',justifyContent:'center'}}></span><span className='checkedClass'>{t.title}</span><span className='itemsIconsSpan'><span className='itemsIcons'><MdAutorenew onClick={()=>taskRenew(t)}/></span><span className='itemsIcons' ><MdDelete onClick={()=>handleDeletechecked(t)}/></span></span>
              </div>
            ))
          }
        </div>
        </div>
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
