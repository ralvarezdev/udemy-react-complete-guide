import classes from "./NavLink.module.css";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function NavLink({href, children}) {
    const path = usePathname()

    const classNames = [classes.link]
    if (path.startsWith(href))
        classNames.push(classes.active)

    return (
        <Link href={href} className={classNames.join(" ")}>{children}
        </Link>
    )
}