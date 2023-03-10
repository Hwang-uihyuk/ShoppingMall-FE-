import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children,requirAdmin}) {

  return <Navigate to="/" replace />
      // 위에 조건이 없으면 바로 홈으로(Navigate쓰기)
      //Navigate에서 replace로 history에 남겨두지않음

  return children;
  //로그인한 사용자가 있는지 확인
  //그 사용자가 어드민 권한이 있는지 확인
  //requireAdmin이 true인 경우에는 로그인도 되어 있어야 하고, 어드민 권한도 가지고 있어야 함
  //조건에 맞지 않으면/ 상위 경로로 이동
  // 조건에 맞는 경우메나 전달된 children 보여줌
  // <결론>
  // url이랑 어떤 요청 메서드
  return (
    <div>ProtectedRoute</div>
  )
}
