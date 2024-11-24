start();

async function fetchRandomMeal() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();

        
        renderMeal(data);
    } catch (error) {
        console.error('Erro ao buscar a refeição:', error);
    }
}

function renderMeal(data) {
    const mealContainer = document.getElementById("meal-container");
    const meal = data.meals[0]; 

    mealContainer.innerHTML = `
        <div>
            <h2>${meal.strMeal}</h2>
            <p><strong>Categoria:</strong> ${meal.strCategory}</p>
            <p><strong>Cozinha:</strong> ${meal.strArea}</p>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300">
            <h3>Ingredientes</h3>
            <ul>
                ${renderIngredients(meal)}
            </ul>
            <h3>Instruções</h3>
            <p>${meal.strInstructions}</p>
            <a href="${meal.strYoutube}" target="_blank">Ver no YouTube</a><br>
            <a href="${meal.strSource}" target="_blank">Fonte Original</a>
        </div>
    `;
}

function renderIngredients(meal) {
    let ingredientsHTML = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredientsHTML += `<li>${ingredient}: ${measure}</li>`;
        }
    }
    return ingredientsHTML;
}

document.getElementById('randomMeal').addEventListener('click', fetchRandomMeal);