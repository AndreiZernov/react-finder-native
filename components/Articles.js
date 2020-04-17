import React from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import styled from 'styled-components/native'
import Article from './Article'

const Articles = ({data}) =>
  <>
    <Subtitle>Articles</Subtitle>
    <ArticlesContainer>
      {data.redux.map(article => {
        let key = "redux"
        return (
          <ArticleWrapper key={article.id}>
            <TouchableOpacity
              // onPress={() => this.props.navigation.push("Section", { article, key })}
            >
              <Article data={article} key={article.id}/>
            </TouchableOpacity>
          </ArticleWrapper>
        )})
      }
    </ArticlesContainer>
  </>


export default Articles

const ArticlesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ArticleWrapper = styled.View`
  margin: 10px auto;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`;
