import React, { useEffect, useState } from 'react'
import Activity from './Activity/Activity'

function Popup(props) {

  return (props.trigger ? (
    <div className='activityCont'>
        <button onClick={() => {
            props.setd(false)
        }} className="button cx">
            close
        </button>
       {props.obj.map(element => {
        return(
        <Activity obj={element}>

        </Activity>)
       })}
    </div>
  ) : '')
}

export default Popup