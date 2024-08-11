export default function Button({children, Icon, mode = "filled", ...props}) {
    // Todo: Build this component!

    // !!! Important:
    // Wrap the icon with a <span className="button-icon"> to achieve the target look
    // Also wrap the children prop with a <span>

    const modeClassName = `${mode}-button`
    let iconClassName = ""
    let icon = null

    if (Icon !== undefined) {
        iconClassName = "icon-button"
        icon = (
            <span className="button-icon">
            <Icon></Icon>
        </span>
        )
    }

    return (
        <button className={["button", modeClassName, iconClassName].join(" ")} {...props}>
            {icon}
            {children}
        </button>
    )
}
