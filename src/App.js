import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Popup from 'components/Popup'
import Toast from 'components/Toast'
import ContentHeader from 'components/ContentHeader'
import Nav from 'components/Nav'
import cx from 'classnames'
import { onit } from 'klaytn/onit'
import './App.scss'

type Props = {
  isLoading: boolean,
  children: React.DOM,
}
class App extends Component<Props> {
  state = {
    isCheckedSessionStorage: false,
    isMainPage: browserHistory.getCurrentLocation().pathname === '/',
  }

  
  componentDidMount() {
    if (sessionStorage.getItem('prv')) {
      onit.klay.accounts.wallet.add(sessionStorage.getItem('prv'))
    }
    this.setState({ isCheckedSessionStorage: true })

  }

  render() {
    const { isCheckedSessionStorage, isMainPage } = this.state
    const { children } = this.props
    return !!isCheckedSessionStorage && [
      <Popup key="Popup" />,
      <Toast key="Toast" />,
      <div className="App" key="App">      
        <section className={cx('App__section', {'App__section__mainPage': browserHistory.getCurrentLocation().pathname === '/'})}>
          <Nav className="App__navSection" />
          <div className="App__contentSection">
            <ContentHeader />
            {children}
          </div>

        </section>
      </div>,
    ]
  }
}

export default App
