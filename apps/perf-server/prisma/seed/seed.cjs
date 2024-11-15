const { PrismaClient } = require('@prisma/client')
const data = require('./faker_data.json')

const prisma = new PrismaClient()
const main = async () => {

    for (user of data.users) {
        const {id, ...userDetails} = user
        await prisma.user.upsert({
            where: { id: id },
            update: {},
            create: userDetails
        })
    }

    console.log("Users Added Successfully!")
}
// ---- XX ----------------------------------------------

main().then(() => {
    console.log("Seeding completed Successfully!")
})
// ---- XX ----------------------------------------------
