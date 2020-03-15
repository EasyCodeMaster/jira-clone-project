import React from 'react'

const svg = {
  logo: () => (
    <svg width='40' height='40' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' focusable='false' aria-hidden='true'>
      <defs>
        <linearGradient x1='108.695%' x2='12.439%' y1='-14.936%' y2='45.215%' id='uid41-1'>
          <stop stopColor='#DEEBFF' stopOpacity='0.4' offset='0%'></stop>
          <stop stopColor='currentColor' offset='100%'></stop>
        </linearGradient>
        <linearGradient x1='0%' x2='91.029%' y1='118.55%' y2='63.971%' id='uid41-2'>
          <stop stopColor='#DEEBFF' stopOpacity='0.4' offset='0%'></stop>
          <stop stopColor='currentColor' offset='100%'></stop>
        </linearGradient>
      </defs>
      <g stroke='none' strokeWidth='1' fillRule='nonzero'>
        <path
          d='M15.9669691 29.3616152C17.2195568 28.1097726 17.9233158 26.4114623 17.9233158 24.6405626 17.9233158 22.8696629 17.2195568 21.1713527 15.9669691 19.91951L7.26805808 11.2489111 3.31143376 15.2055354C2.89743442 15.6200502 2.89743442 16.291565 3.31143376 16.7060799L15.9669691 29.3616152zM28.6225045 15.2055354L15.9669691 2.55 15.9280399 2.58892922C13.3485687 5.19994003 13.3612164 9.40374108 15.9563521 11.9991833L24.6623412 20.6662432 28.6225045 16.7060799C29.0365039 16.291565 29.0365039 15.6200502 28.6225045 15.2055354z'
          fill='currentColor'
        ></path>
        <path
          d='M15.9669691,11.9921053 C13.3718335,9.39666304 13.3591857,5.19286199 15.938657,2.58185118 L6.91061706,11.6063521 L11.6316697,16.3274047 L15.9669691,11.9921053 Z'
          fill='url(#uid41-1)'
        ></path>
        <path
          d='M20.2951906,15.5912886 L15.9669691,19.91951 C17.2195568,21.1713527 17.9233158,22.8696629 17.9233158,24.6405626 C17.9233158,26.4114623 17.2195568,28.1097726 15.9669691,29.3616152 L25.0162432,20.3123412 L20.2951906,15.5912886 Z'
          fill='url(#uid41-2)'
        ></path>
      </g>
    </svg>
  ),
  star: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <path
        d='M15.673 14.042l3.673-3.58-5.076-.738L12 5.125l-2.27 4.6-5.076.737 3.673 3.58-.867 5.055L12 16.711l4.54 2.386-.867-5.055zM12 19.04l-4.505 2.37a1.546 1.546 0 0 1-2.244-1.63l.86-5.017-3.644-3.553a1.546 1.546 0 0 1 .857-2.637l5.037-.732 2.252-4.564a1.546 1.546 0 0 1 2.774 0l2.252 4.564 5.037.732a1.546 1.546 0 0 1 .857 2.637l-3.645 3.553.86 5.016a1.546 1.546 0 0 1-2.243 1.63L12 19.04z'
        fill='currentColor'
      ></path>
    </svg>
  ),
  search: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <path
        d='M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z'
        fill='currentColor'
        fillRule='evenodd'
      ></path>
    </svg>
  ),
  notification: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <path
        d='M6.485 17.669a2 2 0 0 0 2.829 0l-2.829-2.83a2 2 0 0 0 0 2.83zm4.897-12.191l-.725.725c-.782.782-2.21 1.813-3.206 2.311l-3.017 1.509c-.495.248-.584.774-.187 1.171l8.556 8.556c.398.396.922.313 1.171-.188l1.51-3.016c.494-.988 1.526-2.42 2.311-3.206l.725-.726a5.048 5.048 0 0 0 .64-6.356 1.01 1.01 0 1 0-1.354-1.494c-.023.025-.046.049-.066.075a5.043 5.043 0 0 0-2.788-.84 5.036 5.036 0 0 0-3.57 1.478z'
        fill='currentColor'
        fillRule='evenodd'
      ></path>
    </svg>
  ),
  create: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <path
        d='M13 11V3.993A.997.997 0 0 0 12 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 0 0 3 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0 0 21 12c0-.556-.445-1-.993-1H13z'
        fill='currentColor'
        fillRule='evenodd'
      ></path>
    </svg>
  ),
  app: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4 5.01C4 4.451 4.443 4 5.01 4h1.98C7.549 4 8 4.443 8 5.01v1.98C8 7.549 7.557 8 6.99 8H5.01C4.451 8 4 7.557 4 6.99V5.01zm0 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C8 13.549 7.557 14 6.99 14H5.01C4.451 14 4 13.557 4 12.99v-1.98zm6-6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C14 7.549 13.557 8 12.99 8h-1.98C10.451 8 10 7.557 10 6.99V5.01zm0 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zm6-6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C20 7.549 19.557 8 18.99 8h-1.98C16.451 8 16 7.557 16 6.99V5.01zm0 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zm-12 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C8 19.549 7.557 20 6.99 20H5.01C4.451 20 4 19.557 4 18.99v-1.98zm6 0c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zm6 0c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98z'
      ></path>
    </svg>
  ),
  help: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <g fillRule='evenodd'>
        <circle fill='currentColor' cx='12' cy='12' r='10'></circle>
        <circle fill='#0747a6' cx='12' cy='18' r='1'></circle>
        <path
          d='M15.89 9.05a3.975 3.975 0 0 0-2.957-2.942C10.321 5.514 8.017 7.446 8 9.95l.005.147a.992.992 0 0 0 .982.904c.552 0 1-.447 1.002-.998a2.004 2.004 0 0 1 4.007-.002c0 1.102-.898 2-2.003 2H12a1 1 0 0 0-1 .987v2.014a1.001 1.001 0 0 0 2.004 0v-.782c0-.217.145-.399.35-.472A3.99 3.99 0 0 0 15.89 9.05'
          fill='#0747a6'
        ></path>
      </g>
    </svg>
  ),
  setting: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <path
        d='M11.701 16.7a5.002 5.002 0 1 1 0-10.003 5.002 5.002 0 0 1 0 10.004m8.368-3.117a1.995 1.995 0 0 1-1.346-1.885c0-.876.563-1.613 1.345-1.885a.48.48 0 0 0 .315-.574 8.947 8.947 0 0 0-.836-1.993.477.477 0 0 0-.598-.195 2.04 2.04 0 0 1-1.29.08 1.988 1.988 0 0 1-1.404-1.395 2.04 2.04 0 0 1 .076-1.297.478.478 0 0 0-.196-.597 8.98 8.98 0 0 0-1.975-.826.479.479 0 0 0-.574.314 1.995 1.995 0 0 1-1.885 1.346 1.994 1.994 0 0 1-1.884-1.345.482.482 0 0 0-.575-.315c-.708.2-1.379.485-2.004.842a.47.47 0 0 0-.198.582A2.002 2.002 0 0 1 4.445 7.06a.478.478 0 0 0-.595.196 8.946 8.946 0 0 0-.833 1.994.48.48 0 0 0 .308.572 1.995 1.995 0 0 1 1.323 1.877c0 .867-.552 1.599-1.324 1.877a.479.479 0 0 0-.308.57 8.99 8.99 0 0 0 .723 1.79.477.477 0 0 0 .624.194c.595-.273 1.343-.264 2.104.238.117.077.225.185.302.3.527.8.512 1.58.198 2.188a.473.473 0 0 0 .168.628 8.946 8.946 0 0 0 2.11.897.474.474 0 0 0 .57-.313 1.995 1.995 0 0 1 1.886-1.353c.878 0 1.618.567 1.887 1.353a.475.475 0 0 0 .57.313 8.964 8.964 0 0 0 2.084-.883.473.473 0 0 0 .167-.631c-.318-.608-.337-1.393.191-2.195.077-.116.185-.225.302-.302.772-.511 1.527-.513 2.125-.23a.477.477 0 0 0 .628-.19 8.925 8.925 0 0 0 .728-1.793.478.478 0 0 0-.314-.573'
        fill='currentColor'
        fillRule='evenodd'
      ></path>
    </svg>
  ),
  work: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <g fill='currentColor' fillRule='evenodd'>
        <path
          d='M5 19h14V5H5v14zM3 4.995C3 3.893 3.893 3 4.995 3h14.01C20.107 3 21 3.893 21 4.995v14.01A1.995 1.995 0 0 1 19.005 21H4.995A1.995 1.995 0 0 1 3 19.005V4.995z'
          fillRule='nonzero'
        ></path>
        <path d='M9.17 17H4v1.5A1.5 1.5 0 0 0 5.505 20h12.99c.838 0 1.505-.672 1.505-1.5V17h-5.17a3.001 3.001 0 0 1-5.66 0zM7 12h10v2H7zm0-4h10v2H7z'></path>
      </g>
    </svg>
  ),
  project: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <path
        d='M20 19V8h-9.154l-.503-1.258-.455-1.136C9.778 5.33 9.291 5 9.003 5H3.997C4.002 5 4 19 4 19h16zM12.2 6h7.809C21.109 6 22 6.893 22 7.992v11.016c0 1.1-.898 1.992-1.991 1.992H3.991C2.891 21 2 20.107 2 19.008V5.006C2 3.898 2.896 3 3.997 3h5.006c1.103 0 2.327.826 2.742 1.862L12.2 6z'
        fill='currentColor'
      />
    </svg>
  ),
  dashboard: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <g fill='currentColor'>
        <path d='M4 18h16.008C20 18 20 6 20 6H3.992C4 6 4 18 4 18zM2 5.994C2 4.893 2.898 4 3.99 4h16.02C21.108 4 22 4.895 22 5.994v12.012A1.997 1.997 0 0 1 20.01 20H3.99A1.994 1.994 0 0 1 2 18.006V5.994z'></path>
        <path d='M7 5v14h2V5z'></path>
        <path d='M7 11h14V9H7z'></path>
      </g>
    </svg>
  ),
  filter: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <g fill='currentColor' fillRule='evenodd'>
        <path
          d='M5 12.991c0 .007 14.005.009 14.005.009C18.999 13 19 5.009 19 5.009 19 5.002 4.995 5 4.995 5 5.001 5 5 12.991 5 12.991zM3 5.01C3 3.899 3.893 3 4.995 3h14.01C20.107 3 21 3.902 21 5.009v7.982c0 1.11-.893 2.009-1.995 2.009H4.995A2.004 2.004 0 0 1 3 12.991V5.01zM19 19c-.005 1.105-.9 2-2.006 2H7.006A2.009 2.009 0 0 1 5 19h14zm1-3a2.002 2.002 0 0 1-1.994 2H5.994A2.003 2.003 0 0 1 4 16h16z'
          fillRule='nonzero'
        ></path>
        <path d='M10.674 11.331c.36.36.941.36 1.3 0l2.758-2.763a.92.92 0 0 0-1.301-1.298l-2.108 2.11-.755-.754a.92.92 0 0 0-1.3 1.3l1.406 1.405z'></path>
      </g>
    </svg>
  ),
  people: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <g fill='currentColor' fillRule='evenodd'>
        <circle cx='16' cy='9' r='3'></circle>
        <circle cx='8' cy='6' r='3'></circle>
        <path d='M11 15c0-1.105.887-2 2-2h6c1.105 0 2 .885 2 2v3.73c0 3.027-10 3.027-10 0V15z'></path>
        <path d='M13 12a1.997 1.997 0 0 0-2-2H5c-1.113 0-2 .897-2 2.003v3.826c0 1.921 4.054 2.518 7 1.984v-2.807A3.001 3.001 0 0 1 12.997 12H13z'></path>
      </g>
    </svg>
  ),
  jiraSetting: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <path
        d='M11.701 16.7a5.002 5.002 0 1 1 0-10.003 5.002 5.002 0 0 1 0 10.004m8.368-3.117a1.995 1.995 0 0 1-1.346-1.885c0-.876.563-1.613 1.345-1.885a.48.48 0 0 0 .315-.574 8.947 8.947 0 0 0-.836-1.993.477.477 0 0 0-.598-.195 2.04 2.04 0 0 1-1.29.08 1.988 1.988 0 0 1-1.404-1.395 2.04 2.04 0 0 1 .076-1.297.478.478 0 0 0-.196-.597 8.98 8.98 0 0 0-1.975-.826.479.479 0 0 0-.574.314 1.995 1.995 0 0 1-1.885 1.346 1.994 1.994 0 0 1-1.884-1.345.482.482 0 0 0-.575-.315c-.708.2-1.379.485-2.004.842a.47.47 0 0 0-.198.582A2.002 2.002 0 0 1 4.445 7.06a.478.478 0 0 0-.595.196 8.946 8.946 0 0 0-.833 1.994.48.48 0 0 0 .308.572 1.995 1.995 0 0 1 1.323 1.877c0 .867-.552 1.599-1.324 1.877a.479.479 0 0 0-.308.57 8.99 8.99 0 0 0 .723 1.79.477.477 0 0 0 .624.194c.595-.273 1.343-.264 2.104.238.117.077.225.185.302.3.527.8.512 1.58.198 2.188a.473.473 0 0 0 .168.628 8.946 8.946 0 0 0 2.11.897.474.474 0 0 0 .57-.313 1.995 1.995 0 0 1 1.886-1.353c.878 0 1.618.567 1.887 1.353a.475.475 0 0 0 .57.313 8.964 8.964 0 0 0 2.084-.883.473.473 0 0 0 .167-.631c-.318-.608-.337-1.393.191-2.195.077-.116.185-.225.302-.302.772-.511 1.527-.513 2.125-.23a.477.477 0 0 0 .628-.19 8.925 8.925 0 0 0 .728-1.793.478.478 0 0 0-.314-.573'
        fill='currentColor'
        fillRule='evenodd'
      ></path>
    </svg>
  ),
  resize: () => (
    <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' role='presentation'>
      <path
        d='M13.706 9.698a.988.988 0 0 0 0-1.407 1.01 1.01 0 0 0-1.419 0l-2.965 2.94a1.09 1.09 0 0 0 0 1.548l2.955 2.93a1.01 1.01 0 0 0 1.42 0 .988.988 0 0 0 0-1.407l-2.318-2.297 2.327-2.307z'
        fill='currentColor'
        fillRule='evenodd'
      ></path>
    </svg>
  ),
}

export default svg
