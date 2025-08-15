import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../lib/api';
import type { FetchNotesResponse } from '../lib/api';

export const useFetchNotes = (
  currentPage: number,
  perPage: number,
  search?: string,
  initialData?: FetchNotesResponse
) => {
  return useQuery<FetchNotesResponse>({
    queryKey: ['notes', currentPage, perPage, search],
    queryFn: () => fetchNotes(currentPage, perPage, search),
    initialData,
    placeholderData: keepPreviousData,
  });
};
