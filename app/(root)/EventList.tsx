import { getAllEvents } from "@/lib/actions/event.actions";
import Collection from "@/components/shared/Collection";

async function EventList({
  query,
  category,
  page
}: {
  query: string;
  category: string;
  page: number;
}) {
  const events = await getAllEvents({
    query,
    category,
    page,
    limit: 6
  });

  return (
    <Collection
      data={events?.data}
      emptyTitle="No Events Found"
      emptyStateSubtext="Come back later"
      collectionType="All_Events"
      limit={6}
      page={page}
      totalPages={2}
    />
  );
}

export default EventList;