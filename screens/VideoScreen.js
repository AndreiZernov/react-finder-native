import React from "react"
import styled from "styled-components"
import { Video } from 'expo-av'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, Dimensions } from "react-native"
import { WebView } from "react-native-webview"


let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

class VideoScreen extends React.Component {
  static navigationOptions = { headerShown: false };


  render() {
    const { navigation } = this.props

    const videoLink = navigation.getParam("videoLink")


    console.log(videoLink)
    return (
      <Container>
        <WebView
          source={{ uri: videoLink }}
        />
        <CloseView>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{ padding: 20 }}
          >
            <Ionicons name="ios-close" size={44} color="white" />
          </TouchableOpacity>
        </CloseView>
      </Container>
    );
  }
}

export default VideoScreen;

const Container = styled.View`
  flex: 1;
  background: black;
  align-items: center;
  justify-content: center;
`;

const CloseView = styled.View`
  position: absolute;
  top: 0px;
  right: 12px;
`;
