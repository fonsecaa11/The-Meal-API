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
async function fetchCategories() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();

        console.log(data);

        if (data.categories && data.categories.length > 0) {
            renderCategories(data);
        } else {
            console.error("No categories found in the API response.");
        }

    } catch (error) {
        console.error('Erro ao buscar a refeição:', error);
    }
}

function renderCategories(data) {
    const mealContainer = document.getElementById("meal-container");
    
    if (data.categories && data.categories.length > 0) {
        const category = data.categories[0]; // Access the first category
        
        // Render the category's details
        data.categories.forEach(category => {
        // Create a div to hold each category's details
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category-container");

        // Create and append the category name (h2)
        const categoryName = document.createElement("h2");
        categoryName.textContent = category.strCategory;
        categoryDiv.appendChild(categoryName);

        // Create and append the description (p)
        const categoryDescription = document.createElement("p");
        categoryDescription.innerHTML = `<strong>Categoria:</strong> ${category.strCategory}`;
        categoryDiv.appendChild(categoryDescription);

        // Create and append the description (p)
        const categoryDetails = document.createElement("p");
        categoryDetails.innerHTML = `<strong>Cozinha:</strong> ${category.strCategoryDescription}`;
        categoryDiv.appendChild(categoryDetails);

        // Create and append the category image (img)
        const categoryImage = document.createElement("img");
        categoryImage.src = category.strCategoryThumb;
        categoryImage.alt = category.strCategory;
        categoryImage.width = 300;
        categoryDiv.appendChild(categoryImage);

        // Append the created category div to the meal container
        mealContainer.appendChild(categoryDiv);
        });
    } else {
        // If no categories are found
        mealContainer.innerHTML = `<p>No categories found</p>`;
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
                ${renderIngredients(meal)}
            <h3>Instruções</h3>
            <p id="instructions">${meal.strInstructions}</p>
            <button href="${meal.strYoutube}" >Ver no YouTube</button><br>
            <button href="${meal.strSource}" target="_blank">Fonte Original</button>
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

// Chamar a função para buscar e exibir uma refeição aleatória
document.getElementById('randomMeal').addEventListener('click', fetchRandomMeal);
document.getElementById('categories').addEventListener('click', fetchCategories);