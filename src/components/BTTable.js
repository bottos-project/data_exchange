/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { BTRowFetch } from '../utils/BTCommonApi'

/**
 * 这个组件被很多地方公用
 * 需要向父组件暴露方法修改其 state
 * 目前是通过其 props 的 index 的改变
 * 来通知组件调用 setState
 * 之后会尝试更好的方法
 * @extends Component
 */
class BTTable extends Component {
  constructor(props){
    super(props);
    this.state={
      dataSource: [],
      total: 0
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(page, pageSize) {

    const { url, options, catchError } = this.props

    BTRowFetch(url, {
      "page_num": page,
      "page_size": pageSize,
      ...options
    })
    .then(res => {
      this.setState({
        dataSource: res.row,
        total: res.total
      })
    }).catch(err => {
      catchError(err)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.index != this.props.index) {
      const { dataSource, total } = nextProps.dataChange(this.state)
      this.setState({ dataSource, total });
    }
  }

  componentDidMount(){
    this.onChange(1, this.props.pageSize);
  }

  render() {
    const { dataSource, total } = this.state
    const { columns, rowKey, pageSize, style } = this.props
    return (
      <Table
          className="shadow radius table"
          columns={columns}
          rowKey={rowKey}
          style={style}
          dataSource={dataSource}
          pagination={{
            hideOnSinglePage: true,
            showQuickJumper: total / pageSize > 10,
            pageSize,
            total,
            onChange: this.onChange
          }}

      />
    );
  }

}

BTTable.defaultProps = {
  pageSize: 12,
  options: {},
  style: null,
};

BTTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rowKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  options: PropTypes.object,
  catchError: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  style: PropTypes.object,
  dataChange: PropTypes.func,
};

export default BTTable;
