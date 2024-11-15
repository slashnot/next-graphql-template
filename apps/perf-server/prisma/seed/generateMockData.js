import { faker } from '@faker-js/faker'
import fs from 'fs'

const mockData = {}

// -------------------------------------------------------------
const createUsers = (count) => {
    const createUser = (_,index) => {
        return {
            id: faker.string.uuid(),
            name: faker.person.firstName(),
            username: faker.internet.username(),
            email: faker.internet.email(),
        }
    }
    return faker.helpers.multiple(createUser, { count })
}
// -------------------------------------------------------------


const writeMockJson = async () => {
    const args = process.argv.slice(2);
    const count = args.length ? Number(args[0]) : 10

    mockData.users = createUsers(count)

    const content = JSON.stringify(mockData);
    const path = "./prisma/seed/faker_data.json"

    await fs.writeFile(path, content, err => {
        if (err) {
            console.error(err);
        }
    });
    console.log(`Generated ${count} records and written to ${path}.`);
}


writeMockJson()