import React, { Component } from 'react';
import "antd/dist/antd.dark.css";
import { Row, Col, Space  } from 'antd';
import { Sketch } from './Sketch';
import Gallery from './Gallery';
import { SketchStore } from '../SketchStore';

export class Home extends Component {
    static displayName = Home.name;
    sketchStore = new SketchStore();

    constructor(props) {
        super(props);
        this.state = { sketches: [], loading: true };
    }

    render() {
        return (
            <div>
                <Row gutter={[0, 8]} push={32}>
                    <Col span={18}>
                        <Space size={'large'} align="center">
                            <h1> Sketch App</h1>
                            <h5 >  By Michael South 2021</h5>
                        </Space>
                   </Col>
                </Row>
                <Row>
                    <Col span={16}><Sketch sketchStore={this.sketchStore} /></Col>
                    <Col span={6}><Gallery sketchStore={this.sketchStore}  /></Col>
                </Row>
            </div>
        );
    }
}

