import React, { useState, useEffect, useContext, createContext } from 'react'
import Client from '../contentful'

const DataItemsContext = createContext()

const useDataItems = () => useContext(DataItemsContext)

const DataItemsProvider = ({children}) => {
  const [ coursesData, setCoursesData ] = useState({})
  const [ coursesDataByPlatform, setCoursesDataByPlatform ] = useState({})
  const [ coursesDataNew, setCoursesDataNew ] = useState({})
  const [ resourcesData, setResourcesData ] = useState({})
  const [ articlesData, setArticlesData ] = useState({})
  const [ loading, setLoading ] = useState(true)


  useEffect(() => {
    async function getData() {
      try {
        let respReact = await Client.getEntries({ "content_type" : "coursesData" })
        let respReactNative = await Client.getEntries({ "content_type" : "reactNative" })
        let respRedux = await Client.getEntries({ "content_type" : "redux" })
        let respGraphQl = await Client.getEntries({ "content_type" : "graphql" })
        let respPathway = await Client.getEntries({ "content_type" : "pathway" })
        let respResources = await Client.getEntries({ "content_type" : "resources" })
        let respJobSearch = await Client.getEntries({ "content_type" : "jobSearch" })
        let respHtmlCss = await Client.getEntries({ "content_type" : "htmlCss" })
        let respPodcasts = await Client.getEntries({ "content_type" : "podcasts" })
        let respArticles = await Client.getEntries({ "content_type" : "articles" })

        let courseObj = {
          react: FormatData(respReact.items),
          react_native: FormatData(respReactNative.items),
          redux: FormatData(respRedux.items),
          graphql: FormatData(respGraphQl.items),
          pathway: FormatData(respPathway.items)
        }

        setCoursesData(courseObj)
        setResourcesData({
          resources: FormatData(respResources.items),
          job_search: FormatData(respJobSearch.items),
          podcasts: FormatData(respHtmlCss.items),
          html_css: FormatData(respPodcasts.items)
        })

        setCoursesDataByPlatform({
          youtube: FilterByPlatform(courseObj,"youtube").flat(),
          udemy: FilterByPlatform(courseObj,"udemy").flat(),
          egghead: FilterByPlatform(courseObj,"egghead").flat(),
          freecodecamp: FilterByPlatform(courseObj,"freecodecamp").flat(),
          codecademy: FilterByPlatform(courseObj,"codecademy").flat(),
          edx: FilterByPlatform(courseObj,"edx").flat(),
          coursera: FilterByPlatform(courseObj,"coursera").flat(),
          treehouse: FilterByPlatform(courseObj,"treehouse").flat()
        })

        setCoursesDataNew(FiterNewCourses(courseObj))

        setArticlesData(FormatData(respArticles.items))

        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [])

  const FilterByPlatform = (data, name) => {
    let arr = []
    for (let [key, value] of Object.entries(data) ) {
      arr.push(value.filter(course => course.link.includes(name)))
    }
    return arr
  }

  const FiterNewCourses = (data) => {
    let arr = []
    for (let [key, value] of Object.entries(data) ) {
      arr.push(value.filter(course => course.new === true))
    }
    return arr[0]
  }


  const FormatData = (items) => {
    let tempItems = items.map(item => {
      let img = 'http:' + item.fields.img.fields.file.url
      let course = { ...item.fields, img }
      return course
    })
    return tempItems
  }


  return (
    <DataItemsContext.Provider
      value={{ coursesData, resourcesData, loading, coursesDataByPlatform, coursesDataNew, articlesData }}
    >
      {children}
    </DataItemsContext.Provider>
  )
}


const DataItemsConsumer = DataItemsContext.Consumer

export { DataItemsProvider, DataItemsConsumer, DataItemsContext, useDataItems }
