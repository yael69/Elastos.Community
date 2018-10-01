import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import {TEAM_TYPE, TEAM_SUBCATEGORY} from '@/constant'
import I18N from '@/I18N'
import './style.scss'
import { Col, Row, Card, Button, message, Spin, Avatar, Modal, Icon } from 'antd'
import _ from 'lodash'

export default class extends StandardPage {
    ord_props() {
        return {
        }
    }

    async componentDidMount() {
        await this.props.getTeams({ type: TEAM_TYPE.CRCLE })
    }

    checkForLoading(followup) {
        return this.props.loading
            ? <div className="full-width halign-wrapper">
                <Spin size="large"/>
            </div>
            : _.isFunction(followup) && followup()
    }

    buildCircle(circle = {}) {
        const member = !!_.find(this.props.myCircles, { _id: circle._id })
        const mainClassName = 'emp35-circle-item ' + (member
            ? 'member'
            : '')

        return (
            <div className={mainClassName}>
                <img
                    className="ellipsis-img"
                    src={ member
                        ? '/assets/images/emp35/circle_ellipse_active.svg'
                        : '/assets/images/emp35/circle_ellipse.svg'
                    }
                />
                <img
                    className="circle-img"
                    src="/assets/images/emp35/circle_group.svg"
                />
                <div className="indicator-container">
                    <Icon type="message" style={{ fontSize: 11 }}/>
                    <div className="indicator">{circle.comments.length}</div>
                    <Icon type="team" style={{ fontSize: 11 }}/>
                    <div className="indicator">{circle.members.length}</div>
                </div>
                <span className="title"
                    onClick={() => this.props.history.push(`/empower35-detail/${circle._id}`)}>{circle.name}</span>
            </div>
        );
    }

    buildCirclesWorker(circles, grid) {
        return (
            <Row className="d_Row">
                {_.map(circles, (circle) => (
                    <Col key={circle._id} xs={24} sm={24} md={grid}>
                        {this.buildCircle(circle)}
                    </Col>
                ))}
            </Row>
        )
    }

    buildMyCircles() {
        const myCircles = this.props.myCircles
        return this.buildCirclesWorker(myCircles, 12)
    }

    buildCircles(query) {
        const circles = this.props.all_teams || {};
        const queriedCircles = _.filter(_.values(circles), query)
        return this.buildCirclesWorker(queriedCircles, 6)
    }

    ord_renderContent () {
        return (
            <div className="p_emp35">
                <div className="ebp-header-divider" />
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_content">
                            {this.buildHeader()}
                            {this.buildMyCirclesContainer()}
                            {this.buildTeamHeader()}
                            {this.buildEssentialCircles()}
                            {this.buildAdvancedCircles()}
                            {this.buildServicesCircles()}
                            {this.buildCircleStatement()}
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }

    buildHeader() {
        return (
            <div className="emp35-header">
                <div className="circle-container">
                    <img className="circle" src="assets/images/training_circle.png"></img>
                </div>
                <div className="right-box-container">
                    <div className="small-box"></div>
                    <div className="box"></div>
                    <img src="assets/images/training_white_slashed_box.png"/>
                </div>
                <div className="bottom-box-container">
                    <div className="box"></div>
                </div>
                <div className="connector-container">
                    <img src="assets/images/training_mini_connector.png"/>
                </div>
                <div className="container">
                    <div className="rect-container">
                        <div className="rect"></div>
                    </div>
                    <div className="title">
                        {I18N.get('emp35.header.title')}
                    </div>
                    <div className="content">
                        <div class="center">
                            <div className="strike-text">
                                <div className="strike-line"/>
                                <p>{I18N.get('emp35.header.content.1')}</p>
                            </div>
                            <div className="strike-text">
                                <div className="strike-line"/>
                                <p>{I18N.get('emp35.header.content.2')}</p>
                            </div>
                            <div className="strike-text">
                                <div className="strike-line"/>
                                <p>{I18N.get('emp35.header.content.3')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    buildMyCirclesContainer() {
        return (
            <div className="emp35-my-circles-container">
                <div className="emp35-my-circles">
                    <div className="emp35-my-circles-message">
                        <div className="container">
                            <div className="content">
                                <p>
                                    {I18N.get('emp35.empower.content')}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="emp35-my-circles-list">
                        <div className="message-container">
                            <div className="container">
                                <div className="content">
                                    <div className="header">
                                        <img id="emp35_square" src="/assets/images/emp35/square.png"/>
                                        <div className="inner-container">
                                            <span className="title">{I18N.get('emp35.mycircles.title')}</span>
                                        </div>
                                    </div>
                                    {this.props.is_login && this.buildMyCircles()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    buildCircleStatement() {
        return (
            <div className="emp35-statement-container">
                <div className="emp35-statement">
                    <div className="emp35-statement-image">
                        <img id="emp35_statement" src="/assets/images/what@2x.jpg"/>
                    </div>
                    <div className="emp35-statement-message">
                        <div className="message-container">
                            <img id="emp35_square" src="/assets/images/emp35/square.png"/>
                            <div className="container">
                                <div className="content">
                                    <p>
                                        {I18N.get('emp35.circles.statement')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    buildTeamHeader() {
        return (
            <div className="emp35-teamHeader-container">
                <div className="header-bar" />
                <div className="emp35-teamHeader">
                    <div className="container">
                        <div className="circle-container">
                            <img src="assets/images/training_circle.png"></img>
                        </div>
                        <img id="emp35_lock" src="/assets/images/training_connector.png"/>
                        <img id="emp35_square" src="/assets/images/emp35/square.png"/>
                        <div className="inner-container">
                            <span className="title">{I18N.get('emp35.teamHeader.title')}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    buildEssentialCircles() {
        return (
            <div className="emp35-teamDark">
                <div className="container">
                    <Row>
                        <Col xs={{span: 24}} md={{span: 24}}>
                            <span className="blue-title">Essential</span>
                            {this.checkForLoading(() => {
                                return this.buildCircles({ subcategory: TEAM_SUBCATEGORY.ESSENTIAL })
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    buildAdvancedCircles() {
        return (
            <div className="emp35-teamDark">
                <div className="container">
                    <Row>
                        <Col xs={{span: 24}} md={{span: 24}}>
                            <span className="blue-title">Advanced</span>
                            {this.checkForLoading(() => {
                                return this.buildCircles({ subcategory: TEAM_SUBCATEGORY.ADVANCED })
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    buildServicesCircles() {
        return (
            <div className="emp35-teamDark">
                <div className="container">
                    <Row>
                        <Col xs={{span: 24}} md={{span: 24}}>
                            <span className="blue-title">Services</span>
                            {this.checkForLoading(() => {
                                return this.buildCircles({ subcategory: TEAM_SUBCATEGORY.SERVICES })
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
