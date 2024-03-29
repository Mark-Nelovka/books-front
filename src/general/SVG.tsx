import React from 'react'

export default function SVGCustomIcon(props: {name: string, color?: string, stroke?: string}) {
  switch (props.name) {
    case 'details-heart':
        return <svg width="24" height="24" viewBox="0 0 24 24" fill={props.color} xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_783_3002)">
        <path d="M4.31802 6.31802C2.56066 8.07538 2.56066 10.9246 4.31802 12.682L12.0001 20.364L19.682 12.682C21.4393 10.9246 21.4393 8.07538 19.682 6.31802C17.9246 4.56066 15.0754 4.56066 13.318 6.31802L12.0001 7.63609L10.682 6.31802C8.92462 4.56066 6.07538 4.56066 4.31802 6.31802Z" stroke={props.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_783_3002">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
        </svg>
      default:
        return <p>Image here</p>
  }
}
