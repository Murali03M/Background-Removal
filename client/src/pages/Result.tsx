import  { useContext } from 'react'
import { assets } from '../assets/assets'
import { appContext } from '../context/AppContext';

const Result = () => {

    const context = useContext(appContext);

    if (!context)
    {
        throw new Error("provide within context");
    }

    const { resultImage, image } = context;

    
  return (
      <div className='mx-4 my-4 lgh:mx-44 mt-14 min-h-[75vh] '>
          <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm '>
              <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
                  <div>
                      <p className='font-semibold text-gray-600 mb-2'>Original</p>
                      <img src={image? URL.createObjectURL(image):assets.image_w_bg} alt="image_w_bg" className='rounded-md border'/>
                  </div>
                  <div className='flex flex-col'>
                      <p className='font-semibold text-gray-600 mb-2' >BackGround Removed</p>
                      <div  className='rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden'>
                          
                   
                          <img src={resultImage ? resultImage : assets.image_wo_bg} alt="image_wo_bg" />
                          {
                              !resultImage && image &&   <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2l'>
                              <div className='border-4 border-violet-600 rounded-full h-12 w-12 animate-spin border-t-transparent'></div>
                              </div>
                          }
                    
                 </div> 
                  </div>
              </div> 
              {
                  resultImage &&      <div className='flex sm:justify-end   justify-center items-center flex-wrap gap-6 mt-6'>
                  <button className='px-8 py-2.5 text-violet-600 border border-violet-600 rounded-full hover:scale-105  transition-all duration-700 '>Try another image</button>
                  <a href={resultImage|| ""} download className='px-8 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105  transition-all duration-700 text-white'>Download image</a>
              </div>
              }
         
          </div>
          
     </div>
  )
}

export default Result