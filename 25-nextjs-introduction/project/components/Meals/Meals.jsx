import {getMeals} from "@/lib/meals";
import MealsGrid from "@/components/Meals/MealsGrid";

export default async function Meals() {
    const meals = await getMeals()

    return (<MealsGrid meals={meals}/>)
}