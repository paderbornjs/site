import { Text } from 'rebass'
import styled from 'styled-components/macro'

export const EventDate = styled(Text)`
  font-style: normal;
  position: relative;

  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    border-bottom: 12px solid ${({ theme }) => theme.colors.accentMBright};
  }

  @media (min-width: 550px) {
    &::before {
      border-bottom: 14px solid ${({ theme }) => theme.colors.accentMBright};
    }
  }

  @media (min-width: 768px) {
    &::before {
      border-bottom: 16px solid ${({ theme }) => theme.colors.accentMBright};
    }
  }
`
