import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { CreateNoteParams } from '@/lib/api';

interface NoteFormProps {
  onCancel: () => void;
  onSubmit: (values: CreateNoteParams) => void;
}

export const NoteForm = ({ onCancel, onSubmit }: NoteFormProps) => {
  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
        tag: 'Todo' as CreateNoteParams['tag'],
      }}
      validationSchema={Yup.object({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
        tag: Yup.string().required('Tag is required'),
      })}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      <Form>
        <div>
          <label htmlFor="title">Title</label>
          <Field name="title" type="text" />
          <ErrorMessage name="title" component="div" />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <Field name="content" as="textarea" />
          <ErrorMessage name="content" component="div" />
        </div>

        <div>
          <label htmlFor="tag">Tag</label>
          <Field name="tag" as="select">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" />
        </div>

        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};
