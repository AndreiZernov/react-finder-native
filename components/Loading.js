import React from 'react'
import styled from 'styled-components/native'


export default function LoadingData() {
  return (
    <Container>
      <Loading>Data Loading...</Loading>
    </Container>
  )
}

const Container = styled.View`
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(89, 190, 255, 0.15);
  margin-left: 20px;
  margin-top: 20px;
  overflow: hidden;
`
const Loading = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
`;
