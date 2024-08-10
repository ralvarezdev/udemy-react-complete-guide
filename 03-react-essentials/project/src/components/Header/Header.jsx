import "./Header.css"
import reactImg from "../../assets/react-core-concepts.png";

const reactDescriptions = ["Fundamental", "Crucial", "Core"]

function generateRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function generateDescription() {
    return reactDescriptions[generateRandomInt(reactDescriptions.length)]
}

export default function Header() {
    const description = generateDescription()

    return (
        <header>
            <img src={reactImg} alt="Stylized atom"/>
            <h1>React Essentials</h1>
            <p>
                {description} React concepts you will need for almost any app you are going to build!
            </p>
        </header>
    )
}