
import Header from '../components/Header'
import Slider from '../components/Slider'
import Steps from '../components/Steps'
import Testimonial from '../components/Testimonial';

import Upload from '../components/Upload'

const Home = () => {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="p-4 space-y-8">
          <Steps />
          <Slider />
          <Testimonial />
          <Upload /> 
        </div>
      </div>
    );
  };
  
  export default Home;
  