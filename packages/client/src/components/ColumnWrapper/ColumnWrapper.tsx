import styled from 'styled-components/macro'

const ColumnWrapper = styled.div`
  @media (min-width: 768px) {
    column-gap: ${props => props.theme.space[6]}px;
    column-count: 2;
  }
`

export default ColumnWrapper
