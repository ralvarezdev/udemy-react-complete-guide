import {createPortal} from "react-dom";
import {useEffect, useRef} from "react";

export default function Modal({children, open, className = "", onClose}) {
    const dialogRef = useRef()

    useEffect(() => {
        const modal = dialogRef.current

        if (open)
            modal.showModal()

        return () => modal.close()
    }, [open]);

    return createPortal((
        <dialog ref={dialogRef} className={["modal", className].join(" ")} onClose={onClose}>
            {children}
        </dialog>
    ), document.querySelector("#modal"))
}