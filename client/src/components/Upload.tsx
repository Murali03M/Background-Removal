
import { useContext } from 'react';
import { assets } from '../assets/assets';
import { appContext } from '../context/AppContext';

const Upload = () => {

  const context = useContext(appContext);

  if (!context)
  {
      throw new Error("provide within context");
  }

  const { removeBackground } = context;

  const updateHander = (e: React.ChangeEvent<HTMLInputElement>) => {

      const files = e.target.files;

      if (!files || files.length===0 )
      {
          return
      };

      removeBackground(files[0]);





      

  }

  return (
    <div>
      <h1 className="text-2xl text-center md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent pb-8">
        See the magic. Try now
      </h1>
      
      {/* Adjust padding and margin for mobile */}
      <div className='flex items-center justify-center pb-10 sm:pb-14 md:pb-6'>
        <input onChange={updateHander} accept='image/*' type="file" name="" id="upload2" hidden />
        <label className="inline-flex gap-3 px-6 py-3 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700" htmlFor="upload2">
          <img width={20} src={assets.upload_btn_icon} alt="upload" />
          <p className="text-white text-sm sm:text-base">Upload your images</p>
        </label>
      </div>
    </div>
  );
};

export default Upload;
