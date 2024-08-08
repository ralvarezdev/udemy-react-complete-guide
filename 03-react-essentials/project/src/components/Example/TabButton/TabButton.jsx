import "../Example.css"

export default function TabButton({children, onClick, isActive}){
    return (
        <li>
            <button className={isActive?"active":""} onClick={onClick}>{children}</button>
        </li>
    )
}