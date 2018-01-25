import React, { PureComponent } from 'react'
import {Radio,List, Avatar, Icon} from 'antd'
import './styles.less'
import BTHomeCell from './subviews/BTHomeCell'

import BTMyTag from '../../components/BTMyTag'

import BTList from '../../components/BTList'


const listData = [];
for (let i = 0; i < 5; i++) {
  listData.push({
    href: 'https://www.bottos.org/',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const pagination = {
  pageSize: 10,
  current: 1,
  total: listData.length,
  onChange: (() => {}),
};

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


const BTHeaderSearch = () => (
    <div className="searchViewStyle">
        <BTMyTag>全部</BTMyTag>
        <BTMyTag>数据挖掘</BTMyTag>
        <BTMyTag>图像</BTMyTag>
        <BTMyTag>数据清洗</BTMyTag>

        <div></div>
        <p></p>
        <BTMyTag>全部</BTMyTag>
        <BTMyTag>视频</BTMyTag>
        <BTMyTag>音频</BTMyTag>
        <BTMyTag>图片</BTMyTag>
    </div>
)


export default class BTHome extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            mode: 'top',
        };
    }

    handleModeChange(e){
        const mode = e.target.value;
        this.setState({ mode });
    }

    render() {
        const { mode } = this.state;
        return (
            <div className="container">
                <BTHeaderSearch/>
                <div className="homeList">
                    <BTList linkto='/assetdetail'/>
                </div>
            </div>
        )
    }
}