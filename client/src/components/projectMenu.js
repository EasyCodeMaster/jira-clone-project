import React from 'react'
import styled from 'styled-components'
import ProjectMenuItem from './projectMenuItem'
import svg from '../stuff/svgs'

const Menu = styled.div`
  width: 240px;
  height: 100vh;
  background-color: #0747a6;
  box-shadow: -2px 0 5px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const { work, project, dashboard, filter, people, jiraSetting } = svg

const menu = [
  { name: 'Your work', svg: work },
  { name: 'Projects', svg: project },
  { name: 'Dashboards', svg: dashboard },
  { name: 'Filters', svg: filter },
  { name: 'People', svg: people },
  { name: 'Jira settings', svg: jiraSetting },
]

const ProjectMenu = () => {
  return (
    <Menu>
      <h2 style={{ color: '#deebff' }}>Jiraded Software</h2>
      {menu.map((menu, i) => (
        <ProjectMenuItem key={i} menu={menu} />
      ))}
    </Menu>
  )
}

export default ProjectMenu
