// import React,{PureComponent} from 'react'
// import { Card, Icon, Avatar,Button } from 'antd';
//
// const { Meta } = Card;
//
// export default class BTCardStyleRequirement extends PureComponent{
//     constructor(props){
//         super(props)
//     }
//
//
//     render(){
//         return(
//             <div>
//                 <Card
//                     style={{ width: 210 ,float:"left", margin:10}}
//                     cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
//                     actions={[<Icon type="star" />, <Icon type="ellipsis" />, <Icon type="shopping-cart "/> ]}
//                     hoverable = "true"
//                 >
//                     <span style={{float:"right", color:"#996456"}}>Tom</span>
//                     <Meta
//                         title="Pandas"
//                         description="some pictures of pandas"
//                     />
//                     <div style={{marginTop:10,marginBottom:10,fontSize:12}}>
//                         <p style={{margin:0, padding:0}}>发布时间：2018-1-10</p>
//                         <p style={{margin:0, padding:0}}>截止时间：2018-2-21</p>
//                     </div>
//                     <div>
//                         <span style={{ float:'right', fontSize:20,color:"red"}}>300</span>
//                         <Button style={{float:"left"}}>提交资产</Button>
//                     </div>
//                 </Card>
//                 <Card
//                     style={{ width: 210 ,float:"left", margin:10}}
//                     cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
//                     actions={[<Icon type="star" />, <Icon type="ellipsis" />, <Icon type="shopping-cart "/> ]}
//                     hoverable = "true"
//                 >
//                     <span style={{float:"right", color:"#996456"}}>Tom</span>
//                     <Meta
//                         title="Pandas"
//                         description="some pictures of pandas"
//                     />
//                     <div style={{marginTop:10,marginBottom:10,fontSize:12}}>
//                         <p style={{margin:0, padding:0}}>发布时间：2018-1-10</p>
//                         <p style={{margin:0, padding:0}}>截止时间：2018-2-21</p>
//                     </div>
//                     <div>
//                         <span style={{ float:'right', fontSize:20,color:"red"}}>300</span>
//                         <Button style={{float:"left"}}>提交资产</Button>
//                     </div>
//                 </Card>
//                 <Card
//                     style={{ width: 210 ,float:"left", margin:10}}
//                     cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
//                     actions={[<Icon type="star" />, <Icon type="ellipsis" />, <Icon type="shopping-cart "/> ]}
//                     hoverable = "true"
//                 >
//                     <span style={{float:"right", color:"#996456"}}>Tom</span>
//                     <Meta
//                         title="Pandas"
//                         description="some pictures of pandas"
//                     />
//                     <div style={{marginTop:10,marginBottom:10,fontSize:12}}>
//                         <p style={{margin:0, padding:0}}>发布时间：2018-1-10</p>
//                         <p style={{margin:0, padding:0}}>截止时间：2018-2-21</p>
//                     </div>
//                     <div>
//                         <span style={{ float:'right', fontSize:20,color:"red"}}>300</span>
//                         <Button style={{float:"left"}}>提交资产</Button>
//                     </div>
//                 </Card>
//                 <Card
//                     style={{ width: 210 ,float:"left", margin:10}}
//                     cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
//                     actions={[<Icon type="star" />, <Icon type="ellipsis" />, <Icon type="shopping-cart "/> ]}
//                     hoverable = "true"
//                 >
//                     <span style={{float:"right", color:"#996456"}}>Tom</span>
//                     <Meta
//                         title="Pandas"
//                         description="some pictures of pandas"
//                     />
//                     <div style={{marginTop:10,marginBottom:10,fontSize:12}}>
//                         <p style={{margin:0, padding:0}}>发布时间：2018-1-10</p>
//                         <p style={{margin:0, padding:0}}>截止时间：2018-2-21</p>
//                     </div>
//                     <div>
//                         <span style={{ float:'right', fontSize:20,color:"red"}}>300</span>
//                         <Button style={{float:"left"}}>提交资产</Button>
//                     </div>
//                 </Card>
//                 <Card
//                     style={{ width: 210 ,float:"left", margin:10}}
//                     cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
//                     actions={[<Icon type="star" />, <Icon type="ellipsis" />, <Icon type="shopping-cart "/> ]}
//                     hoverable = "true"
//                 >
//                     <span style={{float:"right", color:"#996456"}}>Tom</span>
//                     <Meta
//                         title="Pandas"
//                         description="some pictures of pandas"
//                     />
//                     <div style={{marginTop:10,marginBottom:10,fontSize:12}}>
//                         <p style={{margin:0, padding:0}}>发布时间：2018-1-10</p>
//                         <p style={{margin:0, padding:0}}>截止时间：2018-2-21</p>
//                     </div>
//                     <div>
//                         <span style={{ float:'right', fontSize:20,color:"red"}}>300</span>
//                         <Button style={{float:"left"}}>提交资产</Button>
//                     </div>
//                 </Card>
//                 <Card
//                     style={{ width: 210 ,float:"left", margin:10}}
//                     cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
//                     actions={[<Icon type="star" />, <Icon type="ellipsis" />, <Icon type="shopping-cart "/> ]}
//                     hoverable = "true"
//                 >
//                     <span style={{float:"right", color:"#996456"}}>Tom</span>
//                     <Meta
//                         title="Pandas"
//                         description="some pictures of pandas"
//                     />
//                     <div style={{marginTop:10,marginBottom:10,fontSize:12}}>
//                         <p style={{margin:0, padding:0}}>发布时间：2018-1-10</p>
//                         <p style={{margin:0, padding:0}}>截止时间：2018-2-21</p>
//                     </div>
//                     <div>
//                         <span style={{ float:'right', fontSize:20,color:"red"}}>300</span>
//                         <Button style={{float:"left"}}>提交资产</Button>
//                     </div>
//                 </Card>
//
//             </div>
//         )
//     }
// }
//
//
//
