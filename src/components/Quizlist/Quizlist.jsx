import { QuizCard } from 'components/QuizCard/QuizCard';

export const Quizlist = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <QuizCard quiz={item} />
        </li>
      ))}
    </ul>
  );
};
