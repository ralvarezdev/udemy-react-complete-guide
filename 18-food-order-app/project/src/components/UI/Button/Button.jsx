export default function Button({children, textOnly, className = "", ...props}) {
    const buttonClasses = textOnly ? "text-button" : "button";

    return (
        <button className={[buttonClasses, className].join(" ")} {...props}>
            {children}
        </button>
    )
}