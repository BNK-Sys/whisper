import React from 'react'
import "./PageTitle.css"

const PageTitle = (props) => {
  return (
      <div className="page_title">
        <img src={props.img} width={35} height={34} />
        <div className="title_name">{props.title}</div>
      </div>
  )
}

export default PageTitle