import React from "react";
import styled from "styled-components";



class ResourcesScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <Text>Resources Screen</Text>
      </Container>
    );
  }
}

export default ResourcesScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
