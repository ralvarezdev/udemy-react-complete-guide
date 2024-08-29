import {Suspense} from "react";
import classes from './page.module.css';
import Link from "next/link";
import Meals from "@/components/Meals/Meals";
import FallbackMeals from "@/components/Fallback/FallbackMeals";

export default async function MealsPage(){
    return (
        <>
            <header  className={classes.header}>
                <h1>Delicious meals, created{' '}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href={"/meals/share"}>Share Your Favorite Recipe</Link>
                </p>
            </header>
            <main className>
                <Suspense fallback={<FallbackMeals/>}>
                    <Meals/>
                </Suspense>
            </main>
        </>
    )
}