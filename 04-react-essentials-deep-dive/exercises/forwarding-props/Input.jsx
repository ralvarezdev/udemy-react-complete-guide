export default function Input({richText, ...props}) {
    // return a <textarea> if a richText prop is true
    // return an <input> otherwise
    // forward / set the received props on the returned elements

    let inputElement

    if (richText)
        inputElement = (<textarea {...props}></textarea>)
    else
        inputElement = (<input {...props}></input>)

    return (
        <>
            {inputElement}
        </>
    )
}
