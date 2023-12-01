import { Container, Info, InfoWrapper } from './QuizCard.styled';
import { FaTrashCan } from 'react-icons/fa6';

export const QuizCard = ({
  quiz: { id, topic, level, time, questions },
  onDelete,
}) => {
  return (
    <Container level={level}>
      <h2>{topic}</h2>
      <button onClick={() => onDelete(id)}>
        Delete
        <FaTrashCan />
      </button>
      <InfoWrapper>
        <Info>Level: {level}</Info>
        <Info>Time: {time} min</Info>
        <Info>Questions: {questions}</Info>
      </InfoWrapper>
    </Container>
  );
};
