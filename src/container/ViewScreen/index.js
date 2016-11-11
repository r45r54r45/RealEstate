import React from 'react'
import './style.scss'
import Slider from 'react-slick';
class ViewScreen extends React.Component {
    constructor() {
        super();
        this.onMainSlideEnd = this.onMainSlideEnd.bind(this);
        this.computeLists = this.computeLists.bind(this);
        this.state = {
            slideList: [],
            slideBreakpoint: [],
            current: {
                data: {}
            },
            data: [
                {
                    type: "매매",
                    name: "송도동 센트럴파크 3차",
                    location: '인천광역시 연수구 송도2동',
                    producedArea: 108.21,
                    realArea: 84.97,
                    floor: 5,
                    totalFloor: 10,
                    room: 5,
                    toilet: 3,
                    dueDate: '1개월 이내',
                    specification: '남쪽으로 센트럴파크 공원',
                    price: 69000,
                    created_at: '2016년 9월 5일',
                    image: [
                        'http://landthumb.phinf.naver.net/20161110_277/atcl_photo_1478740372135OnIXk_JPEG/1e8b46d88a0281bb9eedff6ed362b763.JPG?type=m562',
                        'http://landthumb.phinf.naver.net/20161110_277/atcl_photo_1478740372212rAkCD_JPEG/99dc2e3fec8f1715a38f4524f2c1dae7.JPG?type=m562',
                        'http://landthumb.phinf.naver.net/20161110_256/atcl_photo_14787403723479PiGA_JPEG/1f329c804207c0d49546d687e41298dc.JPG?type=m562',
                        'http://landthumb.phinf.naver.net/20161110_166/atcl_photo_1478740372129lntOw_JPEG/bfc9011d640d76c1cfb94a08fb21532f.JPG?type=m562',
                        'http://landthumb.phinf.naver.net/20161110_267/atcl_photo_1478740372229qyURE_JPEG/b715dfcdc3aceff8e3bbf554de14b212.JPG?type=m562'
                    ]

                },
                {
                    type: "월세",
                    name: "송도동 센트럴파크 2차",
                    location: '인천광역시 옥련동',
                    producedArea: 38.21,
                    realArea: 20.97,
                    floor: 40,
                    totalFloor: 43,
                    room: 4,
                    toilet: 2,
                    dueDate: '3일 이내',
                    specification: '주변에 조용한 거리',
                    price: 43000,
                    created_at: '2016년 5월 2일',
                    image: [
                        'http://landthumb.phinf.naver.net/20161110_14/atcl_photo_1478767285515Hd5WA_JPEG/eae864104a2b6c5b9622ec18d594473e.JPG?type=m562',
                        'http://landthumb.phinf.naver.net/20161110_112/atcl_photo_1478767285528p60FV_JPEG/cb2fdce48cf21abb999afe867f39aa27.JPG?type=m562',
                        'http://landthumb.phinf.naver.net/20161110_18/atcl_photo_1478767285526YieVL_JPEG/09fad2096756572e4d42025e45115429.JPG?type=m562',
                        'http://landthumb.phinf.naver.net/20161110_59/atcl_photo_1478767285529oUdmO_JPEG/be6fb99b8d068d11e96981d0e31a304a.JPG?type=m562'
                    ]
                },
                {
                    type: "전세",
                    name: "송도동 센트럴파크 1차",
                    location: '인천광역시 연수구 송도2동',
                    producedArea: 198.21,
                    realArea: 134.97,
                    floor: 1,
                    totalFloor: 3,
                    room: 2,
                    toilet: 1,
                    dueDate: '1년 이내',
                    specification: '비행기가 위로 지나다님',
                    price: 29000,
                    created_at: '2016년 9월 2일',
                    image: [
                        'http://landthumb.phinf.naver.net/20161110_21/atcl_photo_14787845303455vL59_JPEG/fd34cbafe8f1fe751715bc78006c55f8.JPG?type=m562',
                        'http://landthumb.phinf.naver.net/20161110_215/atcl_photo_1478784530345sXnA9_JPEG/36f4334d14e1823a82dcf54b506481de.JPG?type=m562',
                        'http://landthumb.phinf.naver.net/20161110_166/atcl_photo_1478784530348zphmR_JPEG/f5215917a3c49a583dfe0bc153d14b30.JPG?type=m562'
                    ]
                }
            ]
        }

    }

    componentDidMount() {
        this.computeLists();
    }

    computeLists() {
        console.log("compute start")
        let list = this.state.data;
        let slideBreakPoint = [0];
        let slideList = [];
        for (let i = 0; i < list.length; i++) {
            let length = list[i].image.length;
            slideBreakPoint.push(slideBreakPoint[slideBreakPoint.length - 1] + length);
            slideList = [...slideList, ...list[i].image]
        }
        this.setState(
            {
                slideBreakpoint: slideBreakPoint,
                slideList: slideList,
                current:{
                    data: this.state.data[0]
                }
            },()=>{
                console.log("compute end")
                setTimeout(()=>{
                    this.refs.slider.slickNext();
                },4000);
            })
    }

