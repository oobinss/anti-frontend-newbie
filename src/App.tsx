import { validateHeaderValue } from 'http'
import React, { useEffect, useState } from 'react'

export const App = () => {
  const [isReady, setReady] = useState(false)
  const [eurInfo, setEurInfo] = useState<any>({})

  const exchangeEurToKrw = (krw: any) => krw * eurInfo.basePrice

  useEffect(() => {
    setReady(false)
    fetch(
      'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWEUR'
    )
      .then((response) => response.json())
      .then((array) => {
        setEurInfo(array[0])
        setReady(true)
      })
  }, [])

  if (!isReady)
    return (
      <section>
        <p>환율 정보 로딩 중..</p>
      </section>
    )
  return (
    <div className='App'>
      <div>환율기준 (1 유로)</div>
      <div>
        {eurInfo.basePrice}
        {eurInfo.basePrice - eurInfo.openingPrice > 0 && '▲'}
        {eurInfo.basePrice - eurInfo.openingPrice < 0 && '▼'}
        {eurInfo.changePrice}원 (
        {(eurInfo.changePrice / eurInfo.basePrice) * 100}%)
      </div>
      <div>
        <div>살때 : {eurInfo.cashBuyingPrice}</div>
        <div>팔때 : {eurInfo.cashSellingPrice}</div>
        <div>보낼때 : {eurInfo.ttSellingPrice}</div>
        <div>받을때 : {eurInfo.ttBuyingPrice}</div>
      </div>
      <hr />
      <input /> 유로 ▶︎ <input disabled /> 원
    </div>
  )
}

export default App
