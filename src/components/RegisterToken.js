import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onitSocket } from 'klaytn/onit'

import Input from 'components/Input'
import Button from 'components/Button'
import ui from 'utils/ui'
import { krc20ABI } from 'utils/crypto'
import store from '../store'

import { registerToken } from 'actions/token'

type Props = {

}

import './RegisterToken.scss'

class RegisterToken extends Component<Props> {
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  register = () => {
    const { name, address, decimal } = this.state
    const contractInstance = new onitSocket.klay.Contract(krc20ABI, address)
    contractInstance.methods.balanceOf('0x006056d2F4C68233F1AE99364445D7b587ef6642').call()
      .then(balance => {
        if (typeof balance === 'undefined') {
          ui.showToast({ msg: `올바르지 않은 토큰 컨트랙트입니다.`})
          return
        }
        store.dispatch(
          registerToken({
            name,
            address,
            decimal,
          })
        )
        ui.closePopup()
        ui.showToast({ msg: `${name} 토큰이 등록되었습니다.`})
      })
      .catch((e) => {
        ui.showToast({ msg: `올바르지 않은 토큰 컨트랙트입니다.`})
        console.log(e)
      })
  }

  render() {
    return (
      <div className="RegisterToken">
        <Input className="RegisterToken__input" title="토큰 이름" name="name" onChange={this.handleChange} />
        <Input className="RegisterToken__input" title="토큰 컨트랙트 주소" name="address" onChange={this.handleChange} />
        <Input className="RegisterToken__input" title="자리 수(decimal)" name="decimal" onChange={this.handleChange} />
        <Button title="등록" onClick={this.register} className="RegisterToken__register" />
      </div>
    )
  }
}

export const RegisterTokenButton = () => {
  return (
    <div
      onClick={() => ui.openPopup({ content: <RegisterToken /> })}
      className="RegisterTokenButton"
    >
      토큰 추가하기
    </div>
  )
}

export default RegisterToken
