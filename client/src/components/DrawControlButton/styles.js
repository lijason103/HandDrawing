import styled from 'styled-components'

export const StyledButton = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #BBDEFB;
    cursor: pointer;
  }

  &.selected {
    background-color: #2196f3;
  }
`