'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { CreateNoteParams } from '@/lib/api';
import css from './NoteForm.module.css'

interface NoteFormProps {
  onCancel: () => void;
}

export const NoteForm = ({ onCancel }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const { mutate: addNote } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel();
    },
  });

  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
        tag: 'Todo' as CreateNoteParams['tag'],
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(3, 'Title must be at least 3 characters')
          .max(50, 'Title must be at most 50 characters')
          .required('Title is required'),
        content: Yup.string().max(500, 'Content must be at most 500 characters'),
        tag: Yup.mixed<CreateNoteParams['tag']>()
          .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
          .required('Tag is required'),
      })}
      onSubmit={(values, { resetForm }) => {
        addNote(values);
        resetForm();
      }}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field name="title" type="text" className={css.input}/>
          <ErrorMessage name="title" component="div" className={css.error}/>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field name="content" as="textarea" className={css.textarea}/>
          <ErrorMessage name="content" component="div" className={css.error}/>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field name="tag" as="select" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={css.error}/>
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>Create note</button>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};
