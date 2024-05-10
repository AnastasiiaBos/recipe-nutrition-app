import { useState } from 'react';
import './App.css';
import { AppButtons } from './AppButtons';
import { NutritionApp } from './NutritionApp';
import { RecipeSearchApp } from './RecipeSearchApp';
import { Loader } from './Loader';



function App() {
  const [stateLoader, setStateLoader] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  return (
    <div>
      {stateLoader && <Loader />} 
      {/* //лоадер на время ожидания ответа от сервера */}

      {/* //компонент отвечающий за список кнопок */}       
      <AppButtons setActiveTabIndex={setActiveTabIndex}/>
      <hr />
      <hr className='secondLine'/>

      {activeTabIndex === 0 && <RecipeSearchApp  setStateLoader={setStateLoader}/>}  
      {activeTabIndex === 1 && <NutritionApp setStateLoader={setStateLoader}/>}  
  </div>
  )
}

export default App;
