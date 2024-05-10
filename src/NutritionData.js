import icon from './iconTick.png';

export const NutritionData = ({data}) => {

 return ( <div className="centerWrapper grey">
    <table>
        <thead> 
            <tr>
                <th>Ingredient</th>
                <th>Weight</th>
                <th>Calories</th>
            </tr>
        </thead>
        <tbody>
            {data.ingredients.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.text}</td>
                        <td>{item.parsed[0].weight.toFixed(1)}  gr</td>
                        <td>{item.parsed[0].nutrients.ENERC_KCAL.quantity.toFixed(1)}  kcal</td>
                    </tr>
                )
            })}
        </tbody>
    </table>

    <div className="nutritionDataWrapper">
        <h2>Nutrition Facts</h2>
        {/* // Метод Object.values() возвращает массив значений перечисляемых свойств объекта в том же порядке что и цикл for...in.
            т.к. data.totalNutrients - это объект с кучей сво-в, нам надо превратить его в массив, чтобы можно было пройтись map и отобразить все эл-ты
        */}
        <ul className="nutrientsDataList">{Object.values(data.totalNutrients).map((item, index) => {
            return (
            <li className={item.label === 'Energy' || item.label === 'Total lipid (fat)' || item.label === 'Protein' || item.label === 'Carbohydrate, by difference'? 'bold' : ''} key={index}>
            <img className="ingedientsIcon" src={icon} width="20px" alt="tick icon"/>
            {item.label} : {item.quantity.toFixed()}{item.unit}</li>
            )
        })}</ul>
    </div>
    
 </div>)
};