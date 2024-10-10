'use server'

import { CreateEventParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Event from "../database/models/event.model"
import Category from "../database/models/category.model"

const populateEvent = async(query: any) => {
    return query.populate({path: 'organizer', model: User, select: '_id firstName lastName'})
    .populate({path: 'category', model: Category, select: '_id name'})
}

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

export const getEventById = async (eventId: string) => {
    try {
        await connectToDatabase()
        const event = await populateEvent(Event.findById(eventId))

        if(!event) {
            throw new Error('Event not found')
        }

        return JSON.parse(JSON.stringify(event))
    }

    catch(err) {

    }
}