import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { BTRowFetch } from '@/utils/BTCommonApi'

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
    if (nextProps.key != this.props.key) {
      const { dataSource, total } = nextProps.dataChange(dataSource)
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
};

export default BTTable;
