import React from 'react'
import './style.scss'
import ShowHide from '../../component/ShowHide'


class UserUpdateStorePage extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'list',
            pathName: null,
            new: {
                type: 0
            },
            edit: {
                type: 0
            },
            newItem: {},
            editItem: {},
            basic:{},
            itemList: [],
            editTempImageList: []
        }
        this.editBasic = this.editBasic.bind(this);
        this.newItem = this.newItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.selectType = this.selectType.bind(this);
        this.mapValue = this.mapValue.bind(this);
        this.submitNew = this.submitNew.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.deleteEditItemImage = this.deleteEditItemImage.bind(this);
        this.editBasicSubmit=this.editBasicSubmit.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
    }

    componentWillMount() {
        fetch('/item?id=' + localStorage.getItem("userId")).then(dat=>dat.json()).then(data=> {
            this.setState({
                itemList: data.result
            })
        })
    }

    deleteEditItemImage(imageId) {
        let index=this.state.editTempImageList.findIndex((item)=>{
            return item.id=imageId;
        });
        let list;
        if(this.state.editItem.deleteImageList==undefined){
            list=[];
        }else{
            list=this.state.editItem.deleteImageList;
        }
        this.setState({
            editItem: Object.assign({},this.state.editItem,{
                deleteImageList: [...list,imageId]
            }),
            editTempImageList: [...this.state.editTempImageList.slice(0,index),...this.state.editTempImageList.slice(index+1)]
        })
    }

    submitNew() {
        alert('업로드 중입니다. 화면을 벗어나지 마세요');
        fetch('/item?id=' + this.props.location.query.id, {
            method: "POST",
            body: formDataSerialize(this.state.newItem)
        }).then(dat=>dat.json()).then(result=> {
            console.log(result);
            if (result.result === true) {
                alert('업로드 성공');
                location.reload();
            }
        }).catch(err=> {
            alert('에러 발생. 관리자에게 문의해주세요');
            console.log(err);
        })

    }
    deleteItem(id){
        if(confirm('삭제하시겠습니까?')){
            fetch('/item?id='+id,{
                method: "DELETE"
            }).then(dat=>dat.json).then(data=>{
                location.reload();
            })
        }
    }
    editBasicSubmit(){
        alert('업로드 중입니다. 화면을 벗어나지 마세요');
        fetch('/user?id=' + localStorage.getItem("userId"), {
            method: "PUT",
            body: formDataSerialize(this.state.basic)
        }).then(dat=>dat.json()).then(result=> {
            console.log(result);
            if (result.result === true) {
                alert('업로드 성공');
                this.editBasic();
            }
        }).catch(err=> {
            alert('에러 발생. 관리자에게 문의해주세요');
            console.log(err);
        })
    }
    submitEdit() {
        alert('업로드 중입니다. 화면을 벗어나지 마세요');
        fetch('/item?id=' + this.state.editItem.id, {
            method: "PUT",
            body: formDataSerialize(this.state.editItem)
        }).then(dat=>dat.json()).then(result=> {
            console.log(result);
            if (result.result === true) {
                alert('업로드 성공');
                location.reload();
            }
        }).catch(err=> {
            alert('에러 발생. 관리자에게 문의해주세요');
            console.log(err);
        })
    }

    editBasic() {
        if (this.state.current === 'basic') {
            this.setState(
                {
                    current: 'list'
                }
            )
        } else {
            fetch('/user?id='+this.props.location.query.id).then(dat=>dat.json()).then((result)=>{
                this.setState(
                    {
                        current: 'basic',
                        basic: result.result
                    }
                )
            })
        }

    }

    newItem(type) {
        if (type.cancel) {
            this.setState(
                {
                    current: 'list'
                }
            )
        } else {
            this.setState(
                {
                    current: 'new'
                }
            )
        }

    }

    editItem(type) {
        if (type.cancel) {
            this.setState({
                current: 'list',
                editItem: {},
                editTempImageList:[]
            })
        } else {
            fetch('/item?item=' + type.data.id).then(dat=>dat.json()).then((data)=> {
                this.setState({
                    editItem: data.result,
                    editTempImageList: data.result.images
                }, ()=> {
                    this.setState({
                        edit: {
                            type: data.result.type,
                        }
                    })
                });

            })
            this.setState(
                {
                    current: 'edit'
                }
            )
        }

    }

    selectType(section, type) {
        this.setState({
            [section]: {
                type: type
            }
        })
    }

    mapValue(input, area, type) {
        if (type === "file") {
            let files = input.files;
            let length = input.files.length;
            let fileList = [];
            for (let i = 0; i < length; i++) {
                fileList.push(files[i]);
            }
            this.setState({
                [area]: Object.assign({},this.state[area], {
                    image: fileList
                })
            })
        } else if (type === "type") {
            this.setState({
                [area]: Object.assign({},this.state[area], {
                    [type]: input
                })
            })
        } else {
            this.setState({
                [area]: Object.assign({},this.state[area], {
                    [type]: input.value
                })
            })
        }
    }

    render() {
        return (
            <div className="UpdateStorePage">
                <h1>
                    <button onClick={this.editBasic} className="editBasicButton">기본 정보 수정</button>
                </h1>
                <ShowHide show={this.state.current !== 'new'}>
                    <button className="newItemButton" onClick={this.newItem}>새 매물</button>
                </ShowHide>
                {this.state.current === 'list' ? (
                    <div className="ItemList">
                        <h3>매물 리스트</h3>
                        <ul>
                            {this.state.itemList.map((item, index)=> {
                                return (
                                    <li key={index}>
                                        {item.title} <a onClick={this.deleteItem.bind(this,item.id)} className="delete">삭제</a> <a className="edit" onClick={this.editItem.bind(this, {
                                        cancel: undefined,
                                        data: item
                                    })}>수정</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ) : ("")}
                {this.state.current === 'edit' ? (
                    <div>
                        <form className="newItem-area">
                            <div className="row">
                                <h4>매물 종류</h4>
                                <input id="j_edit" name="type" type="radio"
                                       onChange={this.selectType.bind(this, 'edit', 1)}
                                       checked={this.state.editItem.type == 1}/>
                                <label htmlFor="j_edit">전세</label>

                                <input id="m_edit" name="type" type="radio"
                                       onChange={this.selectType.bind(this, 'edit', 2)}
                                       checked={this.state.editItem.type == 2}/>
                                <label htmlFor="m_edit">매매</label>

                                <input id="w_edit" name="type" type="radio"
                                       onChange={this.selectType.bind(this, 'edit', 3)}
                                       checked={this.state.editItem.type == 3}/>
                                <label htmlFor="w_edit">월세</label>
                            </div>
                            <div className="row">
                                <h4>매물 제목</h4>
                                <input id="name" value={this.state.editItem.title} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'title')}/>
                            </div>
                            <div className="row">
                                <h4>위치</h4>
                                <input id="ceo_name" value={this.state.editItem.location} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'location')}/>
                            </div>
                            <div className="row">
                                <h4>공급 면적</h4>
                                <input id="ceo_name" value={this.state.editItem.produced_area} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'produced_area')}/>㎡
                            </div>
                            <div className="row">
                                <h4>전용 면적</h4>
                                <input id="ceo_name" value={this.state.editItem.real_area} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'real_area')}/>㎡
                            </div>
                            <div className="row">
                                <h4>해당 층</h4>
                                <input id="ceo_name" value={this.state.editItem.floor} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'floor')}/>층
                            </div>
                            <div className="row">
                                <h4>전체 층</h4>
                                <input id="ceo_name" value={this.state.editItem.total_floor} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'total_floor')}/>층
                            </div>
                            <div className="row">
                                <h4>방수</h4>
                                <input id="ceo_name" value={this.state.editItem.room} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'room')}/>개
                            </div>
                            <div className="row">
                                <h4>욕실 수</h4>
                                <input id="ceo_name" value={this.state.editItem.toilet} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'toilet')}/>개
                            </div>
                            <div className="row">
                                <h4>입주 가능일</h4>
                                <input id="ceo_name" value={this.state.editItem.available} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'available')}/>
                            </div>
                            <div className="row">
                                <h4>특징</h4>
                                <input id="ceo_name" value={this.state.editItem.specification} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'specification')}/>
                            </div>
                            <div className="row" style={this.state.edit.type !== 2 ? {display: 'none'} : {}}>
                                <h4>매매가</h4>
                                <input id="ceo_name" value={this.state.editItem.m_price} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'm_price')}/>원
                            </div>
                            <div className="row" style={this.state.edit.type !== 1 ? {display: 'none'} : {}}>
                                <h4>전세가</h4>
                                <input id="ceo_name" value={this.state.editItem.j_price} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'j_price')}/>원
                            </div>
                            <div className="row" style={this.state.edit.type !== 3 ? {display: 'none'} : {}}>
                                <h4>보증금</h4>
                                <input id="ceo_name" value={this.state.editItem.b_price} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'b_price')}/>원
                            </div>
                            <div className="row" style={this.state.edit.type !== 3 ? {display: 'none'} : {}}>
                                <h4>월세</h4>
                                <input id="ceo_name" value={this.state.editItem.w_price} type="text"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'w_price')}/>원
                            </div>
                            <div className="row">
                                <h4>사진 추가</h4>
                                <input type="file" accept="image/x-png,image/gif,image/jpeg"
                                       onChange={e=>this.mapValue(e.target, 'editItem', 'file')} multiple/>
                            </div>
                        </form>
                        <div className="imageList">
                            {this.state.editTempImageList.map((item, index)=> {
                                return (
                                    <div key={index} className="imageItem" style={{backgroundImage: `url(/img/${item.url})`}}>
                                        <button onClick={this.deleteEditItemImage.bind(this, item.id)}>삭제</button>
                                    </div>
                                )
                            },this)}
                        </div>
                        <div>
                            <button id="newItemUploadButton" onClick={this.submitEdit}>수정</button>
                            <button style={{marginLeft: '10px'}} id="newItemUploadButton"
                                    onClick={this.editItem.bind(this, {cancel: true})}>취소
                            </button>
                        </div>
                    </div>
                ) : ("")}

                {this.state.current === 'basic' ? (
                    <div className="editBasicForm">
                        <div className="row">
                            <label htmlFor="name">업체 이름</label>
                            <input id="name" type="text" value={this.state.basic.store_name}
                                   onChange={e=>this.mapValue(e.target, 'basic', 'store_name')}/>
                        </div>
                        <div className="row">
                            <label htmlFor="ceo_name">대표 성함</label>
                            <input id="ceo_name" type="text" value={this.state.basic.ceo_name}
                                   onChange={e=>this.mapValue(e.target, 'basic', 'ceo_name')}/>
                        </div>
                        <div className="row">
                            <label htmlFor="id">아이디</label>
                            <input id="id" type="text"  value={this.state.basic.login_id}
                                   onChange={e=>this.mapValue(e.target, 'basic', 'login_id')}/>
                        </div>
                        <div className="row">
                            <label htmlFor="pw">비밀번호</label>
                            <input id="pw" type="password"  value={this.state.basic.login_pw}
                                   onChange={e=>this.mapValue(e.target, 'basic', 'login_pw')}/>
                        </div>
                        <div className="row">
                            <label htmlFor="tel">전화번호(유선)</label>
                            <input id="tel" type="tel"  value={this.state.basic.tel}
                                   onChange={e=>this.mapValue(e.target, 'basic', 'tel')}/>
                        </div>
                        <div className="row">
                            <label htmlFor="phone">휴대폰 번호</label>
                            <input id="phone" type="tel" value={this.state.basic.phone}
                                   onChange={e=>this.mapValue(e.target, 'basic', 'phone')}/>
                        </div>
                        <div className="row">
                            <label htmlFor="phone">동영상 재생 주기 (몇 매물마다)</label>
                            <input id="phone" placeholder="숫자만 적어주세요" type="number" value={this.state.basic.video_num}
                                   onChange={e=>this.mapValue(e.target, 'basic', 'video_num')}/>
                        </div>
                        <div className="row">
                            <label htmlFor="phone">동영상 아이디</label>
                            <input id="phone" type="number" value={this.state.basic.video_id}
                                   onChange={e=>this.mapValue(e.target, 'basic', 'video_id')}/>
                        </div>
                        <div className="row">
                            <label htmlFor="phone">사진 재생 주기 (몇 매물마다)</label>
                            <input id="phone" placeholder="숫자만 적어주세요" type="number" value={this.state.basic.image_num}
                                   onChange={e=>this.mapValue(e.target, 'basic', 'image_num')}/>
                        </div>
                        <div className="row">
                            <label htmlFor="phone">사진 등록/변경</label>
                            <input id="phone" type="file"
                                   onChange={e=>this.mapValue(e.target, 'basic', 'file')}/>
                        </div>
                        <div className="row">
                            <label htmlFor="phone">계약 시작일</label>
                            <input id="phone" type="text" value={this.state.basic.contract_start}
                                   onChange={e=>this.mapValue(e.target, 'basic', 'contract_start')}/>
                        </div>
                        <div className="row">
                            <label htmlFor="phone">계약 기간</label>
                            <input id="phone" type="text" value={this.state.basic.contract_duration}
                                   onChange={e=>this.mapValue(e.target, 'basic', 'contract_duration')}/>
                        </div>
                        <div className="row">
                            <label htmlFor="phone">계약 종료일</label>
                            <input id="phone" type="text" value={this.state.basic.contract_end}
                                   onChange={e=>this.mapValue(e.target, 'basic', 'contract_end')}/>
                        </div>
                        <div className="row">
                            <button onClick={this.editBasicSubmit}>기본정보 수정</button>
                        </div>
                    </div>
                ) : ("")}

                {this.state.current === 'new' ? (
                    <div>
                        <form className="newItem-area" id="newItemForm" method="post">
                            <div className="row">
                                <h4>매물 종류</h4>
                                <input id="j_new" name="type" type="radio" onChange={e=> {
                                    this.mapValue(1, 'newItem', 'type');
                                    this.selectType('new', 1)
                                }}/>
                                <label htmlFor="j_new">전세</label>

                                <input id="m_new" name="type" type="radio" onChange={e=> {
                                    this.mapValue(2, 'newItem', 'type');
                                    this.selectType('new', 2)
                                }}/>
                                <label htmlFor="m_new">매매</label>

                                <input id="w_new" name="type" type="radio" onChange={e=> {
                                    this.mapValue(3, 'newItem', 'type');
                                    this.selectType('new', 3)
                                }}/>
                                <label htmlFor="w_new">월세</label>
                            </div>
                            <div className="row">
                                <h4>매물 제목</h4>
                                <input id="name" type="text" onChange={e=>this.mapValue(e.target, 'newItem', 'title')}/>
                            </div>
                            <div className="row">
                                <h4>위치</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'location')}/>
                            </div>
                            <div className="row">
                                <h4>공급 면적</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'produced_area')}/>㎡
                            </div>
                            <div className="row">
                                <h4>전용 면적</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'real_area')}/>㎡
                            </div>
                            <div className="row">
                                <h4>해당 층</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'floor')}/>층
                            </div>
                            <div className="row">
                                <h4>전체 층</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'total_floor')}/>층
                            </div>
                            <div className="row">
                                <h4>방수</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'room')}/>개
                            </div>
                            <div className="row">
                                <h4>욕실 수</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'toilet')}/>개
                            </div>
                            <div className="row">
                                <h4>입주 가능일</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'available')}/>
                            </div>
                            <div className="row">
                                <h4>특징</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'specification')}/>
                            </div>
                            <div className="row" style={this.state.new.type !== 2 ? {display: 'none'} : {}}>
                                <h4>매매가</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'm_price')}/>원
                            </div>
                            <div className="row" style={this.state.new.type !== 1 ? {display: 'none'} : {}}>
                                <h4>전세가</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'j_price')}/>원
                            </div>
                            <div className="row" style={this.state.new.type !== 3 ? {display: 'none'} : {}}>
                                <h4>보증금</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'b_price')}/>원
                            </div>
                            <div className="row" style={this.state.new.type !== 3 ? {display: 'none'} : {}}>
                                <h4>월세</h4>
                                <input id="ceo_name" type="text"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'w_price')}/>원
                            </div>
                            <div className="row">
                                <h4>사진</h4>
                                <input type="file" accept="image/x-png,image/gif,image/jpeg"
                                       onChange={e=>this.mapValue(e.target, 'newItem', 'file')} multiple/>
                            </div>
                        </form>
                        <div>
                            <button id="newItemUploadButton" onClick={this.submitNew}>업로드</button>
                            <button style={{marginLeft: '10px'}} id="newItemUploadButton"
                                    onClick={this.newItem.bind(this, {cancel: true})}>취소
                            </button>
                        </div>
                    </div>
                ) : ("")}
            </div>
        );
    }
}
function formDataSerialize(data) {
    let form = new FormData();
    for (let key in data) {
        if (key == 'image') {
            for (let i = 0; i < data[key].length; i++) {
                form.append(key, data[key][i]);
            }
        } else if(key =='images') {

        } else {
            form.append(key, data[key]);
        }
    }
    return form;
}
export default UpdateStorePage;