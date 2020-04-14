import React, { useState, useEffect, useContext, createContext } from 'react'
import Client from '../contentful'

const DataItemsContext = createContext()

const useDataItems = () => useContext(DataItemsContext)


const DataItemsProvider = ({children}) => {
  const [ coursesData, setCoursesData] = useState({})
  const [ resourcesData, setResourcesData] = useState({})
  const [ loading, setLoading] = useState(true)


  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    try {
      let response = await Client.getEntries({
        // "content_type" : "redux"
      })

      let CoursesData = FormatData(response.items).coursesData
      let ResourcesData = FormatData(response.items).resourcesData

      setCoursesData(CoursesData)
      setResourcesData(ResourcesData)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }


  const FormatData = (items) => {
    let tempItems = items.map(item => {
      let img = 'http:' + item.fields.img.fields.file.url
      let course = { ...item.fields, img }
      return course
    })
    let coursesData = {
      react: tempItems.filter(course => course.parent1 === "react"),
      react_native: tempItems.filter(course => course.parent1 === "react_native"),
      redux: tempItems.filter(course => course.parent1 === "redux"),
      graphql: tempItems.filter(course => course.parent1 === "graphql"),
      pathway: tempItems.filter(course => course.parent1 === "pathway")
    }
    let resourcesData = {
      resources: tempItems.filter(course => course.parent1 === "resources"),
      job_search: tempItems.filter(course => course.parent1 === "job_search"),
      podcasts: tempItems.filter(course => course.parent1 === "podcasts"),
      html_css: tempItems.filter(course => course.parent1 === "html_css")
    }
    let data = { coursesData, resourcesData}
    return data
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
