import React from 'react'
import { assets, plans } from '../assets/assets'

const BuyCredit:React.FC = () => {
    return (
        <div className='min-h-[80vh] text-center pt-14 mb-6'>
            <button className='border border-gray-400 px-10 py-2 rounded-full '> Our Plans</button>
            <h1 className='text-2xl  text-center md:text-3xl lg:text-4xl mt-6  mb-3 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>Choose the plan that’s right for you</h1>
            <div className='flex flex-wrap items-center justify-center gap-6 text-left'>
                {
                    plans.map((item, index) => (
                        <div key={index} className='bg-white rounded-lg drop-shadow-sm border py-12 px-8  p-6 text-gray-600 hover:scale-105 transition-all duration-700 '>
                           <img  src={assets.logo_icon} alt="logo" width={40} />
                            <p className='font-semibold mt-3 '>{item.id}</p>
                            <p className='text-sm '>{item.desc}</p>
                            <p className='mt-3'>
                                <span className='text-3xl font-medium'>${item.price}</span>/{item.credits} credits
                            </p>
                            <button className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52  '>Get started</button>

                        </div>

                    ))
               }
            </div>

          
        </div>
  )
}

export default BuyCredit