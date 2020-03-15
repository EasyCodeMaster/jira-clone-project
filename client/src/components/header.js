import React from 'react'
import styled from 'styled-components'
import svg from '../stuff/svgs'
import MenuIcon from './menuItem'

const { logo, star, search, create, notification, app, help, setting } = svg

const menu = {
  top: [
    { svg: logo, logo: true, tooltip: 'Logo' },
    { svg: star, tooltip: 'Star' },
    { svg: search, tooltip: 'Search' },
    { svg: create, tooltip: 'Create' },
  ],
  bottom: [
    { svg: notification, tooltip: 'Notification test test' },
    { svg: app, tooltip: 'App' },
    { svg: help, tooltip: 'Help' },
    { svg: setting, tooltip: 'Setting' },
  ],
}

const Menu = styled.div`
  --menu-pad-top: 24px;
  position: relative;
  height: calc(100vh - var(--menu-pad-top));
  width: 64px;
  text-align: center;
  background: #0747a6;
  padding-top: var(--menu-pad-top);
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const Bottom = styled.div`
  position: absolute;
  bottom: 20px;
  width: inherit;
`

const Top = styled.div``

const MainMenu = () => {
  const renderMenu = (menus) => {
    return menus.map((menu, i) => <MenuIcon key={i} menu={menu} />)
  }

  return (
    <Menu>
      <Top>{renderMenu(menu.top)}</Top>
      <Bottom>
        {renderMenu(menu.bottom)}
        <MenuIcon
          menu={{
            svg: () => (
              <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
                <circle fill='#fc94af' cx='12' cy='12' r='12'></circle>
              </svg>
            ),
            tooltip: 'profile',
          }}
        />
      </Bottom>
    </Menu>
  )
}

export default MainMenu
