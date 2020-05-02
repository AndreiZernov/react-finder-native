import React from "react";
import {
  TouchableOpacity,
  StatusBar,
  Linking,
  Dimensions,
  ScrollView,
  SafeAreaView
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import Article from "../components/Article";

const screenHeight = Dimensions.get("window").height;

class ArticleScreen extends React.Component {
  static navigationOptions = { headerShown: false };

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("article");
    return (
      <RootView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Container>
          <SafeAreaView>
            <ScrollView style={{ height: "100%" }}>
              <Cover>
                <Img source={{ uri: data.img }} />
                <Name>{data.title}</Name>
                <Duration>{data.duration}</Duration>
              </Cover>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: "absolute", top: 15, right: 20 }}
              >
                <CloseView>
                  <Ionicons name="ios-close" size={34} color="black" />
                </CloseView>
              </TouchableOpacity>
              <Content>
                <ContentText>{data.content}</ContentText>
              </Content>
            </ScrollView>
          </SafeAreaView>
        </Container>
      </RootView>
    );
  }
}

export default ArticleScreen;

const RootView = styled.View`
  background: rgb(20, 20, 20);
  flex: 1;
  padding-top: 30px;
`;

const Container = styled.View``;

const Cover = styled.View`
  height: 370px;
  justify-content: center;
  align-items: center;
`;

const Img = styled.Image`
  height: 100%;
  width: 100%;
  top: 0;
  position: absolute;
  justify-content: center;
  opacity: 0.5;
`;

const Name = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-align: center;
  position: absolute;
  top: 10px;
  left: 20px;
`;

const Duration = styled.Text`
  color: white;
  font-size: 17px;
  text-align: center;
  position: absolute;
  top: 40px;
  left: 20px;
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

const Content = styled.View`
  height: 100%;
  width: 100%;
  padding: 0 5%;
  margin: 20px auto 5%;
`;

const ContentText = styled.Text`
  width: 100%;
  text-align: justify;
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
`;
