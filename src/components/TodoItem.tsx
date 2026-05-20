import { useState } from "react"

interface TodoType {
    title: string
    done: boolean
    content?: string
    due?: string
}

export function TodoItem({title, content, due, done}: TodoType) {
    const [isChecked, setIsChecked] = useState(done)
    const handleChecked = (event) => {
        setIsChecked(event.target.checked)
    }
    return (
        <div className='todo-item'>
            <span>
                <input type="checkbox" checked={isChecked} onChange={handleChecked}/>
                <span>{title}</span>
                <span>{!due ? "no date" : due}</span>
                <button type='button'>Remvoe</button>
            </span>
            <div>{content && content}</div>
        </div>
    )
}