import {createPortal} from "react-dom"

export default function Toast({message}) {
    return createPortal((
        <aside className="toast" data-testid="toast">
            <p>{message}</p>
        </aside>
    ), document.body);
}
