"use client"

import { useRef, useState } from 'react';
import classes from './ImagePicker.module.css';
import Image from "next/image";

export default function ImagePicker({label,name}){
    const [pickedImage, setPickedImage] = useState();
    const imageInputRef = useRef();

    const pickImageHandler = () => {
        imageInputRef.current.click();
    }

    const pickedImageHandler = (event) => {
        const file = event.target.files[0];

        if (!file) {
         setPickedImage(null)
            return;
        }

        const fileReader= new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return(
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {pickedImage ?
                        (<Image src={pickedImage} alt="The image selected by the user." fill />)
                        :( <p>Please pick an image.</p>)}
                </div>
                <input
                    ref={imageInputRef}
                    className={classes.input}
                    onChange={pickedImageHandler}
                    type="file" id={name} accept=".jpg,.jpeg,.png" name={name}
                    required
                />
                <button className={classes.button} type="button" onClick={pickImageHandler}>Pick Image</button>
            </div>
        </div>
    )
}