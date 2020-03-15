import React from 'react'
import styled from 'styled-components'
import svgs from '../stuff/svgs'

const { resize } = svgs

const ResizeWrapper = styled.div`
  position: relative;
  width: 24px;
  margin-left: -8px;
  cursor: w-resize;
  z-index: 3;
  color: transparent;
`

const RResizer = styled.div`
  position: absolute;
  width: 2px;
  background-color: #000;
  margin-left: 8px;
  height: 100vh;
`
const RRResizer = styled(RResizer)`
  opacity: 0px;
  background-color: transparent;
  margin-left: 8px;
  width: 3px;
  z-index: 4;
  ${ResizeWrapper}:hover & {
    background-color: #4c9aff;
    transition: all 150ms linear;
  }
`

const RRRResizer = styled.div`
  z-index: 100;
  /* position: absolute;
  width: 20px;
  height: 20px;
  background-color: white;
  border: black 1px solid;
  border-radius: 50%; */
`

const Resizer = () => {
  return (
    <ResizeWrapper>
      <RResizer>xd</RResizer>
      <RRResizer>xd</RRResizer>
      <RRRResizer>{resize()}</RRRResizer>
    </ResizeWrapper>
  )
}

export default Resizer
