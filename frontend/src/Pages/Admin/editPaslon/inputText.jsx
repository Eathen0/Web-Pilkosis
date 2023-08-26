import { useState } from "react"

export default function InputText({ handleBlur, name, type, area }) {
    const [inputValue, setInputValue] = useState("")
    if (area) {
        return <textarea onChange={e => setInputValue(e.target.value)} onBlur={() => handleBlur(data => {return {...data, [name]: inputValue}})} value={inputValue} className='border resize-none' name={name} rows={10}></textarea>
    } else {       
        return <input onChange={e => setInputValue(e.target.value)} onBlur={() => handleBlur(data => {return {...data, [name]: inputValue}})} value={inputValue} className='border' name={name} type={type} />
    }
}