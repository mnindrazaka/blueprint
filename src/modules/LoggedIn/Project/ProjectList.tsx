import React from 'react'
import { Card, Row, Col } from 'antd'
import { useProjectSync } from './useProjectSync'

const ProjectList = () => {
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
              <Card hoverable>
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
