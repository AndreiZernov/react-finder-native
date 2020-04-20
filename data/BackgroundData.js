export const BackColor = (data) => {
  return data === "react" ?  "rgb(20, 20, 20)" :
    data === "react_native" ?  "rgba(38, 48, 52, 1)" :
    data === "redux" ?  "rgb(3, 3, 3)" :
    data === "graphql" ?  "rgb(5, 5, 5)" :
    data === "pathway" ?  "rgb(4, 4, 4)" : "rgb(20, 20, 20)"
}

export const BackImage = (data) => {
  return  data === "react" ? require("../assets/background1.jpg") :
    data === "react_native" ? require("../assets/background10.jpg") :
    data === "redux" ? require("../assets/background9.jpg") :
    data === "graphql" ? require("../assets/background8.jpg") :
    data === "pathway" ? require("../assets/background4.jpg") :
    require("../assets/background1.jpg")
}
