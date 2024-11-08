import React from 'react'
import HomePage from './HomePage/HomePage';
import SimulationPage from './SimulationPage/SimulationPage'
import PredictorPage from './Prediction Page/PredictionPage'
import InfoPage from './Info_Page/Components/info_page'
import  RegisterPage  from './RegisterPage/Log';
import CropVisualization from './farm/farm4'
import CropGrowthSimulator from './farm/farm7'


function App(){
    // return (
    //     // <App/> Change this name to <App/> and import to see Home page.
    //     // <HomePage />
    //     // <CropVisualization/>
    //     // <PredictorPage/>
    //     // <InfoPage />
    //     // <RegisterPage/>
    //     // <CropVisualization/>
    //     <CropGrowthSimulator/>
    // );
    return (
        <div className="p-4">
          {/* <CropVisualization /> */}
          {/* <CropGrowthSimulator/> */}
          {/* <InteractiveCropSimulator/> */}
          {/* <PlantVisualization/> */}
          {/* <CropVisualization/> */}
          <SimulationPage/>
        </div>
      );
};

export default App;
