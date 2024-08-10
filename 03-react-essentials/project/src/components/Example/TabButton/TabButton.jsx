import "../Example.css"

export default function TabButton({children, isActive, ...props}) {
    return (
        <li>
            <button className={isActive ? "active" : ""} {...props}>{children}</button>
        </li>
    )
}