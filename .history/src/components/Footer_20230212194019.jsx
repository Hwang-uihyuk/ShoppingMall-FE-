import React from 'react'

export default function Footer() {
  return (
    
    <div className="">
        {/* divider */}
        <div className ="h-3 bg-slate-50 border border-solid border-slate-100
        border-1-0 shadow-xl"
         ></div>
    <footer className="py-3 my-4 bg-slate-100 opacity-20">
        <div className="flex justify-center">
            <ul className="flex border-l pb-3 mb-3">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
        </ul>
        </div>
        <div className='flex flex-row-reverse'> 본 사이트는 비상업적인 용도로 운영되고 있습니다. </div>
        <div className="flex flex-row-reverse">출처 : www.musinsa.com</div>
        
        <p className="text-center text-muted">© 2023 Company, Inc</p>
    </footer>

</div>
  )
}


