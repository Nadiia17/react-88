import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const quizSchema = Yup.object().shape({
  topic: Yup.string().min(3, 'Too short!').required('Topic is required!'),
  time: Yup.number()
    .min(10, 'Min 10 minutes')
    .max(45, 'Maximum 45 minutes')
    .required('Time is required'),

  questions: Yup.number()
    .min(3, 'Min 3 questions')
    .max(10, 'Maximum 10 questions')
    .required('Number of questions is required'),
});

export const QuizForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{
        topic: '',
        time: 0,
        questions: 0,
        level: 'beginner',
      }}
      validationSchema={quizSchema}
      onSubmit={(values, actions) => {
        onAdd(values);
        actions.resetForm();
      }}
    >
      <Form>
        <label>
          Topic
          <Field name="topic" placeholder="Quiz topic" />
          <ErrorMessage name="topic" />
        </label>

        <label>
          Time
          <Field name="time" type="number" />
          <ErrorMessage name="time" />
        </label>

        <label>
          Questions
          <Field name="questions" type="number" />
          <ErrorMessage name="questions" />
        </label>

        <label>
          Level
          <Field as="select" name="level">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Field>
          <ErrorMessage name="level" />
        </label>

        <button type="submit">Add quiz</button>
      </Form>
    </Formik>
  );
};
