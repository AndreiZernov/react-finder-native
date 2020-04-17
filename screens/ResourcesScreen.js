import React from "react";
import { Linking, ScrollView } from "react-native";
import styled from "styled-components";
import { DataItemsContext } from "../contexts/dataItemsContext"
import { PodcastsIcon, ResourcesIcon, JobSearchIcon, HtmlCssIcon } from "../components/Icons";
import LoadingData from "../components/LoadingData"



class ResourcesScreen extends React.Component {
  static navigationOptions = { headerShown: false  };
  static contextType = DataItemsContext

  _goToURL(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }


  render() {
    return (
      <Container>
        { this.context.loading ?
          <LoadingData /> :
          <ScrollView style={{ height: "100%" }}>
            <Background source={require("../assets/background6.jpg")} />
            <Title>Resources Page</Title>
            {RecourcesList.map(resource =>
              <Wrapper key={resource.name} style={{backgroundColor: resource.color}}>
                <SubWrapper>
                  {resource.icon}
                  <Subtitle>{resource.name.replace("_", " ").toUpperCase()}</Subtitle>
                </SubWrapper>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {this.context.resourcesData[resource.name].map(item =>
                    <CardsContainer key={item.name}>
                      <Link onPress={() => this._goToURL(item.link)}>
                        <Name>{item.name}</Name>
                      </Link>
                    </CardsContainer>
                  )}
                </ScrollView>
              </Wrapper>
            )}
          </ScrollView>
        }
      </Container>
    );
  }
}

export default ResourcesScreen;


const RecourcesList = [
  { name: "resources", icon: <ResourcesIcon />, color: "rgba(244, 151, 168, 0.3)"},
  { name: "job_search", icon: <JobSearchIcon />, color: "rgba(160, 235, 216, 0.3)"},
  { name: "podcasts", icon: <PodcastsIcon />, color: "rgba(185, 209, 251, 0.3)"},
  { name: "html_css", icon: <HtmlCssIcon />, color: "rgba(249, 167, 114, 0.3)"}
]

const Container = styled.View`
  background: #f0f3f5;
  height: 100%;
`;

const Background = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 32px;
  color: white;
  font-weight: 600;
  margin: 40px auto 20px;
  text-align: center;
  width: 80%;
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
