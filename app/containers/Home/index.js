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
            <div className="headerTagStyle">
                <Radio.Group onChange={(e)=>this.handleModeChange(e)} value={mode} style={{ marginBottom: 8}}>
                    <Radio.Button value="top">资产需求</Radio.Button>
                    <Radio.Button value="left">数据资产</Radio.Button>
                </Radio.Group>
            </div>

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


                <div style={{padding:20}}>
                <BTList linkto='/assetdetail'/>
                    {/* <List
                        itemLayout="vertical"
                        size="large"
                        pagination={pagination}
                        dataSource={listData}
                        renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                            />
                            {item.content}
                        </List.Item>
                        )}
                    /> */}
                    {/* <ul className="listStyle">
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                        <li><BTHomeCell/></li>
                    </ul> */}
                </div>
            </div>
        )
    }
}