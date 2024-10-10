'use server'

import { CreateEventParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Event from "../database/models/event.model"

export const createEvent = async({event, userId, path} : CreateEventParams) => {
    try {
        await connectToDatabase()

        // Find user by clerkId instead of _id
        const organizer = await User.findOne({ clerkId: userId })

        if(!organizer) {
            throw new Error('Organizer not found')
        }

        const newEvent = await Event.create({
            ...event, 
            category: event.categoryId, 
            organizer: organizer._id  // Use MongoDB _id here
        })

        return JSON.parse(JSON.stringify(newEvent))
    }
    catch(err) {
        handleError(err)
    }
}