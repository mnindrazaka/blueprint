import React from 'react'
import { Card, Row, Col, message } from 'antd'
import { useProjectSync } from './useProjectSync'
import { Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const ProjectList = () => {
  const confirm = React.useCallback(() => {
    message.success('Task Deleted');
  }, [])

  const cancel = React.useCallback(() => {
    message.error('Canceled');
  }, [])

  const projectSync = useProjectSync()
  return (
    <Row style={{ marginTop: 16 }} gutter={[24, 16]}>
      {projectSync.isValidating ? (
        <>
          <Col span={6}>
            <Card loading></Card>
          </Col>
          <Col span={6}>
            <Card loading></Card>
          </Col>
          <Col span={6}>
            <Card loading></Card>
          </Col>
          <Col span={6}>
            <Card loading></Card>
          </Col>
        </>
      ) : (
        projectSync.projects.map((project) => {
          return (
            <Col span={6} key={project._id}>
              <Card hoverable
                actions={[
                  <Popconfirm
                    title="Are you sure delete this project ?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a href="#">
                      <DeleteOutlined
                        style={{
                          fontSize: 20
                        }}
                      />
                    </a>
                  </Popconfirm>
                ]}
              >
                <Card.Meta
                  title={project.name}
                  description={project.description}
                />
              </Card>
            </Col>
          )
        })
      )}
    </Row>
  )
}

export default ProjectList
