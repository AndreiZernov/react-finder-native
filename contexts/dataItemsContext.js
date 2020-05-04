import React, { useState, useEffect, useContext, createContext } from "react";
import Client from "../contentful";

const DataItemsContext = createContext();

const useDataItems = () => useContext(DataItemsContext);

const DataItemsProvider = ({ children }) => {
  const [coursesData, setCoursesData] = useState({});
  const [coursesDataByPlatform, setCoursesDataByPlatform] = useState({});
  const [coursesDataNew, setCoursesDataNew] = useState({});
  const [resourcesData, setResourcesData] = useState({});
  const [articlesData, setArticlesData] = useState({});
  const [loading, setLoading] = useState(true);

  const filterByPlatform = (data, name) => {
    let arr = [];
    for (let [key, value] of Object.entries(data)) {
      arr.push(value.filter((course) => course.link.includes(name)));
    }
    return arr;
  };

  const fiterNewCourses = (data) => {
    let arr = [];
    for (let [key, value] of Object.entries(data)) {
      arr.push(value.filter((course) => course.new === true));
    }
    return arr[0];
  };

  const formatData = (items) => {
    let tempItems = items.map((item) => {
      let img = "http:" + item.fields.img.fields.file.url;
      let course = { ...item.fields, img };
      return course;
    });
    return tempItems;
  };

  useEffect(() => {
    async function getData() {
      try {
        let respReact = await Client.getEntries({
          content_type: "coursesData",
        });
        let respReactNative = await Client.getEntries({
          content_type: "reactNative",
        });
        let respRedux = await Client.getEntries({ content_type: "redux" });
        let respGraphQl = await Client.getEntries({ content_type: "graphql" });
        let respPathway = await Client.getEntries({ content_type: "pathway" });
        let respResources = await Client.getEntries({
          content_type: "resources",
        });
        let respJobSearch = await Client.getEntries({
          content_type: "jobSearch",
        });
        let respHtmlCss = await Client.getEntries({ content_type: "htmlCss" });
        let respPodcasts = await Client.getEntries({
          content_type: "podcasts",
        });
        let respArticles = await Client.getEntries({
          content_type: "articles",
        });

        let courseObj = {
          react: formatData(respReact.items),
          react_native: formatData(respReactNative.items),
          redux: formatData(respRedux.items),
          graphql: formatData(respGraphQl.items),
          pathway: formatData(respPathway.items),
        };

        setCoursesData(courseObj);
        setResourcesData({
          resources: formatData(respResources.items),
          job_search: formatData(respJobSearch.items),
          podcasts: formatData(respPodcasts.items),
          html_css: formatData(respHtmlCss.items),
        });

        setCoursesDataByPlatform({
          youtube: filterByPlatform(courseObj, "youtube").flat(),
          udemy: filterByPlatform(courseObj, "udemy").flat(),
          egghead: filterByPlatform(courseObj, "egghead").flat(),
          freecodecamp: filterByPlatform(courseObj, "freecodecamp").flat(),
          codecademy: filterByPlatform(courseObj, "codecademy").flat(),
          edx: filterByPlatform(courseObj, "edx").flat(),
          coursera: filterByPlatform(courseObj, "coursera").flat(),
          treehouse: filterByPlatform(courseObj, "treehouse").flat(),
        });

        setCoursesDataNew(fiterNewCourses(courseObj));

        setArticlesData(formatData(respArticles.items));

        setLoading(false);
      } catch (e) {
        // console.log(e);
      }
    }
    getData();
  }, []);

  return (
    <DataItemsContext.Provider
      value={{
        coursesData,
        resourcesData,
        loading,
        coursesDataByPlatform,
        coursesDataNew,
        articlesData,
      }}
    >
      {children}
    </DataItemsContext.Provider>
  );
};

const DataItemsConsumer = DataItemsContext.Consumer;

export { DataItemsProvider, DataItemsConsumer, DataItemsContext, useDataItems };
