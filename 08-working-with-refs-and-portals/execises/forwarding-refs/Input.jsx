import React from "react"

const Input = React.forwardRef(function Input({label, ...props}, ref) {
    // Todo: Accept forwarded ref and "connect" it to the <input> element
    return (
        <p className="control">
            <label>{label}</label>
            {/* Todo: "Forward" remaining props to <input> element */}
            <input ref={ref} {...props}/>
        </p>
    );
})

export default Input
