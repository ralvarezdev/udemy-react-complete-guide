"use server"

import sql from 'better-sqlite3'
import slugify from "slugify";
import xss from "xss";
import * as fs from "node:fs";

const db = sql('meals.db')

export async function getMeals() {
    await new Promise(resolve=>setTimeout(()=>resolve(), 2000))

    //throw new Error('Failed to fetch meals')

    return db.prepare('SELECT * FROM meals').all()
}

export async function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal){
    meal.slug=slugify(meal.title, {lower:true})
    meal.instructions=xss(meal.instructions)

    console.log(meal.image)

    const extension=meal.image.name.split('.').pop()
    const fileName=[meal.slug,extension].join('.')

    const writeStream=fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage=await meal.image.arrayBuffer()
    writeStream.write(Buffer.from(bufferedImage), error =>{
        if(error)
            throw new Error('Failed to save image')
    })

    meal.image=`/images/${fileName}`

    db.prepare(`
        INSERT INTO meals VALUES (
            null,
            @slug,
            @title,
            @image,
            @summary,
            @instructions,
            @creator,
            @creator_email
        )
    `).run(meal)
}