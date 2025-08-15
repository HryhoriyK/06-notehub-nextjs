'use client';

import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { FetchNotesResponse } from '@/lib/api';

import { SearchBox } from '@/components/SearchBox/SearchBox';
import { Pagination } from '@/components/Pagination/Pagination';
import { NoteList } from '@/components/NoteList/NoteList';
import { Modal } from '@/components/Modal/Modal';
import { NoteForm } from '@/components/NoteForm/NoteForm';

import css from './page.module.css';

interface NotesProps {
  initialData: FetchNotesResponse;
}

export default function Notes({ initialData }: NotesProps) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const perPage = 12;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearch],
    queryFn: () => fetchNotes(currentPage, perPage, debouncedSearch),
    placeholderData: initialData,
    initialData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>

      {!isLoading && !isError && Array.isArray(data?.notes) && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onCancel={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
