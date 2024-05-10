import { useState, useCallback } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2'
import RecipeComponent from './RecipeComponent';

export const RecipeSearchApp = ({ setStateLoader }) => {
  const MY_KEY = '390a90d11f2d8e3252c68972854dc2c8';
  const MY_ID = '191458ae';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [searchedWord, setSearchedWord] = useState('bread');
  const [btnDisabled, setBtnDisabled] = useState(true);


  // useEffect(() => {
  //   const getRecipe = async () => {
  //     const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchedWord}&app_id=${MY_ID}&app_key=${MY_KEY}`);
  //     const data = await response.json();

  //     setRecipes(data.hits);
  //   };
  //   getRecipe();
  // }, [searchedWord]);

  //или второй, более новый вариант
  // useCallback is a React Hook that lets you cache a function definition between re-renders.
  // const cachedFn = useCallback(fn, dependencies)
  
  const getRecipe = useCallback(async () => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchedWord}&app_id=${MY_ID}&app_key=${MY_KEY}`);
    const data = await response.json();
    setStateLoader(false);

    if (data.hits && data.hits.length > 0) {
      setRecipes(data.hits);
    } else {
      handleAlert();
    }
  }, [searchedWord, setStateLoader]);
  
  useEffect ( () => {
    if (search && search.trim().length > 0)  {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [search])

  useEffect( () => {
    setStateLoader(true);
    getRecipe();
  }, [getRecipe, setStateLoader]);

  const searchWord = (evt) => {
    setSearch(evt.target.value);
  };

  const handleAlert = () => {
    Swal.fire({
      icon: "error",
      text: "Oops.. It seems, you entered ingredients incorrectly",
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (search || search.length > 0 || search !== '') {
      setSearchedWord(search);
    } else {
      handleAlert();  
    }
    setSearch('');  
  };

  return (
    <div>
      <h1>Find a Recipe</h1>
      <form  className="inputContainer" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..." value={search} onChange={searchWord} />
        <button type="submit" disabled={btnDisabled} className={btnDisabled ? 'inactiveBtn' :''}>
        <img className={btnDisabled ? 'searchIconDisabled' : ''} src="https://www.iconpacks.net/icons/2/free-search-icon-2911-thumb.png" width="20px" alt="search icon"/>
      </button>
      </form>
        
      {recipes.slice(0, 10).map((item, index) => (
          <RecipeComponent
          key={index}
          index={index}
          label={item.recipe.label} 
          image={item.recipe.image} 
          calories={item.recipe.calories} 
          ingredients={item.recipe.ingredientLines}
          servings={item.recipe.yield}
          fat={item.recipe.totalNutrients.FAT.quantity}
          protein={item.recipe.totalNutrients.PROCNT.quantity}
          carb={item.recipe.totalNutrients.CHOCDF.quantity}
          />
      )
      )}
    </div>
  );
};