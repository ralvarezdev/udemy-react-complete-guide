import {getMealImage} from "../../https.js";
import {useContext} from "react"
import {currencyFormatter} from "../../util/formatting.js";
import Button from "../UI/Button/Button.jsx";
import CartContext from "../../store/CartContext.jsx";

export default function MealItem({meal}) {
    const cartContext = useContext(CartContext);

    const addItemHandler = item => cartContext.addItem(item, 1)

    return (
        <li className="meal-item">
            <article>
                <img src={getMealImage(meal.image)} alt={meal.name}/>
                <div><h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={() => addItemHandler({...meal, quantity: 1})}>Add to Cart</Button>
                </p>
            </article>
        </li>
    )
}