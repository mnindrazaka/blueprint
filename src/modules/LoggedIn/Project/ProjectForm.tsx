import React from 'react'
import { Button, Modal, Divider, Space } from 'antd'
import { useProjectSync, ProjectRequest } from './useProjectSync'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Form, TextField } from '../../../components/FormikWrapper'

const ProjectForm = () => {
  const projectSync = useProjectSync()
  const [visible, setVisible] = React.useState<boolean>(false)

  const validationSchema = React.useMemo(() => {
    return yup.object({
      name: yup.string().required(),
      description: yup.string().required(),
    })
  }, [])

  const toggleModal = React.useCallback(() => {
    setVisible((prev) => !prev)
  }, [])

  const handleSubmit = React.useCallback(
    async (projectRequest: ProjectRequest) => {
      await projectSync.createProject(projectRequest)
      toggleModal()
    },
    [projectSync, toggleModal]
  )

  return (
    <>
      <Formik
        initialValues={{ name: '', description: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Modal
          title="Create Project"
          visible={visible}
          onCancel={toggleModal}
          footer={null}
        >
          <Form>
            <TextField name="name" label="Name" placeholder="Jawa Timur Park" />
            <TextField
              name="description"
              label="Description"
              placeholder="Interactive jawa timur park map for visitor"
            />
            <Divider />
            <Space>
              <Button onClick={toggleModal}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={projectSync.isMutating}
              >
                Create Project
              </Button>
            </Space>
          </Form>
        </Modal>
      </Formik>

      <Button type="primary" onClick={toggleModal}>
        Create New Project
      </Button>
    </>
  )
}

export default ProjectForm
