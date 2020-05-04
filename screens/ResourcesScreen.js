import React from "react";
import {
  Linking,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { DataItemsContext } from "../contexts/dataItemsContext";
import {
  PodcastsIcon,
  ResourcesIcon,
  JobSearchIcon,
  HtmlCssIcon,
} from "../components/Icons";
import LoadingData from "../components/LoadingData";
import { Ionicons } from "@expo/vector-icons";
import { _goToURL } from "../data/LinkFunc";

const RecourcesList = [
  {
    name: "resources",
    icon: <ResourcesIcon />,
    color: "rgba(244, 151, 168, 0.3)",
  },
  {
    name: "job_search",
    icon: <JobSearchIcon />,
    color: "rgba(160, 235, 216, 0.3)",
  },
  {
    name: "html_css",
    icon: <HtmlCssIcon />,
    color: "rgba(249, 167, 114, 0.3)",
  },
  {
    name: "podcasts",
    icon: <PodcastsIcon />,
    color: "rgba(185, 209, 251, 0.3)",
  },
];

class ResourcesScreen extends React.Component {
  static navigationOptions = { headerShown: false };
  static contextType = DataItemsContext;

  render() {
    const { navigation } = this.props;
    return (
      <RootView>
        <Background
          source={require("../assets/background6.jpg")}
          resizeMode="cover"
        />
        {this.context.loading ? (
          <LoadingData />
        ) : (
          <Container>
            <SafeAreaView>
              <ScrollView
                style={{ height: "100%" }}
                showsVerticalScrollIndicator={false}
              >
                <Title>Resources Page</Title>

                {navigation.getParam("home") === "home" && (
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ position: "absolute", top: 15, right: 20 }}
                  >
                    <CloseView>
                      <Ionicons name="ios-close" size={36} color="black" />
                    </CloseView>
                  </TouchableOpacity>
                )}

                {RecourcesList.map((resource) => (
                  <Wrapper
                    key={resource.name}
                    style={{ backgroundColor: resource.color }}
                  >
                    <SubWrapper>
                      {resource.icon}
                      <Subtitle>
                        {resource.name.replace("_", " ").toUpperCase()}
                      </Subtitle>
                    </SubWrapper>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {this.context.resourcesData[resource.name].map((item) => (
                        <CardsContainer key={item.name}>
                          <Link onPress={() => _goToURL(item.link)}>
                            <Name>{item.name}</Name>
                          </Link>
                        </CardsContainer>
                      ))}
                    </ScrollView>
                  </Wrapper>
                ))}
              </ScrollView>
            </SafeAreaView>
          </Container>
        )}
      </RootView>
    );
  }
}

export default ResourcesScreen;

const RootView = styled.View`
  background: rgb(20, 20, 20);
  flex: 1;
  padding-top: 32px;
`;

const Container = styled.View``;

const Background = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 32px;
  color: white;
  font-weight: 600;
  margin: 10px auto 20px;
  text-align: center;
  width: 80%;
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

const Wrapper = styled.View`
  margin: 15px 0;
`;

const SubWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Subtitle = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: 600;
  margin: 10px;
  text-align: center;
`;

const CardsContainer = styled.View`
  padding: 12px 16px 12px;
  height: 60px;
  background: rgb(52, 59, 71);
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;

const Name = styled.Text`
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 600;
  color: #b8bece;
  margin: 20px 0 0 20px;
`;

const Link = styled.Text``;
