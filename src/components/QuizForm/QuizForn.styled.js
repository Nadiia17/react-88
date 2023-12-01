import styled from 'styled-components';
import { Form, ErrorMessage } from 'formik';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 300px;
`;

export const ErrMessage = styled(ErrorMessage)`
  color: ${props => props.theme.colors.error};
`;
