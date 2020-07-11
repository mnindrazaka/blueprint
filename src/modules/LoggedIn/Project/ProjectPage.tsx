import React from 'react'
import { Layout, Typography, Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import ProjectList from './ProjectList'

const ProjectPage = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Header style={{ backgroundColor: '#fff' }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Typography.Title level={4}>Blueprint</Typography.Title>
          </Col>
          <Col>
            <Typography.Text>M. Nindra Zaka</Typography.Text>
            <UserOutlined style={{ marginLeft: 15 }} />
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content style={{ padding: 50 }}>
        <Typography.Title level={4}>Project Workspace</Typography.Title>
        <ProjectList />
      </Layout.Content>
    </Layout>
  )
}

export default ProjectPage
