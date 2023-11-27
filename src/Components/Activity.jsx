import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Activity(props) {


return(
    <div className='activityConta'>
 <div className="image-cont">
        <Carousel
          autoPlay={false}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          width={200}
          useKeyboardArrows={false}
          centerMode={false}
          autoFocus={false}
        >
          { props.obj.imageURL.map(a=> {
            return(
              <div key={crypto.randomUUID()}>
                <img className="plz" src={a} />
              </div>
            )
          })}
        </Carousel>
      </div>
      <div className='awords-cont'>
        <span className='crj' >Activity Name</span>
        <span className='otitle crj'>{props.obj.activityName}</span>
        <span className='crj'>Activity Description</span>
        <span className='description crj'>{props.obj.description}</span>
        <span className='price'>£{props.obj.price}</span>
        </div>
    </div>
)

}

export default Activity