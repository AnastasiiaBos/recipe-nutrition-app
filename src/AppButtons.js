import { buttons } from "./buttons"
import { useState } from "react";

export const AppButtons = ({ setActiveTabIndex }) => {
    const [selected, setSelected] = useState(0);

    return (
    <div className="chooseAppBtnWrapper" >
        {buttons.map((item) => 
        <button 
            className={item.id === selected ? 'blue chooseAppBtn' : 'chooseAppBtn'}
            key={item.id} 
            onClick={() => {
                setSelected(item.id);
                setActiveTabIndex(item.id);
                }}>{ item.title }
        </button> )}  
    {/* // есть 2 кнопки переключатели приложений, при клике на каждую меняется состояние с индексом выбранного приложения */}
    {/* // а также при клике на кнопку, selected становится = id кнопки, а если id кнопки и selected совпадают, то кнопка подсвечивается */}
    {/* // изначально selected = первой кнопке с 0-ым индексом */}
    </div>);
}