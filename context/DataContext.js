import React, { useState, useEffect, useContext, createContext } from 'react'
const contentful = require('contentful/dist/contentful.browser.min.js');



const DataContext = createContext()

const useData = () => useContext(DataContext)



const DataProvider = ({children}) => {

  const [ coursesData, setCoursesData ] = React.useState('')
  const [ topicData, setTopicData ] = React.useState([])


  React.useEffect(() => {
    setCoursesData({
      react: topicData.filter(course => course.parent1 === "react"),
      react_native: topicData.filter(course => course.parent1 === "react_native"),
      redux: topicData.filter(course => course.parent1 === "redux"),
      graphql: topicData.filter(course => course.parent1 === "graphql"),
      pathway: topicData.filter(course => course.parent1 === "pathway")
    })
  }, [topicData])


  React.useEffect(() => {
    const client = contentful.createClient({
      space: "unj2bb6d61ak",
      accessToken: "Q5wSfpnDYJCSNHiDEPZ0CfA-fnSNH_d8P0mK04byPgw"
    });

    client
    .getEntries()
    .then(res => res.items
      .forEach(entry =>  {
        setTopicData(topicData => [...topicData,
          ConvertData(entry)
        ])
      }))
    }, []
  )

  const ConvertData = entry => {
    return (
      {
        id: entry.fields.id,
        author: entry.fields.author,
        name: entry.fields.name,
        description: entry.fields.description,
        duration: entry.fields.duration,
        img: entry.fields.img.fields.file.url,
        link: entry.fields.link,
        price: entry.fields.price,
        parent1: entry.fields.parent1,
        parent2: entry.fields.parent2
      }
    )
  }




  return (
    <DataContext.Provider value={coursesData} >
      {children}
    </DataContext.Provider>
  )
}
const DataConsumer = DataContext.Consumer

export { DataProvider, DataConsumer, DataContext, useData }
