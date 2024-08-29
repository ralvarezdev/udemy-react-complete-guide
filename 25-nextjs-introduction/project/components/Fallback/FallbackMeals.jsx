import classes from './FallbackMeals.module.css';

export default function FallbackMeals() {
    return (
        <p className={classes.loading}>Fetching meals...</p>
    )
}