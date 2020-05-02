import React from "react";
import styled from "styled-components";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

class VideoScreen extends React.Component {
  static navigationOptions = { headerShown: false };

  render() {
    const { navigation } = this.props;
    const videoLink = navigation.getParam("videoLink");

    return (
      <RootView>
        <Container>
          <View>
            <WebView source={{ uri: videoLink }} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <CloseView>
              <Ionicons name="ios-close" size={36} color="black" />
            </CloseView>
          </TouchableOpacity>
        </Container>
      </RootView>
    );
  }
}

export default VideoScreen;

const RootView = styled.View`
  background: rgb(20, 20, 20);
  flex: 1;
  padding-top: 32px;
`;

const Container = styled.View``;

const View = styled.View`
  height: 100%;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 22px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;
