import React from 'react'
import { Card, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { EllipsisOutlined } from '@ant-design/icons';
const { Meta } = Card;

const ProjectList = () => {
  const [projects, setProjects] = React.useState([
    {
      id: 1,
      title: 'Jawa Timur Park',
      description: 'Interactive jatim park map'
    },
    {
      id: 2,
      title: 'Museum Angkut',
      description: 'Interactive museum angkut map'
    },
    {
      id: 3,
      title: 'Taman Safari Prigen',
      description: 'Interactive taman safari prigen map'
    },
    {
      id: 4,
      title: 'Dino Park',
      description: 'Interactive dino park map'
    },
  ])

  return (
    <div>
      <Row style={{ marginTop: 16 }} gutter={[24, 16]} >
        {projects.map<any>(card => {
          return (
            <Col span={6}>
              <Card
                style={{ width: 300 }}
                hoverable
                actions={[
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  title={card.title}
                  description={card.description}
                />
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default ProjectList