import React from 'react'
import styled from 'styled-components'
const MenuItem = styled.div`
  background-color: ${({ active }) => (active ? '#05367f' : '#0747a6')};
  margin: 0px 16px;
  padding: 0px 12px;
  border-radius: 4px;
  height: 40px;
  color: #deebff;
  cursor: pointer;
  display: flex;
  align-items: center;
  :hover {
    background-color: ${({ active }) => (active ? '#05367f' : '#1c63ce')};
  }
`
const SvgWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`
const ProjectMenuItem = ({ menu: { name, svg } }) => {
  return (
    <MenuItem active={name === 'Projects'}>
      <SvgWrapper>{svg()}</SvgWrapper>
      {name}
    </MenuItem>
  )
}

export default ProjectMenuItem
