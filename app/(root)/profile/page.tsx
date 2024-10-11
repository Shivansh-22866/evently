import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { getUser } from '@/lib/actions/user.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth, User } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({searchParams}: SearchParamProps) => {
    const { userId } = auth()

    const user = await getUser(userId!)

    const ordersPage = Number(searchParams?.ordersPage || 1)
    const eventsPage = Number(searchParams?.eventsPage || 1)
    const organizedEvents = await getEventsByUser({userId: user?._id, limit: 4, page: eventsPage})
    const orders = await getOrdersByUser({userId: user?._id, limit: 4, page: ordersPage})
    const orderedEvents = orders?.data.map((order: IOrder) => order.event) || []

  return (
    <>
        <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
            <div className='wrapper flex items-center justify-center sm:justify-between'>
                <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
                <Button asChild className='button hidden sm:flex'>
                    <Link href="/#events">
                        Explore
                    </Link>
                </Button>
            </div>
        </section>

        <section className='wrapper my-8'>
            <Collection
                data={orderedEvents}
                emptyTitle="No Tickets purchased yet"
                emptyStateSubtext="No Worries! Plenty of events to explore"
                collectionType="My_Tickets"
                urlParamName="ordersPage"
                limit={3}
                page={ordersPage}
                totalPages={orders?.totalPages}
            />
        </section>

        <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
            <div className='wrapper flex items-center justify-center sm:justify-between'>
                <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
                <Button asChild className='button hidden sm:flex'>
                    <Link href="/events/create">
                        Create New Events
                    </Link>
                </Button>
            </div>
        </section>

         <section className='wrapper my-8'>
            <Collection
                data={organizedEvents?.data}
                emptyTitle="No Events created yet"
                emptyStateSubtext="Let us help you create your first event"
                collectionType="Events_Organized"
                urlParamName="eventsPage"
                limit={6}
                page={eventsPage}
                totalPages={organizedEvents?.totalPages}
            />
        </section>

    </>
  )
}

export default ProfilePage