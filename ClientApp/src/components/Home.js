import React, { Component } from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <Layout>
          <Header><h1>Hello, world!</h1></Header>
          <Layout>
            <Sider>left sidebar</Sider>
            <Content>main content</Content>
            <Sider>right sidebar</Sider>
          </Layout>
          <Footer>footer</Footer>
        </Layout>
    );
  }
}
