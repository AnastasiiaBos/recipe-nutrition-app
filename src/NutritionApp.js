import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
// import { Loader } from './Loader';
import { NutritionData } from './NutritionData';


export const NutritionApp = ({setStateLoader}) => {
  const MY_ID = 'f12102e8';    
  const MY_KEY = 'c917e0fecd78f6ebd4a6b09f6cc82c93';
  const [search, setSearch] = useState('1 cup rice, 10 oz chickpeas');
  const [myNutritionData, setMyNutritionData] = useState();  
  const [btnDisabled, setBtnDisabled] = useState(false);
  

  const handleAlert = () => {
    Swal.fire({
      icon: "error",
      text: "Oops.. It seems, you entered ingredients incorrectly",
    })
  }

  const searchWord = (evt) => {
    const newSearch = evt.target.value;
    setSearch(newSearch);
  }

  useEffect ( () => {
    if (search && search.trim().length > 0)  {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [search])

  const handleSubmit = (evt) => {
    evt.preventDefault(); //предотвращаем обновление страницы при отправке формы

    const ingr = search.split(/[,,;,\n,\r]/).map(item => item.trim()).filter(item => item !== ''); 
    // /регулярное выражение/ - regexp = /шаблон/ - шаблон для поиска и замены в строке
    // выражение в /[]/ означает, что любой символ из перечисленных, а именно ; , новая строка возврата каретки - должен пониматься как разделитесь строки
    // т.е. мы введенный польз-лем текст (string из textarea) делим на элементы массива по указанным разделителям
    // почему нам нужен массив, а не строка? это сказано в спецификации Edamam "ingr": ["string"]
    // необходимо отправить список ингредиентов (это поле обязательное и должно быть передано в body - это массив данных, где кол-во и продукт явл-ся его элементом
    // filter - чтобы не попадали в массив пустые элементы, иначе post запрос не выполнится

    setStateLoader(true); //включается лоадер, пока ждем ответ от сервера
    fetchData(ingr);  
  }

  const fetchData = async (ingridient) => {
            
    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      ingr: ingridient  // ingr: параметр ф-и, кот-й зашел вверху async (ingr)
      }),
    }) 

    if (response.ok) {
      setStateLoader(false); // отключаем лоадер
      const data = await response.json();
      setMyNutritionData(data);
    } else {
      setStateLoader(false);  // отключаем лоадер
      handleAlert(); //показываем в чем ошибка
    }
  }       

  return (
    <div>
      <h1>Nutrition Analysis</h1>
      <form onSubmit={handleSubmit} className='centerWrapper'>
        <p className='nutritionText'>Enter an ingredient list for what you are cooking, like <b>"1 cup rice, 10 oz chickpeas"</b>, etc.
          Enter each ingredient on a new line, or separate them by commas.
        </p>
        <textarea rows='5' placeholder='Type your recipe elements' value={search} onChange={searchWord}></textarea>
        <button type="submit" disabled={btnDisabled} className={`analizeBtn ${btnDisabled ? 'inactiveBtn' :''}`}>Analyze</button>
      </form>
      {myNutritionData && <NutritionData data={myNutritionData}/>}
    </div>
  );
};