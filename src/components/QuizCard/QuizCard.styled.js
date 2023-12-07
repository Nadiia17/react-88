import styled from 'styled-components';

const getBorderColor = ({ theme, $level }) => {
  switch ($level) {
    case 'beginner':
      return theme.colors.beginner;
    case 'intermediate':
      return theme.colors.intermediate;
    case 'advanced':
      return theme.colors.advanced;
    default:
      return null;
  }
};

export const Container = styled.div`
  border: 3px solid ${getBorderColor};
  border-radius: 10px;
  padding: 8px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const Info = styled.p`
  margin: 0;
`;
