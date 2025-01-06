import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data:[
                {name:"Computer Science"},
                {name:"Music"},
                {name:"Fitness"},
                {name:"Photography"},
                {name:"Videography"},
                {name:"Cooking"}
            ]
        });
        console.log("Successfully Added the categories to the database")
    } catch (error) {
        console.log("Error seeding the database categories", error)
    } finally{
        await database.$disconnect();
    }
}
main()