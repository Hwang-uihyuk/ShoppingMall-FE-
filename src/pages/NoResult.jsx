import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height : 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const LMessage = styled.label`
    font-size : 40px;
    font-family : "RalewayBold";
`
const SMessage = styled.label`
    font-size : 13.7px;
    font-family : "RalewayBold";
`
const Emoji = styled.label`
    font-size : 50px;
`
export default function NoResult(props){
    const {keyword} = props;
  return (
    <Container>
        <Emoji>😥</Emoji>
          {(keyword === "search") && <>
            <LMessage>No Search Result</LMessage>
            <SMessage>검색어를 다시 확인해주세요</SMessage></>}
          {(keyword === "cart") && <>
            <LMessage>No Products</LMessage>
            <SMessage>장바구니가 비어있습니다</SMessage></>}
    </Container>
  )
}
