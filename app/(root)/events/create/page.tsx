import EventForm from "@/components/shared/EventForm";
import { getUser } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const CreateEvent = async () => {

  const {userId} : {userId: string | null} = auth()
  let mongoUser = null

  if (userId) {
    mongoUser = await getUser(userId)
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={mongoUser?._id} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
