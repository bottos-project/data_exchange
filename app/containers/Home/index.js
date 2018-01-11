import React, { PureComponent } from 'react'
import './styles.less'
import BTHomeCell from './subviews/BTHomeCell'

export default class BTHome extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <ul className="listStyle">
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
                </ul>
            </div>
        )
    }
}