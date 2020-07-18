import React, { ChangeEvent } from 'react'
import { Button, Modal } from 'antd'
import { useProjectSync, ProjectRequest } from './useProjectSync'
const ProjectForm = () => {
  const projectSync = useProjectSync()
  const [visible, setVisible] = React.useState<boolean>(false)
  const [newData, setNewData] = React.useState<ProjectRequest>(
    {
      name: '',
      description: ''
    }
  )
  const toggleModal = React.useCallback(() => {
    setVisible((prev) => !prev)
  }, [])

  const handleChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewData({ ...newData, [event.target.name]: event.target.value })
  }, [newData])

  const handleSubmit = React.useCallback(async () => {
    await projectSync.createProject(
      newData
    )
    toggleModal()
  }, [projectSync, toggleModal, newData])

  return (
    <>
      <Modal
        title="Create Project"
        visible={visible}
        onCancel={toggleModal}
        footer={[
          <Button key="back" onClick={toggleModal}>
            Cancel
          </Button>,
          <Button
            key="Create Project"
            type="primary"
            onClick={handleSubmit}
            loading={projectSync.isMutating}
          >
            Create Project
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 22 }}>
          <p style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: 14 }}>
            Project Name
          </p>
          <input
            type="text"
            placeholder="Jawa Timur Park"
            name='name'
            value={newData.name}
            onChange={handleChange}
            style={{
              border: '1px solid #D9D9D9',
              outline: 'none',
              borderRadius: 4,
              fontSize: 14,
              minWidth: '100%',
              padding: '5px 12px',
            }}
          />
        </div>
        <div>
          <p>Description</p>
          <input
            type="text"
            placeholder="Interactive jawa timur park map for visitor"
            name='description'
            value={newData.description}
            onChange={handleChange}
            style={{
              border: '1px solid #D9D9D9',
              outline: 'none',
              borderRadius: 4,
              fontSize: 14,
              minWidth: '100%',
              padding: '5px 12px',
            }}
          />
        </div>
      </Modal>
      <Button type="primary" onClick={toggleModal}>
        Create New Project
      </Button>
    </>
  )
}

export default ProjectForm
