#### firebase set up

    1. Go to Console
    2. Create a Project
    3. Enter your project name (My project name : shoppy-final)
    4. Google Analytics for your Firebase project 
        1. Enable Google Analytics for this project
    5. Authentication
        1. Google Login ⇒ enable로 바꿔주기
    6. Realtime Database
        1. Singapore 이 제일 가까움으로 선택
        2. Start in test mode로 선택
    7. Add Firebase your **web** app
        1. web <> 모양 선택
        2. nickname 아무거나 설정해주고(shoppy-final)

#### Cloudinary set up

    digital media 이미지 그냥 업로드하는게 아니라 더 빠르게 로딩할 수 있고 시각적으로 영향이나 다른 버전들로 만들 수 있게 해준다.

    업로드하면서 우리가 원하는 형태로 줄이거나 키우거나 할 수 있는 장점이 있음.

    1. login ( Google로 로그인했음) 
    2. setting
    3. Upload presets로 매번 올릴때마다 확인안해도됨.
    

    
    4. env_local에 숨켜서 적용하기
        1. REST API 이용하기!
        2. [https://api.cloudinary.com/v1_1/<cloud](https://api.cloudinary.com/v1_1/<cloud) name>/<resource_type>/upload

    ```jsx
     REACT_APP_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/drycfsi16/image/upload
     REACT_APP_CLOUDINARY_PRESET=kow0fqaq
    ```

#### To backend

    현재

    firebase에서 로그인 기능 (google) 구현함

    ⇒ Login연동하기 사용자의 정보를 입력받고 있어야 함

    Cloudinary set up에서 데이터를 올릴 수 있는 Rest API를 구현

    상품 등록 : 등록권한을 가진 사용자가 상품을 등록하면 product 목록에 추가된다.

    장바구니 목록: 상품의 장바구니 버튼을 누르면 사용자의 cart 속에는 버튼을 누른 data가  담겨있어야 함

#### favicon 바꾸기

    - react icon 홈페이지
        - 검사 - element 원하는 아이콘 선택
        - <svg> … </svg>  element 복사하기
        - svg to ico 검색하기
        - 아무거나 들어가서 변환하기
    - 색상 변경
        - stroke 와 fill을 바꿔주기

#### router(헤더 만들기)

    1.yarn add react-router-dom 

    - 6버전 이상으로 다운로드 하기
    1. index.js
        - createBrowserRouter 로 경로정해주기

            <App>

            / 👉 <Home>

            /products 👉 <AllProducts>

            /products/new 👉 <NewProduct>

            /products/:id 👉 <ProductDetail>

            /carts 👉 <MyCart>
        
    

    ```jsx
    -index.js-

    const router = createBrowserRouter([
    {
      path : '/',
      element : <App />,
      errorelement : <NotFound />,
      children : [
    {index : true, path : '/'},
    {path: '/products', element:<AllProducts/>},
        {path: '/products/new', element:<NewProduct/>},
        {path:'/products/:id', element: <ProductDetail/>},
        {path:'/carts',element: <MyCart/>}]
    ]
    )]}

    그 밑 
    render쪽에 
    <RouterProvider router = {router} 해주어야함.
    ```

    - pages 폴더 생성
        - 위에 있는 page들(AllProducts,NewProducts…) 생성하기
    - components 폴더 생성하기
        - Navbar.jsx 생성
            - <Link to =”/”> home </Link>
            - <Link to =”/products”> products </Link> … 링크 생성~
    - App.js
        - <Navbar/> 와 <Outlet/>
        - <Outlet/>
            - Link와 연결된 것들의 모든 것의 element

### tailwind

    - in terminal
        - yarn add -D tailwindcss
        - npx tailwindcss init
            - vs code ⇒ tailwind.config.js 생성
        - tailwind.config.js
            - content

                ```jsx
                module.exports = {
                  content : ['./src/**/*.{js.jsx}'], 


                [] 괄호안에 있는거 추가해주고
                './src/**/*.{js.jsx}'
                ```

            - index.css
                - @tailwind base;
                - @tailwind components;
                - @tailwind utilities;
            - index.css styling

            

#### firebase login

    - 인증 → web → 하란대로 따라하면 됨.
    - 그곳에 적혀져 있는 대로 하면 안됨. 노출 xx
    - env.local 생성후 key들을 적어줌
    - build - web - google 하란대로 따라하기
    - firebase에서 login 함수 만들어서
    - Navbar쪽에 있는 button에 onClick에 함수를 넣어준다.

#### firebase login & logout 2

    firebase.js와 Navbar.jsx code 정리

#### User profile

    - User에 props로 user를 받아주고
    - User component 생성
    - User component 에 img tag + photoURL을 받아와서 Profile을 등록해준다.

#### 새로고침 login한 상태에서 logout 되는 것 오류 해결

    - Docs → web → get started 맨 마지막
    - firebase.js ⇒ onUserStateChange 함수 생성
    - Navbar ⇒ useEffect로 한 번 만 호출
        - useEffect(function,deps)에서 deps에 빈 배열을 넣어주면, 한 번만 호출


#### ‘Admin’ User vs ‘일반’ User

    - firebase → realtime database에서 data에 admins(권한있는사람)을 만들어주고
    - 그 곳에 해당하는 사람만
    - admins 에 {”0” : “uid”} 설정하기
    - doc → web →읽고 쓰기 확인해서 권한 주기.



#### ‘Admin’ 사용자  && New Products

    - Admin 사용자만이 권한을 갖기 때문에 New Product는 admin권한자로 로그인했을때만 표시해준다.

    ```jsx
    {user && user.isAdmin && (
              <Link to='/products/new' className='text-2xl'>

                <CgEditMarkup />
              </Link>
            )}

    ! 이것처럼 user가 true고 user.isAdmin이 true라면 보여준다.
    but url을 쳐서 들어가면 들어가진다.....

    ```

#### 경로보호 admin 권한 but → url로 direct가능 ⇒ Context 사용

    - Cart page는 로그인
    - product/new page는 로그인 + admin이 필요하다.
    - context folder 생성 ⇒ AuthContext 파일 생성
        - context를 사용해서 login 되어있는지 확인한다. + 새로고침 방지
        - Provider를 사용해서,  user, login, logout을 받아온다
    - ProtectedRoute page를 만듬

####props 제발 헷갈리지말자

    만약 함수 옆 

    export default function Button({text,onClick}) 이다.

    저 옆에있는 props (text, onClick)는 외부에서 받아 올 준비가 되었다 라는 뜻임 ㅇㅇ 

    외부에서 text 가 “hello”라면 이걸 받아 들일 준비가 되었다는 뜻임 

    받아서 여기서 조리를 해주겠다 ㅇㅇ 이런뜻임 

#### Upload data(쇼핑몰 상품) (firebase & cloudinary)

    - firebase
        - doc→web→read and write
    - cloudinary
        - guides→uploading assets
        
    - 각 상품마다 고유의 id를 주어야 한다.
        -in terminal
            - yarn add uuid
            - firebase
            import { v4 as uuid } from 'uuid';
            - addNewProduct에 return set(ref(database,`products/${id}`),
                                  ...product,
                                  id,  
                                  price: parseInt(product.price),
                                  image,
                                  options:product.options.split(',')
                                  
    - 상품등록 ui 해결하기
#### Netlify 베포하기
