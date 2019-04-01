import styled from 'styled-components/macro'

const ColumnWrapper = styled.div`
  @media (min-width: 768px) {
    column-gap: ${props => props.theme.spacings[6]};
    column-count: 2;
  }
`

export default ColumnWrapper