    onMainSlideEnd(index) {
        let nextSlideIndex = index + 1;
        console.log('앞으로 슬라이드 될 것의 index: ', nextSlideIndex);
        let findPosition = this.state.slideBreakpoint.findIndex(function (item) {
            return item === nextSlideIndex
        });
        if (findPosition !== -1) {
            console.log("다음걸로 가야합니다의 위치: ", findPosition)
            if (findPosition === this.state.data.length) {
                findPosition = 0;
            }
            this.setState({
                current: {
                    data: this.state.data[findPosition]
                }
            }, ()=> {
                this.refs.ListSlider.slickNext();
            })
        }
        setTimeout(()=>{
            this.refs.slider.slickNext();
        },4000);
    }

    render() {
        var SliderSettings = {
            dots: false,
            infinite: true,
            speed: 500,
            beforeChange: this.onMainSlideEnd,
            slidesToShow: 1,
            slidesToScroll: 1,
            lazyLoad: false
        };
        var ListSettings = {
            dots: false,
            infinite: true,
            vertical: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1
        };
        let currentData = this.state.current.data;
        let percent = Math.floor(parseFloat(currentData.realArea) / parseFloat(currentData.producedArea) * 1000) / 10;
        return (
            <div className="ViewScreen">
                <div className="top-area">
                    <div className="left-area">
                        <div className="slide-area">
                            {(this.state.slideList.length !== 0 ? (
                                <Slider ref="slider" {...SliderSettings}>
                                    {this.state.slideList.map((item, index)=> {
                                        return (
                                            <div className="img-wrapper" key={index}>
                                                <img src={item} role="presentation"/>
                                            </div>
                                        )
                                    })}
                                </Slider>
                            ) : (""))}
                        </div>
                        <div className="info-area">
                            <div className="left-area">
                                <div className="first-row">
                                    <div className="left">
                                        <span className="type">
                                            {currentData.type}
                                        </span>
                                        <span className="desc">
                                            {currentData.name}
                                        </span>
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            <span>공급/전용면적</span><span>(전용률 {percent}%)</span>
                                        </div>
                                        <div className="desc">
                                            <span>{currentData.producedArea}/{currentData.realArea}㎡</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="second-row">
                                    <div className="left">
                                        <div className="title">
                                            <span>해당층/총층</span>
                                        </div>
                                        <div className="desc">
                                            <span>{currentData.floor}/{currentData.totalFloor}층</span>
                                        </div>

                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            <span>방수/욕실수</span>
                                        </div>
                                        <div className="desc">
                                            <span>{currentData.room}/{currentData.toilet}개</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="third-row">
                                    <div className="title">
                                        <span>입주가능일</span>
                                    </div>
                                    <div className="desc">
                                        <span>{currentData.dueDate}</span>
                                    </div>
                                </div>
                                <div className="fourth-row">
                                    <div className="title">
                                        <span>특징</span>
                                    </div>
                                    <div className="desc">
                                        <span>{currentData.specification}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="right-area">
                                <div className="top">
                                    <div className="title">
                                        {currentData.type}가
                                    </div>
                                    <div className="desc">
                                        <span className="price">
                                            {currentData.price}
                                        </span>
                                        <span className="residue">
                                            만원
                                        </span>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <div className="title">
                                        등록일
                                    </div>
                                    <div className="desc">
                                        {currentData.created_at}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-area">
                        <div className="banner-area">
                            매물 현황
                        </div>
                        <div className="item-list-area">
                            <div className="overlay"></div>
                            <Slider ref="ListSlider" {...ListSettings}>
                                {this.state.data.map(function (item, index) {
                                    return (
                                        <div className="item" key={index}>
                                            <div className="image-area">
                                                <img
                                                    src={item.image[0]} role="presentation"/>
                                            </div>
                                            <div className="info-area">
                                                <div className="first-row">
                                                    <span className="type">{item.type}</span>
                                                    <span className="title">{item.name}</span>
                                                </div>
                                                <div className="next-row">
                                                    <span className="left">{item.location}</span>
                                                    <span
                                                        className="right">{item.realArea}㎡ {item.room}/{item.toilet}</span>
                                                </div>
                                                <div className="next-row">
                                                    <span className="left">세입자 고안매매</span>
                                                    <span className="right">{item.price}만원</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>
                        <div className="store-info-area">
                            <div className="storeName">
                                명문공인중개사
                            </div>
                            <div className="row">
                                대표: 이인숙
                            </div>
                            <div className="row">
                                전화: 02-1234-1234
                            </div>
                            <div className="row">
                                휴대폰: 010-1234-1234
                            </div>
                            <div className="row">
                                매물: {this.state.data.length}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-area">
                    <img className="left" src="http://realty.mfamily.co.kr/images/footer_imgl.png" role="presentation"/>
                    <img className="right" src="http://realty.mfamily.co.kr/images/footer_imgr.png" role="presentation"/>
                    <div className="marquee-wrapper">
                        <p className="marquee">안녕하세요</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default ViewScreen;