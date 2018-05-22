import React, { Component } from 'react';
import { Radio, Input } from 'antd';
const RadioGroup = Radio.Group;

class BTMyFileList extends Component {

  handleOk() {

  }

  render() {
    var list = listData.map((item, index)=>{
      return (
        <Row key={item.asset_id} span={8}>
          <Radio value={item.asset_id}>{value.asset_name}</Radio>
        </Row>
      )
    })

    return (
      <Modal visible={this.props.visible}
        onOk={()=>this.handleOk()}
        onCancel={this.handleCancel}
      >

        <div style={{height:300,overflow:"auto",margin:20}}>
          <RadioGroup style={{ width: '100%' }}  onChange={(e)=>this.onChange(e)} defaultValue=''>
            <Col>
              {list}
            </Col>
          </RadioGroup>
        </div>
      </Modal>

    );
  }

}

export default BTMyFileList;
