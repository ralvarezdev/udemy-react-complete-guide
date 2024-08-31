import {useRef, useState} from "react";

const THRESHOLD = 300

export default function SearchableList({items, itemKey, children}) {
    const lastChange = useRef(null)
    const [searchTerm, setSearchTerm] = useState("")

    const searchItems = items.filter(item => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()))

    const changeHandler = (event) => {
        if (lastChange.current)
            clearTimeout(lastChange.current)

        lastChange.current = setTimeout(() => {
            lastChange.current = null
            setSearchTerm(event.target.value)
        }, THRESHOLD)
    }

    return (
        <div className="searchable-list">
            <input type="search" placeholder="Search" onChange={changeHandler}/>
            <ul>
                {searchItems.map((item, index) => <li key={itemKey(item)}>{children(item)}</li>)}
            </ul>
        </div>
    )
}