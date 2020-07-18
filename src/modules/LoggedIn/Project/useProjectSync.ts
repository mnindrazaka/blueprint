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
  errorValidate?: string
  isMutating: boolean
  errorMutate?: string
  createProject: (projectRequest: ProjectRequest) => Promise<void>
  updateProject: (projectRequest: ProjectRequest, id: string) => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

export const useProjectSync = (): ProjectSyncValue => {
  const {
    data: projects,
    isValidating,
    errorValidate,
    mutate,
    isMutating,
    errorMutate,
  } = useRequest<Project[]>('/project')

  const createProject = React.useCallback(
    async (projectRequest: ProjectRequest) => {
      try {
        await mutate(async (projects) => {
          const createdProject = await request.post<Project>(
            '/project',
            projectRequest
          )
          return [...projects, createdProject]
        })
        notification.success({
          message: 'Project creation success',
          description: 'Your project is successfully created',
        })
      } catch (err) {
        notification.error({
          message: 'Project creation failed',
          description: err.message,
        })
      }
    },
    [mutate]
  )

  const updateProject = React.useCallback(
    async (projectRequest: ProjectRequest, id: string) => {
      try {
        await mutate(async (projects) => {
          const updatedProject = await request.put<Project>(
            `/project/${id}`,
            projectRequest
          )
          return projects.map((project) =>
            project._id === updatedProject._id ? updatedProject : project
          )
        })
        notification.success({
          message: 'Project edit success',
          description: 'Your project is successfully edited',
        })
      } catch (err) {
        notification.error({
          message: 'Project edit failed',
          description: err.message,
        })
      }
    },
    [mutate]
  )

  const deleteProject = React.useCallback(
    async (id: string) => {
      try {
        await mutate(async (projects) => {
          await request.delete<Project>(`/project/${id}`)
          return projects.filter((project) => project._id !== id)
        })
        notification.success({
          message: 'Project delete success',
          description: 'Your project is successfully deleted',
        })
      } catch (err) {
        notification.error({
          message: 'Project delete failed',
          description: err.message,
        })
      }
    },
    [mutate]
  )

  return {
    projects: projects || [],
    isValidating,
    errorValidate,
    isMutating,
    errorMutate,
    createProject,
    updateProject,
    deleteProject,
  }
}
