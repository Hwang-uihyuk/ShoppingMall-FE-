import React from 'react'

export default function Footer() {
  return (
    
    <div class="">
        {/* divider */}
        <div className ="h-3 bg-slate-50 border border-solid border-slate-100
        border-1-0 shadow-xl"
         ></div>
    <footer className="py-3 my-4">
        <div className="content-center">
        <ul className="m-autoflex direction-end   border-l pb-3 mb-3">
        <li class="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
        </ul>
        </div>
        <div> 본 사이트는 비상업적인 용도로 운영되고 있습니다. </div>
        <li className="">출저 : www.musinsa.com</li>
        <p class="text-center text-muted">© 2023 Company, Inc</p>
    </footer>
  <div className ="h-3 bg-slate-50"></div>
</div>
  )
}


