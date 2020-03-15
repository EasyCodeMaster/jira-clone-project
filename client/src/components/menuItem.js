import React, { useState } from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  color: #deebff;
  position: relative;
  cursor: pointer;
  border-radius: 50%;
  margin-bottom: 10px;
  background-color: #0747a6;
  display: table;
  > svg {
    display: table-row;
    padding: 4px;
    width: ${({ logo }) => (logo ? 40 : 26)}px;
    height: ${({ logo }) => (logo ? 40 : 26)}px;
  }
  :hover,
  :focus,
  :active {
    background-color: #1c63ce;
  }
`

const Tip = styled.div`
  opacity: ${({ show }) => (show ? 1 : 0)};
  cursor: default;
  position: absolute;
  top: calc(50% - 16px);
  left: calc(100% + 8px);
  background-color: #172b4d;
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  width: max-content;
  transition: opacity 200ms ease-in-out;
  z-index: 2;
`

const MenuItem = ({ menu: { svg, logo, tooltip } }) => {
  const [tipDisplay, setTipDisplay] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <Icon onMouseOver={() => setTipDisplay(true)} onMouseLeave={() => setTipDisplay(false)} logo={logo}>
        {svg()}
      </Icon>
      <Tip show={tipDisplay}>{tooltip}</Tip>
    </div>
  )
}

export default MenuItem
