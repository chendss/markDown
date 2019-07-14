import React, { PropTypes, Component } from 'react';
import { Carousel } from 'antd-mobile';
import './CarouselLess.less';

class CarouselView extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      carouselList: []
    }
  }

  componentDidMount() {}

  handlerCarouselClick(item, index){
    console.log('item:', item, 'index:', index);
  }

  render() {
    let { carouselList = [] } = this.props;
    return (
      <div className="carousel">
        {
          carouselList.length > 0 && (
            <Carousel
              dots={true}
              className="carousel-slide"
              autoplay={true}
              infinite
              dotStyle={{ backgroundColor: '#F4F5F7' }}
              dotActiveStyle={{ backgroundColor: '#FD5C0E' }}
              selectedIndex={0}
              swipeSpeed={35}>
              {
                carouselList.map((item, index) => {
                  return (
                    <div className="carousel-item-wrap" key={'carousel_' + index} onClick={this.handlerCarouselClick.bind(this, item, index)}>
                      <img className="carousel-item" src={item.imgUrl} />
                    </div>
                  )
                })
              }
            </Carousel>
          )
        }
      </div>
    )
  }
}

module.exports = CarouselView;