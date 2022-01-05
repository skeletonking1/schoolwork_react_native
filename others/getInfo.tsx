import axios, { get } from './request'
import client from './graphql';
import gql from 'graphql-tag';

// 获取github 用户信息
export const getUserInfo = (token: string): Promise<any> => {
  return client.query({
    query: gql(`
    query { 
      viewer { 
        avatarUrl
        name
        login
        email
        bio
        repositories{
          totalCount
        }
        url,
        following {
          totalCount
        }
        followers {
          totalCount
        }
        createdAt
      }
   }
    `),
    variables: {
      token
    }
  })
}
/**
 * 获取用户仓库
 * */
export const getRepo = (token: string): Promise<any> => {
  return client.query({
    query: gql(`
    query { 
      viewer{
        repositories(first: 50){
          nodes {
              name
              description
              owner {
                login
              }
          }
        }
      }
  }
    `),
    variables: {
      token
    }
  })
}

// 获取github 用户信息
export const getUserInformationApi = (token: string): Promise<any> => {
  return axios.get('/user', { headers: { Authorization: 'Bearer ' + token } })
}

/**
 * 获取用户仓库
 * */
export const getReposApi = (user: string, token: string): Promise<any> => {
  return axios.get(`/users/${user}/repos`, {
    headers: { Authorization: 'Bearer ' + token }
  })
}
