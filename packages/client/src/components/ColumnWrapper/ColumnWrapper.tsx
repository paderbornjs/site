import styled from 'styled-components/macro'
import spacings from '../../style/spacings'

const ColumnWrapper = styled.div`
  @media (min-width: 768px) {
    column-gap: ${spacings[6]};
    column-count: 2;
  }
`

export default ColumnWrapper
