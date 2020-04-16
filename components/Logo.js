import React from "react";
import styled from 'styled-components/native'

const Logo = ({text}) => (
    <Container>
      <Text>{text}</Text>
    </Container>
);

export default Logo;


const Container = styled.View`
  padding: 12px 16px 12px;
  height: 60px;
  background: rgb(52, 59, 71);
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  flex-direction: row;
  align-items: center;
  margin: 0 8px;
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
  color: #b8bece;
`;
