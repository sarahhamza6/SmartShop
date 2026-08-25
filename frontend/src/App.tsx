import { useEffect, useState } from 'react'

interface Recipe {
  name: string
  calories: number
  protein: number
}

function App() {

  const [recipe, setRecipe] = useState<Recipe | null>(null)

  useEffect(() => {

    fetch('/api/recipe')
      .then(response => response.json())
      .then(data => setRecipe(data))

  }, [])

  return (
    <div>
      <h1>SmartShop</h1>

      {recipe && (
        <div>
          <h2>{recipe.name}</h2>
          <p>Calories: {recipe.calories}</p>
          <p>Protein: {recipe.protein}g</p>
        </div>
      )}

    </div>
  )
}

export default App