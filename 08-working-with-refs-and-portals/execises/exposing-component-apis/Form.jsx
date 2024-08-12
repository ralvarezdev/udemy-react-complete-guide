import React from "react"

const Form = React.forwardRef(function Form(props, ref) {
    const formRef = React.useRef()

    React.useImperativeHandle(ref, () => ({
        clear: () => formRef.current.reset()
    }))

    return (
        <form ref={formRef}>
            <p>
                <label>Name</label>
                <input type="text"/>
            </p>

            <p>
                <label>Email</label>
                <input type="email"/>
            </p>
            <p id="actions">
                <button>Save</button>
            </p>
        </form>
    );
})

export default Form;
