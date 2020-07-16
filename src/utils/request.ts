import axios from 'axios'
import useSWR from 'swr'

const apiURL = process.env.REACT_APP_API_URL

export class Request {
  baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  public get<T>(endpoint: string) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await axios.get(this.baseURL + endpoint)
        resolve(response.data)
      } catch (error) {
        if (error.response) reject(error.response.data)
        else reject(error)
      }
    })
  }

  public post<T>(endpoint: string, data: any) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await axios.post(this.baseURL + endpoint, data)
        resolve(response.data)
      } catch (error) {
        if (error.response) reject(error.response.data)
        else reject(error)
      }
    })
  }

  public put<T>(endpoint: string, data: any) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await axios.put(this.baseURL + endpoint, data)
        resolve(response.data)
      } catch (error) {
        if (error.response) reject(error.response.data)
        else reject(error)
      }
    })
  }

  public delete<T>(endpoint: string) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await axios.delete(this.baseURL + endpoint)
        resolve(response.data)
      } catch (error) {
        if (error.response) reject(error.response.data)
        else reject(error)
      }
    })
  }
}

export const request = new Request(apiURL || '')

export const useRequest = <T>(path: string) =>
  useSWR<T>(path, () => request.get<T>(path).then((data) => data), {
    refreshInterval: 0,
  })
