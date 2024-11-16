'use server'

import { apolloHandler } from "./main-apollo";
import { yogaHandler } from "./main-yoga-express";
import cron from 'node-cron'

const runScheduler = async () => {
    try {
        cron.schedule('*/1 * * * *', async () => {
            const date = new Date()
            let count = `${date.getHours()}:${date.getMinutes()}`

            console.log('')
            console.log('######################################')
            console.log('#                                    #')
            console.log(`# Running scheduler every 1 minutes # ${count}`)
            console.log('#                                    #')
            console.log('######################################')
            console.log('')
            // Perform your action here
        });
    } catch (error) {
        console.log(error)
    }
}
// Start Cron 
runScheduler()

export { yogaHandler as handler }