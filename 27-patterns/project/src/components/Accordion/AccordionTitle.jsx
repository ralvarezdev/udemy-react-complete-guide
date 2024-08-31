import {useAccordionContext} from "./Accordion.jsx";
import {useAccordionItemContext} from "./AccordionItem.jsx";

export default function AccordionTitle({children, className}) {
    const {toggleItem} = useAccordionContext()
    const id = useAccordionItemContext()

    return (
        <h3 className={className} onClick={() => toggleItem(id)}>{children}</h3>
    )
}