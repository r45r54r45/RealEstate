import React from 'react'
import './style.scss'
import Slider from 'react-slick';
import Vimeo from '@vimeo/player';

class ViewScreen extends React.Component {
    constructor() {
        super();
        this.onMainSlideEnd = this.onMainSlideEnd.bind(this);
        this.computeLists = this.computeLists.bind(this);
        this.fireVideoPlayer = this.fireVideoPlayer.bind(this);
        this.state = {
            slideList: [],
            slideBreakpoint: [],
            videoPlay: false,
            imagePlay: false,
            currentCount: 0,
            current: {
                data: {}
            },
            basic: {},
            data: []
        }

    }

    componentWillMount() {
        console.log("component will mount");
        var _this = this;
        console.log("fetch start");
        fetch('/view?id=' + this.props.location.query.id).then(dat=>dat.json()).then(data=> {
            _this.setState({
                data: data.list,
                basic: data.basic
            }, ()=> {
                _this.computeLists();
                console.log(_this.state);
            })
        })
    }

    componentDidMount() {
        this.timeInterval = 4000;
    }

    computeLists() {
        console.log("compute start")
        let list = this.state.data;
        let slideBreakPoint = [0];
        let slideList = [];
        for (let i = 0; i < list.length; i++) {
            let length = list[i].images.length;
            slideBreakPoint.push(slideBreakPoint[slideBreakPoint.length - 1] + length);
            slideList = [...slideList, ...list[i].images]
        }
        this.setState(
            {
                slideBreakpoint: slideBreakPoint,
                slideList: slideList,
                current: {
                    data: this.state.data[0]
                }
            }, ()=> {
                console.log("compute end")
                setTimeout(()=> {
                    this.refs.slider.slickNext();
                    console.log("처음거 슬라이드 완료")
                }, this.timeInterval);
            })
    }

    fireVideoPlayer() {
        return new Promise((resolve, reject)=> {
            /*
             비디어 재생 로직
             -> 매물 몇개 마다
             -> 예를 들어 매물이 3개여도 5개 마다 재생되도록 (반복 되니까)
             */
            const jugi_video = this.state.basic.video_num;
            const jugi_image = this.state.basic.image_num;
            var videoEnable = false;
            var imageEnable = false;
            if (jugi_video == -1 && jugi_image == -1) {
                resolve();
            }
            if (!((jugi_video !== -1 && this.state.basic.video_id != "null") || (jugi_image !== -1 && this.state.basic.image_url !== "null"))) {
                resolve();
            }
            if (jugi_video !== -1 && this.state.basic.video_id != "null") {
                videoEnable = true;
            }
            if (jugi_image !== -1 && this.state.basic.image_url != "null") {
                imageEnable = true;
            }
            let nextCount = this.state.currentCount + 1;
            this.setState({
                currentCount: nextCount
            })
            function checkRotation(videoEnable, jugi_video, imageEnable, jugi_image, nextCount) {
                if (videoEnable) {
                    if (nextCount % jugi_video === 0) {
                        return 'VIDEO'
                    }
                }
                //비디오 우선
                if (imageEnable) {
                    if (nextCount % jugi_image === 0) {
                        return 'IMAGE'
                    }
                }
                return false;
            }

            var rotation = checkRotation(videoEnable, jugi_video, imageEnable, jugi_image, nextCount);
            if (!rotation) { //아직 fire 할때가 아니라면
                resolve();
            } else if (rotation === 'VIDEO') { //비디오 재생할 때라면
                var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                var options = {
                    id: this.state.basic.video_id,
                    width: w,
                    height: h
                };
                this.setState({
                    videoPlay: true
                }, ()=> {
                    var player = new Vimeo('made-in-ny', options);
                    player.setVolume(100);
                    player.play();
                    player.on('ended', () => {
                        console.log('played the video!');
                        this.setState({
                            videoPlay: false
                        }, ()=> {
                            resolve();
                        })
                    });
                })
            } else if (rotation === "IMAGE") {
                this.setState({
                    imagePlay: true
                }, ()=>{
                    setTimeout(()=>{
                        this.setState({
                            imagePlay: false
                        }, ()=> {
                            resolve();
                        })
                    },4000);
                })
            } else {
                resolve();
            }
        });
    }

    onMainSlideEnd(index) {
        //index 는 바로 전에 지나간 슬라이드의 index 번호
        let nextSlideIndex = index + 2;
        let findPosition = this.state.slideBreakpoint.findIndex(function (item) {
            return item === nextSlideIndex
        });
        console.log("누적에서의 위치", findPosition)
        if (findPosition !== -1) { //다음 매물로 넘어가야한다면
            if (findPosition === this.state.data.length) { //매물이 전체 한바퀴 돌아 끝이 났다면
                findPosition = 0; //다시 처음으로
            }
            setTimeout(()=> {
                this.fireVideoPlayer().then(()=> { //비디오 재생 여부 체크

                    this.setState({
                        current: {
                            data: this.state.data[findPosition] //해당 매물의 데이터를 채워넣는다.
                        }
                    }, ()=> {
                        this.refs.ListSlider.slickNext();
                        console.log("슬라이드 메인")
                        this.refs.slider.slickNext();
                        //TODO 왜 두개가 동시에 안움직임
                        console.log("슬라이드 사이드")
                    })
                });
            }, this.timeInterval)
        } else { //현재 매물에 사진이 더 있다면
            setTimeout(()=> {
                console.log("슬라이드~")
                this.refs.slider.slickNext();
            }, this.timeInterval);
        }
    }

