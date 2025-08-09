import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';

import { createNote } from '../../lib/api';
import type { CreateNoteParams } from '../../lib/api';

import css from './NoteForm.module.css';

interface NoteFormProps {
  onCancel: () => void;
  onSubmit: (values: CreateNoteParams) => void
}

const initialValues: CreateNoteParams = {
  title: '',
  content: '',
  tag: 'Todo',
};

const validationSchema = Yup.object({
  title: Yup.string().min(3, 'Too short').max(50, 'Too long').required('Required'),
  content: Yup.string().max(500, 'Too long'),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required(),
});

export const NoteForm = ({ onCancel }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => mutate(values)}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" type="text" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            id="content"
            name="content"
            as="textarea"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
};
