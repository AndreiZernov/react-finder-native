import React, { useState, useEffect, useContext, createContext } from 'react'
import Client from '../contentful'

const DataItemsContext = createContext()

const useDataItems = () => useContext(DataItemsContext)

const DataItemsProvider = ({children}) => {
  const [ coursesData, setCoursesData] = useState({})
  const [ resourcesData, setResourcesData] = useState({})
  const [ loading, setLoading] = useState(true)

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

        setCoursesData({
          react: FormatData(respReact.items),
          react_native: FormatData(respReactNative.items),
          redux: FormatData(respRedux.items),
          graphql: FormatData(respGraphQl.items),
          pathway: FormatData(respPathway.items)
        })
        setResourcesData({
          resources: FormatData(respResources.items),
          job_search: FormatData(respJobSearch.items),
          podcasts: FormatData(respHtmlCss.items),
          html_css: FormatData(respPodcasts.items)
        })
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [])




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
      value={{ coursesData, resourcesData, loading }}
    >
      {children}
    </DataItemsContext.Provider>
  )
}


const DataItemsConsumer = DataItemsContext.Consumer

export { DataItemsProvider, DataItemsConsumer, DataItemsContext, useDataItems }
