import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {
  PodcastsIcon,
  ResourcesIcon,
  JobSearchIcon,
  HtmlCssIcon
} from "./Icons";

const ResourcesSlideBar = ({ navigation }) => (
  <Cover>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {Recources.map(resource => {
        let topic = resource.name.toLowerCase().replace(" ", "_");
        let home = "home";
        return (
          <TouchableOpacity
            key={resource.name}
            onPress={() => navigation.push("Resources", { home })}
          >
            <Container>
              {resource.icon}
              <Text>{resource.name}</Text>
            </Container>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </Cover>
);

export default ResourcesSlideBar;

const Recources = [
  { name: "Resources", icon: <ResourcesIcon /> },
  { name: "Job Search", icon: <JobSearchIcon /> },
  { name: "Podcasts", icon: <PodcastsIcon /> },
  { name: "HTML CSS", icon: <HtmlCssIcon /> }
];

const Cover = styled.View`
  margin: 0 auto;
`;

const Container = styled.View`
  padding: 12px 16px 12px;
  height: 60px;
  background: rgb(52, 59, 71);
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  flex-direction: row;
  align-items: center;
  margin: 20px 0 20px 20px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
  color: #b8bece;
`;
