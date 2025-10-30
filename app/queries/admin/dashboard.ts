import { useQueries } from '@tanstack/react-query';
import { useFetchAllUsers } from '@/app/queries/admin/fetch-users';
import { useFetchAllCafes } from '@/app/queries/fetch-cafes';
import { useFetchAllLocations } from '@/app/queries/fetch-locations';
import { useFetchEvents } from '@/app/queries/get-events';

export function useFetchAllAdminData() {
  const results = useQueries({
    queries: [
      {
        queryKey: ['all-users'],
        queryFn: useFetchAllUsers().queryFn,
      },
      {
        queryKey: ['all-cafes'],
        queryFn: useFetchAllCafes().queryFn,
      },
      {
        queryKey: ['all-locations'],
        queryFn: useFetchAllLocations().queryFn,
      },
      {
        queryKey: ['all-events'],
        queryFn: useFetchEvents().queryFn,
      },
    ],
  });

  const [usersQuery, cafesQuery, locationsQuery, eventsQuery] = results;

  const isLoading =
    usersQuery.isLoading ||
    cafesQuery.isLoading ||
    locationsQuery.isLoading ||
    eventsQuery.isLoading;

  const isError =
    usersQuery.isError ||
    cafesQuery.isError ||
    locationsQuery.isError ||
    eventsQuery.isError;

  const error =
    usersQuery.error ||
    cafesQuery.error ||
    locationsQuery.error ||
    eventsQuery.error;

  return {
    users: usersQuery.data,
    cafes: cafesQuery.data,
    locations: locationsQuery.data,
    events: eventsQuery.data,
    isLoading,
    isError,
    error,
  };
}
