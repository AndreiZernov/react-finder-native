import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import CardsScreen from "../screens/CardsScreen";
import CoursesScreen from "../screens/CoursesScreen";
import CoursesByPlatformScreen from "../screens/CoursesByPlatformScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import VideoScreen from "../screens/VideoScreen";
import ArticleScreen from "../screens/ArticleScreen";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Cards: CardsScreen,
    Courses: CoursesScreen,
    CoursesByPlatform: CoursesByPlatformScreen,
    Section: SectionScreen,
    Resources: ResourcesScreen,
    Video: VideoScreen,
    Article: ArticleScreen,
  },
  {
    mode: "modal",
  }
);

HomeStack.navigationOptions = () => {
  return {
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name="ios-home"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    ),
  };
};

const CoursesStack = createStackNavigator(
  {
    Courses: CoursesScreen,
    Section: SectionScreen,
  },
  {
    mode: "modal",
  }
);

CoursesStack.navigationOptions = {
  tabBarLabel: "Courses",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-school"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  ),
};

const ResourcesStack = createStackNavigator({ Resources: ResourcesScreen });
ResourcesStack.navigationOptions = {
  tabBarLabel: "Resources",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-briefcase"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  ),
};

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    CoursesStack,
    ResourcesStack,
  },
  {
    tabBarOptions: {
      activeTintColor: activeColor,
      inactiveTintColor: inactiveColor,
    },
  }
);

export default createAppContainer(TabNavigator);
