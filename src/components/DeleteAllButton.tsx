import { useRef, useState } from "react"
import { useTodosStore } from "../store";
import { ErrorMessage } from "../constants";

export function DeleteAllDialog() {
    const [opened, isOpened] = useState(false)
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const tasks = useTodosStore(state => state.todos)
    const deleteallTodos = useTodosStore((state) => state.deleteAllTodos)
    const addError = useTodosStore(state => state.addError)

    if (dialogRef.current) {
        if (opened) {
            dialogRef.current.showModal()
        } else {
            dialogRef.current.close()
        }
    }

    return (
        <>
            <button type="button" onClick={() => {
                if (tasks.length > 0) {
                    isOpened(true)
                } else {
                    addError(ErrorMessage.haveNotTasks)
                }
                }} >Remove All Task</button>

            <dialog ref={dialogRef}>
                <span>Want delete all your tasks?</span>
                <div>
                    <button type="button" onClick={() => {
                        isOpened(false)
                        deleteallTodos()
                    }}>Yes</button>
                    <button type="button" onClick={() => isOpened(false)} >No</button>
                </div>
            </dialog>
        </>
    )
}