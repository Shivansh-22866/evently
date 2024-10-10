import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions"
import { getUser } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const {userId} = auth()
  
  // Get the MongoDB user document that matches the Clerk ID
  let mongoUser = null
  if (userId) {
    mongoUser = await getUser(userId)
  }
  const event = await getEventById(id)

  console.log(event)
  console.log(userId)

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm 
          type="Update" 
          event={event}
          eventId={event._id}
          userId={mongoUser?._id} 
        />
      </div>
    </>
  )
}

export default UpdateEvent