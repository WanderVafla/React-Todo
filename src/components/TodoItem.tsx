interface TodoType {
    title: string
    done: boolean
    content?: string
    due?: string
}

export function TodoItem({title, content, due, done}: TodoType) {
    return (
        <div className='todo-item'>
            <div>
                <input type="checkbox" checked={done} />
                <span>{title}</span>
                <span>{!due ? "no date" : due}</span>
                <button type='button'>Remvoe</button>
            </div>
            <span>{content && content}</span>
        </div>
    )
}