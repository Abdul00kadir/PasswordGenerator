import { useRef, useState, useCallback, useEffect, use} from 'react'

function App(){
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState("")
  const [addNmbr, setAddNmbr] = useState(false)  // use usesState to manage state variables
  const [addSmbl, setAddSmbl] = useState(false)  // Variables declare  

  const passwordref = useRef(null)

  const passwordGenerator = useCallback(()=>{                                //usecallback to memoize the function and manage dependencies
    let pass = ""
    let letters = "ABCDEFGIHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"       //Values for password and adding number and symbols
    if(addNmbr) letters += "1234567890"
    if(addSmbl) letters += "@#$&_-!"

    for(let i = 1; i<=length; i++){
    let char = Math.floor(Math.random() * letters.length)       // create password using normal forloop using Math()
    pass += letters.charAt(char)
    }
    setPassword(pass)
  }, [length, addNmbr, addSmbl, setPassword])

  const copypass = useCallback(() => {
    passwordref.current?.select();                                // Copy the password to clipboard and select copid text
    passwordref.current?.setSelectionRange(0, 100); 
    window.navigator.clipboard.writeText(password)
}, [password]);

  useEffect(()=>{
    passwordGenerator()
  }, [length, addNmbr, addSmbl, passwordGenerator])     // useEffect to call passwordGenerator function when dependencies change
  return(

    <div className='main'>
      <h1>Password Generator</h1>
      <div className="show_pass"> 
        <input type="text" value={password} placeholder='Password' readOnly ref={passwordref}/>     {/* Input field to show generated password */}
        <button onClick={copypass} className="copyButton">Copy</button>                          {/* Button for copy password */}
      </div>
      <div className='otherInput'>
        <div className="passRenge">
          <input onChange={(e) => {setLength(e.target.value)}} type="range" min={8} max={100} value={length}  /> {/* Range input to set password length */}
          <label>Length: {length}</label>
        </div>
        <div className="numberInpt">
          <input onChange={() => {
            setAddNmbr((prev) => !prev) 
          }} defaultChecked={addNmbr} type="checkbox" id="numberInput" />          {/* Checkbox to add numbers in password */}
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="symbolInpt">
          <input onChange={() => {
            setAddSmbl((prev) => !prev)
          }} defaultChecked={addSmbl} type="checkbox" id="symbolInput" />        {/* Checkbox to add symbols in password */}
                    <label htmlFor="symbolInput">Symbols</label>
        </div>
      </div>
    </div>    
  )
}

export default App