    render() {
        var SliderSettings = {
            dots: false,
            infinite: true,
            speed: 500,
            beforeChange: this.onMainSlideEnd,
            slidesToShow: 1,
            draggable: false,
            swipeToSlide: false,
            slidesToScroll: 1,
            lazyLoad: false
        };
        var ListSettings = {
            dots: false,
            infinite: true,
            vertical: true,
            speed: 500,
            draggable: false,
            swipeToSlide: false,
            slidesToShow: 5,
            slidesToScroll: 1
        };
        let currentData = this.state.current.data;
        let percent = Math.floor(parseFloat(currentData.real_area) / parseFloat(currentData.produced_area) * 1000) / 10;
        const css = `
                body {
                    overflow: hidden;
                }

                    @media(max-width: 768px) {
                    html {
                    font-size: 5px;
                }
                }

                    @media screen and (min-width: 768px) and (max-width: 1100px) {
                    html {
                    font-size: 11px;
                }
                }

                    @media screen and (min-width: 1100px) and (max-width: 1600px) {
                    html {
                    font-size: 16px;
                }
                }

                    @media screen and (min-width: 1600px) {
                    html {
                    font-size: 21px;
                }
                }
            `;
        return (
            <div className="ViewScreen">
                <style>{css}
                </style>
                <div className="whole-page-video-area" id="made-in-ny"
                     style={!this.state.videoPlay ? {display: 'none'} : {}}></div>
                <div className="whole-page-image-area"
                     style={!this.state.imagePlay ? {display: 'none'} : {backgroundImage:'url(/img/'+this.state.basic.image_url+')'}}>
                </div>
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
                            <div className="additional-info">
                                공급  {Math.floor(currentData.produced_area/3.3*10)/10}평/ 전용 {Math.floor(currentData.real_area/3.3*10)/10}평
                            </div>
                        </div>
                        <div className="info-area">
                            <div className="left-area">
                                <div className="first-row">
                                    <div className="left">
                                        <span className="type">
                                            {currentData.type == 1 ? "전세" : (currentData.type == 2 ? "매매" : (currentData.type == 3 ? "월세": "분양"))}
                                        </span>
                                        <span className="desc">
                                            {currentData.title}
                                        </span>
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            <span>공급/전용면적</span><span>(전용률 {percent}%)</span>
                                        </div>
                                        <div className="desc">
                                            <span>{currentData.produced_area}/{currentData.real_area}㎡</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="second-row">
                                    <div className="left">
                                        <div className="title">
                                            <span>해당층/총층</span>
                                        </div>
                                        <div className="desc">
                                            <span>{currentData.floor}/{currentData.total_floor}층</span>
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
                                        <span>{currentData.available}</span>
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
                                    <div>
                                        <div className="title">
                                            {currentData.type == 1 ? "전세가" : (currentData.type == 2 ? "매매가" : (currentData.type == 3 ? "월세/보증금": "분양가/매매가"))}
                                        </div>
                                        <div className="desc">
                                        <span className="price" dangerouslySetInnerHTML={{__html:getBigPrice(currentData)}}>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <div className="title">
                                        등록일
                                    </div>
                                    <div className="desc">
                                        {getDate(currentData.created_at)}
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
                            {this.state.data.length !== 0 ? (
                                <Slider ref="ListSlider" {...ListSettings}>
                                    {this.state.data.map(function (item, index) {
                                        return (
                                            <div className="item" key={index}>
                                                <div className="image-area">
                                                    <img
                                                        src={item.images[0]} role="presentation"/>
                                                </div>
                                                <div className="info-area">
                                                    <div className="first-row">
                                                        <span
                                                            className="type">{item.type == 1 ? "전세" : (item.type == 2 ? "매매" : (item.type == 3 ? "월세": "분양"))}</span>
                                                        <span className="title">{item.title}</span>
                                                    </div>
                                                    <div className="next-row">
                                                        <span className="left">{item.location}</span>
                                                        <span
                                                            className="right">{item.real_area}㎡ {item.room}/{item.toilet}</span>
                                                    </div>
                                                    <div className="next-row">
                                                        <span className="left">{item.specification}</span>
                                                        <span className="right">{getPrice(item)}만원</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Slider>
                            ) : ("")}

                        </div>
                        <div className="store-info-area">
                            <div className="storeName">
                                {this.state.basic.store_name}
                            </div>
                            <div className="row">
                                대표: {this.state.basic.ceo_name}
                            </div>
                            <div className="row">
                                전화: {this.state.basic.tel}
                            </div>
                            <div className="row">
                                휴대폰: {this.state.basic.phone}
                            </div>
                            <div className="row">
                                매물: {this.state.data.length}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-area">
                    <img className="left" src="http://realty.mfamily.co.kr/images/footer_imgl.png" role="presentation"/>
                    <img className="right" src="http://realty.mfamily.co.kr/images/footer_imgr.png"
                         role="presentation"/>
                    <div className="marquee-wrapper">
                        <p className="marquee">{this.state.basic.message}</p>
                    </div>
                </div>
            </div>
        )
    }
}
function getPrice(item) {
    switch (item.type) {
        case 1:
            return item.j_price;
        case 2:
            return item.m_price;
        case 3:
            return item.w_price;
        case 4:
            return item.y_price;
    }
}
function getBigPrice(item) {
    switch (item.type) {
        case 1:
            return item.j_price+'<span class="residue">만원 </span>';
        case 2:
            return item.m_price+'<span class="residue">만원 </span>';
        case 3:
            return item.w_price+'<span class="residue">만원/</span> '+item.b_price+'<span class="residue">만원 </span>';
        case 4:
            return item.y_price+'<span class="residue">만원/</span> '+item.m_price+'<span class="residue">만원 </span>';
    }
}
function getDate(time){
    let d=new Date(time);
    return d.getFullYear()+"년 "+(d.getMonth()+1)+"월 "+d.getDate()+"일";
}
export default ViewScreen;