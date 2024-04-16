import { useCallback, useState,useRef,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[length,setLength]=useState(8);
  const[number,setNumber]=useState(false);
  const[character,setCharacter]=useState(false);
  const[password,setPassword]=useState("");
  const passwordRef=useRef(null);
  function passwordGenerator() {
    
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num="0123456789";
    let symbol="~!@#$%^&*()_"
    if(number){
      str=str+num;
      console.log(str);
    }
    if(character){
      str=str+symbol;
    }
    
    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str[char];
    }
    
    setPassword(pass)
  }
  const handlePasswordGenerator=useCallback(()=>{
    console.log("in callback");
    passwordGenerator();
    console.log("after");
  },[length,number,character,setPassword])
  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, setPassword])

  const copyPasswordtoClipboard=useCallback(()=>{
    passwordRef.current?.select();
    password.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password)

  },[password])
  return (
    <div>
      <div className='bg-gray-400 p-5 rounded-xl'>
      <h1 className='text-white'>Password Generator</h1>
        <input
        type='text'
        
        placeholder='Password' 
        value={password}
        onChange={handlePasswordGenerator}
        readOnly
        ref={passwordRef}
        >
        </input>
        <button className='bg-red-400 p-1' onClick={handlePasswordGenerator}>Genrate</button>
        <button className='bg-blue-400 p-1' onClick={copyPasswordtoClipboard}>Copy</button>
        <div>
       
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        
      </div>
     
     
        <input
        type='checkbox'
        checked={number}
        onChange={()=>setNumber(!number)}
        >
        </input>
        <label>Number</label>
        <input
        type='checkbox'
        checked={character}
        onChange={()=>setCharacter(!character)}
        >
        </input>
        <label>Character</label>
        
      </div> 
      
    </div>
  )
}

export default App
        
