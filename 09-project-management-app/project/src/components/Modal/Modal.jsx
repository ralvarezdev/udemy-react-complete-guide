import {createPortal} from "react-dom";
import {forwardRef, useImperativeHandle, useRef} from "react";
import Button from "../Button/Button.jsx";

const Modal = forwardRef(function Modal({children, buttonCaption}, ref) {
    const dialogRef = useRef()

    useImperativeHandle(ref, () => ({
        open: () => dialogRef.current.showModal()
    }))

    return createPortal((
        <dialog ref={dialogRef} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method="dialog" className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>
    ), document.querySelector("#modal-root"))
})

export default Modal