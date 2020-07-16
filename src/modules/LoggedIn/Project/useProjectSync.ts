import React from 'react'
import { useRequest, request } from '../../../utils/request'
import { notification } from 'antd'

type Project = {
  _id: string
  name: string
  description: string
}

type ProjectRequest = Omit<Project, '_id'>

type ProjectSyncValue = {
  projects: Project[]
  isValidating: boolean
  error?: string
  createProject: (projectRequest: ProjectRequest) => Promise<void>
  updateProject: (projectRequest: ProjectRequest, id: string) => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

export const useProjectSync = (): ProjectSyncValue => {
  const { data: projects, error, mutate, isValidating } = useRequest<Project[]>(
    '/project'
  )

  const createProject = React.useCallback(
    (projectRequest: ProjectRequest) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          if (!projects) return
          const createdProject = await request.post<Project>(
            '/project',
            projectRequest
          )
          await mutate([...projects, createdProject], false)
          notification.success({
            message: 'Project creation success',
            description: 'Your project is successfully created',
          })
          resolve()
        } catch (err) {
          notification.error({
            message: 'Project creation failed',
            description: err.message,
          })
          reject()
        }
      })
    },
    [mutate, projects]
  )

  const updateProject = React.useCallback(
    (projectRequest: ProjectRequest, id: string) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          if (!projects) return
          const updatedProject = await request.put<Project>(
            `/project/${id}`,
            projectRequest
          )
          await mutate(
            projects.map((project) =>
              project._id === id ? updatedProject : project
            )
          )
          notification.success({
            message: 'Project edit success',
            description: 'Your project is successfully edited',
          })
          resolve()
        } catch (err) {
          notification.error({
            message: 'Project edit failed',
            description: err.message,
          })
          reject()
        }
      })
    },
    [mutate, projects]
  )

  const deleteProject = React.useCallback(
    (id: string) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          if (!projects) return
          await request.delete(`/project/${id}`)
          await mutate(projects.filter((project) => project._id !== id))
          notification.success({
            message: 'Project delete success',
            description: 'Your project is successfully deleted',
          })
          resolve()
        } catch (err) {
          notification.error({
            message: 'Project delete failed',
            description: err.message,
          })
          reject()
        }
      })
    },
    [mutate, projects]
  )

  return {
    projects: projects || [],
    isValidating,
    error,
    createProject,
    updateProject,
    deleteProject,
  }
}
