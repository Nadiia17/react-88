import { QuizCard } from 'components/QuizCard/QuizCard';
import { List, ListItem } from './Quizlist.styled';

export const Quizlist = ({ items, onDelete }) => {
  return (
    <List>
      {items.map(item => (
        <ListItem key={item.id}>
          <QuizCard quiz={item} onDelete={onDelete} />
        </ListItem>
      ))}
    </List>
  );
};
