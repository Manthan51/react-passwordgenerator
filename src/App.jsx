import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
  <div className="w-full max-w-lg backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6">

```
<h1 className="text-3xl font-bold text-center text-white mb-6">
  🔐 Password Generator
</h1>

<div className="flex overflow-hidden rounded-xl bg-white/10 border border-white/20 mb-6">
  <input
    type="text"
    value={password}
    placeholder="Generated Password"
    readOnly
    ref={passwordRef}
    className="w-full bg-transparent text-white px-4 py-3 outline-none"
  />

  <button
    onClick={copyPasswordToClipboard}
    className="bg-gradient-to-r from-blue-500 to-purple-600 px-5 text-white font-medium hover:opacity-90 transition"
  >
    Copy
  </button>
</div>

<div className="space-y-4 text-white">

  <div>
    <div className="flex justify-between mb-2">
      <label>Password Length</label>
      <span className="font-semibold text-cyan-400">
        {length}
      </span>
    </div>

    <input
      type="range"
      min={6}
      max={100}
      value={length}
      onChange={(e) => setLength(e.target.value)}
      className="w-full cursor-pointer"
    />
  </div>

  <div className="flex justify-between">

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={numberAllowed}
        onChange={() => setNumberAllowed((prev) => !prev)}
        className="w-4 h-4"
      />
      Numbers
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={charAllowed}
        onChange={() => setCharAllowed((prev) => !prev)}
        className="w-4 h-4"
      />
      Special Characters
    </label>

  </div>

</div>
```

  </div>
</div>

    
  )
}

export default App