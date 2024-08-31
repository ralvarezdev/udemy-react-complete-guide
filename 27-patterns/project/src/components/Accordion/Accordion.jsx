import {createContext, useContext, useState} from 'react';
import AccordionItem from "./AccordionItem.jsx";
import AccordionTitle from "./AccordionTitle.jsx";
import AccordionContent from "./AccordionContent.jsx";

const AccordionContext = createContext({
    openItemId: null,
    toggleItem: id => {
    }
});

export function useAccordionContext() {
    const context = useContext(AccordionContext);

    if (!context)
        throw new Error('useAccordionContext must be used within an AccordionContext.Provider')

    return context
}

export default function Accordion({children, className}) {
    const [openItemId, setOpenItemId] = useState(null);

    const toggleItem = id => setOpenItemId(prevOpenItemId => prevOpenItemId === id ? null : id)

    const contextValue = {openItemId, toggleItem}

    return (
        <AccordionContext.Provider value={contextValue}>
            <ul className={className}>
                {children}
            </ul>
        </AccordionContext.Provider>
    )
}

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;