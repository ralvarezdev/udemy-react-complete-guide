import Input from "../Input/Input"
import {useRef} from "react";
import Modal from "../Modal/Modal.jsx";

export default function NewProject({onAdd, onCancel}) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();
    const modalRef = useRef()

    const saveOnClick = () => {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const dueDate = dueDateRef.current.value;

        for (const input of [title, description, dueDate])
            if (input.trim() === '') {
                modalRef.current.open();
                return;
            }

        onAdd({title, description, dueDate});
    }

    return (
        <>
            <Modal ref={modalRef} buttonCaption="Close">
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">Oops.. It looks like you forgot to enter a value</p>
                <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button>
                    </li>
                    <li>
                        <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                                onClick={saveOnClick}>Save
                        </button>
                    </li>
                </menu>

                <div>
                    <Input label={"Title"} ref={titleRef} type="text"/>
                    <Input label={"Description"} ref={descriptionRef} type="text" isTextArea/>
                    <Input label={"Due Date"} ref={dueDateRef} type="date"/>
                </div>
            </div>
        </>
    )
}