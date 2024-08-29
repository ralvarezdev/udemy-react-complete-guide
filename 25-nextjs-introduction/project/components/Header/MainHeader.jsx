"use client"

import Link from "next/link";
import logoImg from "@/assets/logo.png";
import classes from "./MainHeader.module.css";
import Image from "next/image";
import MainHeaderBackground from "@/components/Header/MainHeaderBackground";
import NavLink from "@/components/Nav/NavLink";

export default function MainHeader() {
    return (<>
            <MainHeaderBackground/>
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    <Image src={logoImg} alt="A plate with food on it" priority/>
                    NextLevel Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        {[["/meals", "Browse Meals"], ["/community", "Foodies Community"]].map(element => {
                            const [href, children] = element
                            return (
                                <li key={href}>
                                    <NavLink href={href}>{children}</NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </header>
        </>
    )
}