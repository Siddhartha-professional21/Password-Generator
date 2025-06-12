import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str = str + "0123456789"
    if(characterAllowed) str = str + "!@#$%^&*()_+"

    for(let i = 0 ; i < length ; i++){
      const randomIndex = Math.floor(Math.random() * str.length)
      const randomCharacter = str.charAt(randomIndex)
      pass = pass + randomCharacter
    }

    setPassword(pass)

  },[length,numberAllowed,characterAllowed])

  useEffect(()=>{
    generatePassword()
  },[generatePassword])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-xl rounded-2xl px-6 py-6 my-12 bg-gradient-to-br from-gray-900 to-gray-800 text-orange-400 border border-gray-700">

      <h1 className="text-white text-center text-2xl font-semibold mb-6">🔐 Password Generator</h1>

      <div className="flex items-center shadow-inner border border-gray-600 rounded-lg overflow-hidden mb-6 bg-gray-700">
        <input 
          type="text"
          value={password}
          className="outline-none w-full bg-transparent text-white placeholder-gray-400 py-2 px-4 text-sm"
          placeholder="Generated password"
          readOnly
          ref={passwordRef}
        />

        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-medium px-4 py-2 text-sm"
        >
          Copy
        </button>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <label htmlFor="length" className="font-medium">
            <span className="text-white">Length:</span> <span className="text-orange-400">{length}</span>
          </label>
          <input 
            type="range" 
            value={length}
            min={6}
            max={100}
            className="w-1/2 cursor-pointer accent-orange-400"
            id="length"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="number" className="text-white font-medium">Include Numbers</label>
          <input 
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed(prev => !prev)}
            id="number"
            className="accent-orange-400 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="charInput" className="text-white font-medium">Include Special Characters</label>
          <input 
            type="checkbox"
            checked={characterAllowed}
            onChange={() => setCharacterAllowed(prev => !prev)}
            id="charInput"
            className="accent-orange-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
