import Input from "./Input.jsx";
import {hasMinLength, isEmail, isNotEmpty} from "../util/validation.js";
import useInput from "../hooks/useInput.js";

export default function Login() {
    const {
        value: emailValue,
        hasError: emailHasError,
        inputBlurHandler: emailBlurHandler,
        inputChangeHandler: emailChangeHandler
    } = useInput("", value => isEmail(value) && isNotEmpty(value))
    const {
        value: passwordValue,
        hasError: passwordHasError,
        inputBlurHandler: passwordBlurHandler,
        inputChangeHandler: passwordChangeHandler
    } = useInput("", value => hasMinLength(value, 12))

    const submitHandler = (event) => {
        event.preventDefault()

        console.log("Submitted!")
        console.log(emailValue, passwordValue)
    }

    return (
        <form onSubmit={submitHandler}>
            <h2>Login</h2>

            <div className="control-row">
                <Input label="Email" id="email" type="email" name="email"
                       onBlur={emailBlurHandler}
                       onChange={emailChangeHandler} defaultValue={emailValue}
                       error={emailHasError && "Please enter a valid email address"}/>

                <Input label="Password" id="password" type="password" name="password"
                       onBlur={passwordBlurHandler}
                       onChange={passwordChangeHandler} defaultValue={passwordValue}
                       error={passwordHasError && "Please enter a valid password"}/>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
