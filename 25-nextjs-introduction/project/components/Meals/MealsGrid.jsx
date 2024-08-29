import MealItem from "@/components/Meals/MealItem";
import classes from './MealsGrid.module.css';

export default function MealsGrid({meals}){
    return (
        <ul className={classes.meals}>
            {meals.map(meal => (
                <li key={meal.id}><MealItem {...meal}/></li>
            ))}
        </ul>
    )
}