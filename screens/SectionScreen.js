import React from "react";
import styled from "styled-components";
import { Button } from 'react-native'

class SectionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <Text>Section Screen</Text>
        <Button title="Close" onPress={() => {
          this.props.navigation.goBack()
        }} />
      </Container>
    );
  }
}

export default SectionScreen;

const Container = styled.View`
  background: rgb(27, 31, 38);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
