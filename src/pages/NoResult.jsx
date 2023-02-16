import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height : 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const NoResultMessage = styled.label`
    font-size : 40px;
    font-family : "RalewayBold";
`
const SmallMessage = styled.label`
    font-size : 13.7px;
    font-family : "RalewayBold";
`
const Emoji = styled.label`
    font-size : 50px;
`
export default function NoResult() {
  return (
    <Container>
        <Emoji>😥</Emoji>
        <NoResultMessage>No Search Result</NoResultMessage>
        <SmallMessage>검색어를 다시 확인해주세요</SmallMessage>
    </Container>
  )
}
