export const ListCourses = {
  selectItems: [
    { value:"empty", name: "Please select topic"},
    { value:"react", name: "React"},
    { value:"react_native", name: "React Native"},
    { value:"redux", name: "Redux"},
    { value:"graphql", name: "GraphQL"},
    { value:"pathway", name: "Full Pathway"},
  ],
  inputItems: [
    { name: "author", placeholder: "Course's Author", type: "text" },
    { name: "name", placeholder: "Course's Topic", type: "text" },
    { name: "description", placeholder: "Short Description", type: "text" },
    { name: "duration", placeholder: "Duration in Minutes", type: "number" },
    { name: "link", placeholder: "URL address", type: "url" }
  ]
}

export const ListResources = {
  selectItems: [
    { value:"empty", name: "Please select topic"},
    { value:"job_search", name: "Job Search Links"},
    { value:"podcasts", name: "Podcast Links"},
    { value:"resources", name: "React Resources"},
    { value:"html_css", name: "HTML CSS Links"}
  ],
  inputItems: [
    { name: "name", placeholder: "Resource's Name", type: "text" },
    { name: "description", placeholder: "Short Description", type: "text" },
    { name: "link", placeholder: "URL address", type: "url" },
  ]
}
