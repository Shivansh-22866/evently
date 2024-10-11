import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import Card from './Card'
import Pagination from './Pagination'

type CollectionProps = {
    data: IEvent[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events',
    urlParamName?: string
}

const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    collectionType,
    urlParamName,
}: CollectionProps) => {
    return (
        <>
            {data.length > 0 ? (
                <div className='flex flex-col items-center gap-10'>
                    <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-10'>
                        {data.map((event, index) => {
                            // Debug individual event
                            console.log(`Event ${index}:`, event);
                            
                            const hasOrderLink = collectionType === 'Events_Organized'
                            const hidePrice = collectionType === 'My_Tickets'
                            
                            // Try different properties that might be unique
                            const eventKey = event?._id || 
                                           event?.id || 
                                           `event-${index}-${event?.title}` || 
                                           `event-${index}`;

                            return (
                                <li key={eventKey} className='flex justify-center'>
                                    <Card 
                                        event={event} 
                                        hasOrderLink={hasOrderLink} 
                                        hidePrice={hidePrice} 
                                    />
                                </li>
                            )
                        })}
                    </ul>
                    
                    {totalPages > 1 && (
                        <Pagination 
                            urlParamName={urlParamName} 
                            page={page} 
                            totalPages={totalPages} 
                        />
                    )}
                </div>
            ) : (
                <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 text-center'>
                    <h3 className="h3-bold">{emptyTitle}</h3>
                    <p className="p-medium-20">{emptyStateSubtext}</p>
                </div>
            )} 
        </>
    )
}

export default Collection