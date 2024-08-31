import {useAccordionContext} from "./Accordion.jsx";
import {useAccordionItemContext} from "./AccordionItem.jsx";

export default function AccordionContent({className, children}) {
    const {openItemId} = useAccordionContext();
    const id = useAccordionItemContext();

    const isOpen = openItemId === id;

    const classes = [className];
    if (isOpen)
        classes.push("open");

    return (
        <div className={classes.join(" ")}>
            {children}
        </div>
    )
}