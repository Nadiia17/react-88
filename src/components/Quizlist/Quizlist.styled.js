import styled from 'styled-components';

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const ListItem = styled.li`
  flex-basis: calc((100% - 32px) / 3);
  /* :hover,
  focus {
    background-color: orange;
  } */
`;
