        // Global variables
        let currentWaterIntake = 0;
        const dailyWaterGoal = 2000;
        let mealPlan = {};
        let shoppingItems = [
            "Organic Spinach", "Greek Yogurt", "Quinoa", "Sweet Potatoes", 
            "Salmon", "Avocados", "Blueberries", "Almonds", "Olive Oil", "Broccoli"
        ];

        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            loadRecipes();
            loadShoppingList();
            loadWaterProgress();
            loadMealPlan();
        });

        
        // Tab switching functionality
        function showTab(tabName) {
            // Hide all tabs
            const tabs = document.querySelectorAll('.tab-content');
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Remove active class from all buttons
            const buttons = document.querySelectorAll('.tab-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }

        //Search bar
        function searchRecipes() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const categories = document.querySelectorAll("#MainBody > div"); // All category containers like #maincourse, #biryani, etc.

    if (!input) {
        // If input is empty, show everything
        categories.forEach(cat => {
            cat.style.display = "block";
            const dishes = cat.querySelectorAll(".dish1, .dish2, .dish3, .dish4, .dish5, .dish6, .dish7, .dish8, .dish9");
            dishes.forEach(dish => dish.style.display = "block");
        });
        return;
    }

    // Otherwise, filter results
    categories.forEach(cat => {
        let categoryHasMatch = false;
        const dishes = cat.querySelectorAll(".dish1, .dish2, .dish3, .dish4, .dish5, .dish6, .dish7, .dish8, .dish9");

        dishes.forEach(dish => {
    // Get dish text and convert to lowercase, then remove all spaces
    const text = dish.textContent.toLowerCase().replace(/\s+/g, '');
    
    // Also remove spaces from input
    const inputNoSpaces = input.replace(/\s+/g, '').toLowerCase();

    if (text.includes(inputNoSpaces)) {
        dish.style.display = "block";
        categoryHasMatch = true;
    } else {
        dish.style.display = "none";
    }
});

        // Show category only if it has at least one matching dish
        cat.style.display = categoryHasMatch ? "block" : "none";
    });
}

        // Calorie Calculator
        function calculateCalories() {
            const age = parseInt(document.getElementById('age').value);
            const gender = document.getElementById('gender').value;
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);
            const activity = parseFloat(document.getElementById('activity').value);

            if (!age || !weight || !height) {
                alert('Please fill in all fields!');
                return;
            }

            // Mifflin-St Jeor Equation
            let bmr;  //Basal Metabolic Rate
            // +5 for males and -161 for females
            //Males generally have higher lean muscle mass, which burns more calories at rest.
            //Females generally have a higher percentage of body fat, which burns fewer calories at rest.
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }

            const dailyCalories = Math.round(bmr * activity);
            const resultDiv = document.getElementById('calorieResult');
            
            resultDiv.innerHTML = `
                <h4>Your Daily Calorie Needs:</h4>
                <p><strong>${dailyCalories} calories/day</strong></p>
                <p>BMR: ${Math.round(bmr)} calories</p>
                <p>For weight loss: ${Math.round(dailyCalories - 500)} calories</p>
                <p>For weight gain: ${Math.round(dailyCalories + 500)} calories</p>
            `;
        }

        // BMI Calculator
        function calculateBMI() {
            const weight = parseFloat(document.getElementById('bmiWeight').value);
            const height = parseFloat(document.getElementById('bmiHeight').value);

            if (!weight || !height) {
                alert('Please enter both weight and height!');
                return;
            }

            const bmi = weight / Math.pow(height / 100, 2);
            let category = '';
            let color = '';

            if (bmi < 18.5) {
                category = 'Underweight';
                color = '#2196F3';
            } else if (bmi < 25) {
                category = 'Normal weight';
                color = '#4CAF50';
            } else if (bmi < 30) {
                category = 'Overweight';
                color = '#FF9800';
            } else {
                category = 'Obese';
                color = '#F44336';
            }

            const resultDiv = document.getElementById('bmiResult');
            resultDiv.innerHTML = `
                <h4>Your BMI Result:</h4>
                <p style="font-size: 1.5rem; color: ${color};"><strong>${bmi.toFixed(1)}</strong></p>
                <p style="color: ${color};">${category}</p>
            `;
        }

        // Enhanced BMI Calculator with Health Tips
function calculateBMI() {
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    const height = parseFloat(document.getElementById('bmiHeight').value);
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        document.getElementById('bmiResult').innerHTML = 
            '<div style="color: #e74c3c;">Please enter valid weight and height values.</div>';
        return;
    }
    
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = bmi.toFixed(1);
    
    let category = '';
    let categoryColor = '';
    let healthTips = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        categoryColor = '#3498db';
        healthTips = `
            <div style="background: rgba(52, 152, 219, 0.1); padding: 15px; border-radius: 10px; margin-top: 15px; border-left: 4px solid #3498db;">
                <h4 style="color: #3498db; margin-top: 0;">💡 Tips for Healthy Weight Gain:</h4>
                <ul style="color: #2c3e50; line-height: 1.6;">
                    <li><strong>Eat More Frequently:</strong> Have 5-6 smaller meals throughout the day</li>
                    <li><strong>Choose Nutrient-Dense Foods:</strong> Nuts, seeds, avocados, olive oil, whole grains</li>
                    <li><strong>Add Healthy Fats:</strong> Include ghee, nuts, and dairy products in your diet</li>
                    <li><strong>Protein Power:</strong> Include eggs, fish, chicken, lentils, and dairy</li>
                    <li><strong>Strength Training:</strong> Build muscle mass with resistance exercises</li>
                    <li><strong>Stay Hydrated:</strong> But avoid drinking too much water before meals</li>
                </ul>
                <p style="color: #7f8c8d; font-style: italic; margin-bottom: 0;">
                    💊 Consider consulting a nutritionist for a personalized meal plan.
                </p>
            </div>`;
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal weight';
        categoryColor = '#27ae60';
        healthTips = `
            <div style="background: rgba(39, 174, 96, 0.1); padding: 15px; border-radius: 10px; margin-top: 15px; border-left: 4px solid #27ae60;">
                <h4 style="color: #27ae60; margin-top: 0;">🎉 Great! Tips to Maintain Healthy Weight:</h4>
                <ul style="color: #2c3e50; line-height: 1.6;">
                    <li><strong>Balanced Diet:</strong> Include fruits, vegetables, whole grains, and lean proteins</li>
                    <li><strong>Regular Exercise:</strong> 150 minutes of moderate activity per week</li>
                    <li><strong>Stay Hydrated:</strong> Drink 8-10 glasses of water daily</li>
                    <li><strong>Portion Control:</strong> Eat mindfully and avoid overeating</li>
                    <li><strong>Good Sleep:</strong> Get 7-9 hours of quality sleep</li>
                    <li><strong>Stress Management:</strong> Practice meditation or yoga</li>
                </ul>
                <p style="color: #7f8c8d; font-style: italic; margin-bottom: 0;">
                    ✨ Keep up the good work! Regular health check-ups are recommended.
                </p>
            </div>`;
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        categoryColor = '#f39c12';
        healthTips = `
            <div style="background: rgba(243, 156, 18, 0.1); padding: 15px; border-radius: 10px; margin-top: 15px; border-left: 4px solid #f39c12;">
                <h4 style="color: #f39c12; margin-top: 0;">⚠️ Tips for Healthy Weight Loss:</h4>
                <ul style="color: #2c3e50; line-height: 1.6;">
                    <li><strong>Create Calorie Deficit:</strong> Eat 300-500 calories less than your daily needs</li>
                    <li><strong>Increase Physical Activity:</strong> Add cardio exercises like walking, cycling, swimming</li>
                    <li><strong>Eat More Vegetables:</strong> Fill half your plate with non-starchy vegetables</li>
                    <li><strong>Reduce Processed Foods:</strong> Limit sugary drinks, junk food, and refined carbs</li>
                    <li><strong>Protein at Every Meal:</strong> Helps maintain muscle mass during weight loss</li>
                    <li><strong>Track Your Progress:</strong> Keep a food diary and weigh yourself weekly</li>
                </ul>
                <p style="color: #7f8c8d; font-style: italic; margin-bottom: 0;">
                    🎯 Aim to lose 0.5-1 kg per week for sustainable results.
                </p>
            </div>`;
    } else {
        category = 'Obese';
        categoryColor = '#e74c3c';
        healthTips = `
            <div style="background: rgba(231, 76, 60, 0.1); padding: 15px; border-radius: 10px; margin-top: 15px; border-left: 4px solid #e74c3c;">
                <h4 style="color: #e74c3c; margin-top: 0;">🚨 Important: Health-Focused Weight Management:</h4>
                <ul style="color: #2c3e50; line-height: 1.6;">
                    <li><strong>Consult Healthcare Provider:</strong> Get professional medical guidance first</li>
                    <li><strong>Start Small:</strong> Make gradual changes to diet and exercise routine</li>
                    <li><strong>Focus on Whole Foods:</strong> Vegetables, fruits, lean proteins, whole grains</li>
                    <li><strong>Low-Impact Exercise:</strong> Walking, swimming, or cycling to start</li>
                    <li><strong>Monitor Health Markers:</strong> Check blood pressure, blood sugar regularly</li>
                    <li><strong>Consider Professional Help:</strong> Nutritionist, dietitian, or weight management program</li>
                </ul>
                <div style="background: rgba(231, 76, 60, 0.05); padding: 10px; border-radius: 5px; margin-top: 10px;">
                    <p style="color: #c0392b; margin: 0; font-weight: bold;">
                        ⚕️ Important: Obesity increases risk of diabetes, heart disease, and other health conditions. 
                        Please consult with a healthcare professional for a comprehensive weight management plan.
                    </p>
                </div>
            </div>`;
    }
    
    document.getElementById('bmiResult').innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 2rem; font-weight: bold; color: ${categoryColor};">
                BMI: ${bmiRounded}
            </div>
            <div style="font-size: 1.2rem; color: ${categoryColor}; margin: 10px 0;">
                Category: ${category}
            </div>
            <div style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 15px;">
                BMI Categories: Underweight (&lt;18.5) | Normal (18.5-24.9) | Overweight (25-29.9) | Obese (≥30)
            </div>
        </div>
        ${healthTips}
    `;
}

// Enhanced Calorie Calculator with Recommendations
function calculateCalories() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activityLevel = parseFloat(document.getElementById('activity').value);
    
    if (!age || !weight || !height || age <= 0 || weight <= 0 || height <= 0) {
        document.getElementById('calorieResult').innerHTML = 
            '<div style="color: #e74c3c;">Please enter valid values for all fields.</div>';
        return;
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    const tdee = Math.round(bmr * activityLevel);
    const weightLoss = Math.round(tdee - 500);
    const weightGain = Math.round(tdee + 300);
    
    // Calculate BMI for additional recommendations
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let goalRecommendation = '';
    if (bmi < 18.5) {
        goalRecommendation = `
            <div style="background: rgba(52, 152, 219, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                <strong style="color: #3498db;">Recommended for you:</strong> Focus on healthy weight gain with ${weightGain} calories/day
            </div>`;
    } else if (bmi >= 25) {
        goalRecommendation = `
            <div style="background: rgba(243, 156, 18, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                <strong style="color: #f39c12;">Recommended for you:</strong> Consider weight loss with ${weightLoss} calories/day
            </div>`;
    } else {
        goalRecommendation = `
            <div style="background: rgba(39, 174, 96, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                <strong style="color: #27ae60;">Recommended for you:</strong> Maintain current weight with ${tdee} calories/day
            </div>`;
    }
    
    document.getElementById('calorieResult').innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <h3 style="color: #2c3e50; margin-top: 0;">Your Daily Calorie Needs</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; border: 2px solid #e9ecef;">
                    <div style="color: #27ae60; font-size: 1.5rem; font-weight: bold;">${tdee}</div>
                    <div style="color: #2c3e50; font-size: 0.9rem;">Maintain Weight</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; border: 2px solid #e9ecef;">
                    <div style="color: #3498db; font-size: 1.5rem; font-weight: bold;">${weightGain}</div>
                    <div style="color: #2c3e50; font-size: 0.9rem;">Gain Weight</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; border: 2px solid #e9ecef;">
                    <div style="color: #e67e22; font-size: 1.5rem; font-weight: bold;">${weightLoss}</div>
                    <div style="color: #2c3e50; font-size: 0.9rem;">Lose Weight</div>
                </div>
            </div>
            
            ${goalRecommendation}
            
            <div style="background: rgba(52, 73, 94, 0.05); padding: 15px; border-radius: 10px; margin-top: 15px; text-align: left;">
                <h4 style="color: #34495e; margin-top: 0;">💡 Additional Recommendations:</h4>
                <ul style="color: #2c3e50; line-height: 1.6; margin: 0;">
                    <li><strong>Macronutrient Balance:</strong> 45-65% carbs, 20-35% fats, 10-35% protein</li>
                    <li><strong>Meal Timing:</strong> Eat every 3-4 hours to maintain stable energy</li>
                    <li><strong>Hydration:</strong> Drink water equal to 35ml per kg of body weight</li>
                    <li><strong>Exercise:</strong> Combine cardio and strength training for best results</li>
                </ul>
            </div>
        </div>
    `;
}

        // Water Tracker Functions
        function addWater(amount) {
            currentWaterIntake += amount;
            if (currentWaterIntake > dailyWaterGoal) {
                currentWaterIntake = dailyWaterGoal;
            }
            updateWaterDisplay();
            saveWaterProgress();
        }

        function resetWater() {
            currentWaterIntake = 0;
            updateWaterDisplay();
            saveWaterProgress();
        }
         function changeLanguage() {
      const select = document.getElementById('languageSelect');
      const url = select.value;
      if (url) {
        window.location.href = url; // redirect to selected language URL
      }
    }
        function updateWaterDisplay() {
            const percentage = (currentWaterIntake / dailyWaterGoal) * 100;
            const waterLevel = document.getElementById('waterLevel');
            const waterAmount = document.getElementById('waterAmount');
            const waterProgress = document.getElementById('waterProgress');

            waterLevel.style.height = percentage + '%';
            waterAmount.textContent = `${currentWaterIntake} / ${dailyWaterGoal} ml`;

            let message = '';
            if (percentage >= 100) {
                message = '🎉 Congratulations! You\'ve reached your daily water goal!';
            } else if (percentage >= 75) {
                message = '💪 Great job! You\'re almost there!';
            } else if (percentage >= 50) {
                message = '👍 Good progress! Keep drinking!';
            } else if (percentage >= 25) {
                message = '💧 You\'re on track. Don\'t forget to hydrate!';
            } else {
                message = '🚰 Start hydrating! Your body needs water!';
            }

            waterProgress.innerHTML = `<p>${message}</p><p>${percentage.toFixed(1)}% of daily goal completed</p>`;
        }

        // Meal Planner Functions
        function saveMealPlan() {
            const inputs = document.querySelectorAll('.meal-input');
            const plan = {};

            inputs.forEach(input => {
                const day = input.dataset.day;
                const meal = input.dataset.meal;
                const value = input.value.trim();

                if (!plan[day]) plan[day] = {};
                plan[day][meal] = value;
            });

            console.log('Meal plan saved:', plan);
            alert('Meal plan saved successfully! 📅');
        }

        function clearMealPlan() {
            if (confirm('Are you sure you want to clear all meal plans?')) {
                document.querySelectorAll('.meal-input').forEach(input => {
                    input.value = '';
                });
                alert('Meal plan cleared! 🗑️');
            }
        }

        function loadMealPlan() {
            // In a real app, this would load saved meal plans
            console.log('Loading meal plan...');
        }

        // Shopping List Functions
        function addShoppingItem() {
            const input = document.getElementById('shoppingInput');
            const item = input.value.trim();

            if (item) {
                shoppingItems.push(item);
                input.value = '';
                loadShoppingList();
            }
        }

        function toggleShoppingItem(index) {
            const item = document.querySelector(`[data-index="${index}"]`);
            item.classList.toggle('checked');
        }

        function removeShoppingItem(index) {
            shoppingItems.splice(index, 1);
            loadShoppingList();
        }

        function loadShoppingList() {
            const list = document.getElementById('shoppingList');
            list.innerHTML = shoppingItems.map((item, index) => `
                <div class="shopping-item" data-index="${index}">
                    <span onclick="toggleShoppingItem(${index})" style="cursor: pointer;">
                        <input type="checkbox" style="margin-right: 1rem;"> ${item}
                    </span>
                    <button onclick="removeShoppingItem(${index})" style="background: #f44336; color: white; border: none; padding: 0.5rem; border-radius: 5px; cursor: pointer;">Remove</button>
                </div>
            `).join('');
        }

        // Enter key functionality for shopping input
        document.addEventListener('DOMContentLoaded', function() {
            const shoppingInput = document.getElementById('shoppingInput');
            if (shoppingInput) {
                shoppingInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        addShoppingItem();
                    }   
                });
            }

            // Enter key for search
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        searchRecipes();
                    }
                });
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetTab = targetId === 'recipes' ? 'recipes' : 
                                  targetId === 'calculator' ? 'calculator' :
                                  targetId === 'planner' ? 'planner' :
                                  targetId === 'nutrition' ? 'nutrition' : 'recipes';
                
                // Find and click the corresponding tab button
                const tabButtons = document.querySelectorAll('.tab-btn');
                tabButtons.forEach(btn => {
                    if (btn.textContent.toLowerCase().includes(targetTab) || 
                        (targetTab === 'calculator' && btn.textContent.includes('Calorie')) ||
                        (targetTab === 'planner' && btn.textContent.includes('Meal')) ||
                        (targetTab === 'nutrition' && btn.textContent.includes('Nutrition'))) {
                        btn.click();
                        return;
                    }
                });
            });
        });

        // Add some interactive animations
        function addHoverEffects() {
            const cards = document.querySelectorAll('.recipe-card, .nutrition-card, .day-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        // Initialize hover effects after DOM loads
        document.addEventListener('DOMContentLoaded', addHoverEffects);

        // Nutrition tips function
        function showNutritionTip() {
            const tips = [
                "💡 Tip: Drink water before meals to help with digestion!",
                "🥗 Tip: Fill half your plate with vegetables for optimal nutrition!",
                "🏃‍♀️ Tip: Combine cardio with strength training for best results!",
                "😴 Tip: Get 7-9 hours of sleep for better metabolism!",
                "🍎 Tip: Choose whole fruits over fruit juices for more fiber!",
                "🥜 Tip: Include healthy fats like nuts and avocados in your diet!",
                "⏰ Tip: Eat regular meals to maintain stable blood sugar levels!"
            ];
            
            const randomTip = tips[Math.floor(Math.random() * tips.length)];
            alert(randomTip);
        }

        // Auto-show nutrition tips periodically (optional)
        setInterval(() => {
            if (Math.random() > 0.98) { // Very low probability to not be annoying
                showNutritionTip();
            }
        }, 30000); // Every 30 seconds

        // Recipe of the Day functionality for Recette website

// Array of all available recipes with their details
const recipes = [
    // Main Course
    {
        name: "Butter Chicken",
        image: "https://falasteenifoodie.com/wp-content/uploads/2023/01/Butter-Chicken-Recipe-1536x1293.jpeg",
        link: "ButterChicken.html",
        category: "Main Course",
        description: "Creamy and rich Indian curry with tender chicken in a tomato-based sauce."
    },
    {
        name: "Paneer Tikka Masala",
        image: "https://i0.wp.com/cookingfromheart.com/wp-content/uploads/2017/03/Paneer-Tikka-Masala-4.jpg?fit=1024%2C683&ssl=1",
        link: "PannerTikkaMasala.html",
        category: "Main Course",
        description: "Marinated paneer cubes in a spiced curry sauce."
    },
    {
        name: "Lentil Curry",
        image: "https://lovingitvegan.com/wp-content/uploads/2019/01/Vegan-Lentil-Curry-11.jpg",
        link: "LentilCurry.html",
        category: "Main Course",
        description: "Hearty and nutritious lentil curry packed with protein and flavor."
    },
    {
        name: "Chickpea Masala",
        image: "https://silkroadrecipes.com/wp-content/uploads/2020/07/Chickpea-Masala-square.jpg",
        link: "ChickPeaMasala.html",
        category: "Main Course",
        description: "Spicy and aromatic chickpea curry perfect with rice or bread."
    },
    {
        name: "Rogan Josh",
        image: "https://www.chewoutloud.com/wp-content/uploads/2022/08/Rogan-Josh-Vertical.jpg",
        link: "RoganJosh.html",
        category: "Main Course",
        description: "Traditional Kashmiri curry with tender meat in aromatic spices."
    },
    {
        name: "Vegetable Korma",
        image: "https://mydaintykitchen.com/wp-content/uploads/2020/04/veg-korma.jpg",
        link: "VegetableKorma.html",
        category: "Main Course",
        description: "Mild and creamy vegetable curry with coconut and cashews."
    },
    
    // Biryani
    {
        name: "Hyderabadi Chicken Biryani",
        image: "https://yezzy4.com/wp-content/uploads/2023/02/Hyderabadi-chicken-Biryani.jpg",
        link: "HyderabadiChickenBiryani.html",
        category: "Biryani",
        description: "Aromatic basmati rice layered with spiced chicken and saffron."
    },
    {
        name: "Vegetable Biryani",
        image: "https://www.dwarakaorganic.com/wp-content/uploads/2012/06/Veg-Biryani-Recipe.jpg",
        link: "VegetableBiryani.html",
        category: "Biryani",
        description: "Fragrant rice with mixed vegetables and aromatic spices."
    },
    {
        name: "Mutton Biryani",
        image: "https://www.cookwithnabeela.com/wp-content/uploads/2024/02/MuttonBiryani.webp",
        link: "MuttonBiryani.html",
        category: "Biryani",
        description: "Rich and flavorful mutton biryani with tender meat and spices."
    },
    
    // Pasta
    {
        name: "Classic Alfredo Pasta",
        image: "https://www.cookingclassy.com/wp-content/uploads/2019/09/alfredo-sauce-15.jpg",
        link: "ClassicAlfredoPasta.html",
        category: "Pasta",
        description: "Creamy and indulgent pasta with parmesan and butter sauce."
    },
    {
        name: "Pesto Pasta",
        image: "https://www.nourishandtempt.com/wp-content/uploads/2022/04/357B765F-F3DC-47E7-AEA2-58A1398F1419-scaled.jpg",
        link: "PestoPasta.html",
        category: "Pasta",
        description: "Fresh basil pesto pasta with garlic and pine nuts."
    },
    {
        name: "Carbonara Pasta",
        image: "https://www.savoryexperiments.com/wp-content/uploads/2019/01/Carbonara-3.jpg",
        link: "CarbonaraPasta.html",
        category: "Pasta",
        description: "Classic Italian pasta with eggs, cheese, and pancetta."
    },
    
    // Breakfast
    {
        name: "Banana Oatmeal Pancakes",
        image: "https://allthehealthythings.com/wp-content/uploads/2021/01/banana-oatmeal-pancakes-5.jpg",
        link: "BananaOatmealPancakes.html",
        category: "Breakfast",
        description: "Healthy and fluffy pancakes made with bananas and oats."
    },
    {
        name: "Poha",
        image: "https://www.indianveggiedelight.com/wp-content/uploads/2022/07/poha-recipe-featured.jpg",
        link: "Poha.html",
        category: "Breakfast",
        description: "Traditional Indian breakfast with flattened rice and spices."
    },
    {
        name: "Idli with Coconut Chutney",
        image: "https://madhurasrecipe.com/wp-content/uploads/2023/11/Winter-Idli-2.jpg",
        link: "IdliwithCoconutChutney.html",
        category: "Breakfast",
        description: "Steamed rice cakes served with fresh coconut chutney."
    },
    
    // Pizza
    {
        name: "Classic Margherita Pizza",
        image: "https://images.eatsmarter.com/sites/default/files/styles/920x690/public/classic-margherita-pizza-493177.jpg",
        link: "ClassicMargheritaPizza.html",
        category: "Pizza",
        description: "Simple and delicious pizza with tomato, mozzarella, and basil."
    },
    {
        name: "Sweet Corn & Paneer Pizza",
        image: "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/corn.f8baa08ad7f607f1de30f96bb9245b50.1.jpg",
        link: "SweetCorn&PaneerPizza.html",
        category: "Pizza",
        description: "Indian-style pizza with sweet corn and cottage cheese."
    },
    
    // Desserts
    {
        name: "Chocolate Lava Cake",
        image: "https://damnspicy.com/wp-content/uploads/2020/08/chocolate-lava-cakes-for-two-12-scaled.jpg",
        link: "ChocolateLavaCake.html",
        category: "Desserts",
        description: "Decadent chocolate cake with molten chocolate center."
    },
    {
        name: "Strawberry Cheesecake",
        image: "https://sweetandsavorymeals.com/wp-content/uploads/2019/04/Strawberry-Cheesecake-Recipe-4.jpg",
        link: "StrawberryCheesecake.html",
        category: "Desserts",
        description: "Creamy cheesecake topped with fresh strawberries."
    },
    {
        name: "Tiramisu",
        image: "https://i.shgcdn.com/0c5d8e10-96a1-4043-94e1-ccca934ac6fc/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
        link: "Tiramisu.html",
        category: "Desserts",
        description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone."
    }
];

// Function to get today's recipe based on the current date
function getTodaysRecipe() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    // Use the day of year as seed for consistent daily recipe
    const recipeIndex = dayOfYear % recipes.length;
    return recipes[recipeIndex];
}

// Function to create and display the Recipe of the Day modal
function showRecipeOfTheDay() {
    const todaysRecipe = getTodaysRecipe();
    
    // Create modal HTML
    const modalHTML = `
        <div id="recipeOfDayModal" class="recipe-modal-overlay">
            <div class="recipe-modal">
                <div class="recipe-modal-header">
                    <h2>🌟 Recipe of the Day</h2>
                    <span class="recipe-modal-close" onclick="closeRecipeModal()">&times;</span>
                </div>
                <div class="recipe-modal-content">
                    <div class="recipe-image-container">
                        <img src="${todaysRecipe.image}" alt="${todaysRecipe.name}" class="recipe-modal-image">
                        <div class="recipe-category-badge">${todaysRecipe.category}</div>
                    </div>
                    <div class="recipe-details">
                        <h3 class="recipe-title">${todaysRecipe.name}</h3>
                        <p class="recipe-description">${todaysRecipe.description}</p>
                        <div class="recipe-modal-buttons">
                            <button class="recipe-btn primary" onclick="window.location.href='${todaysRecipe.link}'">
                                View Full Recipe 👨‍🍳
                            </button>
                            <button class="recipe-btn secondary" onclick="closeRecipeModal()">
                                Maybe Later
                            </button>
                        </div>
                    </div>
                </div>
                <div class="recipe-modal-footer">
                    <p>✨ A new recipe awaits you every day! Come back tomorrow for another delicious suggestion.</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to the page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add CSS styles for the modal
    addRecipeModalStyles();
    
    // Show modal with animation
    setTimeout(() => {
        const modal = document.getElementById('recipeOfDayModal');
        if (modal) {
            modal.classList.add('show');
        }
    }, 100);
}

// Function to close the Recipe of the Day modal
function closeRecipeModal() {
    const modal = document.getElementById('recipeOfDayModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Function to add CSS styles for the modal
function addRecipeModalStyles() {
    if (document.getElementById('recipeModalStyles')) return;
    
    const styles = `
        <style id="recipeModalStyles">
            .recipe-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .recipe-modal-overlay.show {
                opacity: 1;
            }
            
            .recipe-modal {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                transform: scale(0.8) translateY(50px);
                transition: transform 0.3s ease;
                color: white;
            }
            
            .recipe-modal-overlay.show .recipe-modal {
                transform: scale(1) translateY(0);
            }
            
            .recipe-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .recipe-modal-header h2 {
                margin: 0;
                font-size: 1.8rem;
                font-weight: 600;
            }
            
            .recipe-modal-close {
                font-size: 2rem;
                cursor: pointer;
                color: rgba(255, 255, 255, 0.8);
                transition: color 0.3s ease;
                line-height: 1;
            }
            
            .recipe-modal-close:hover {
                color: white;
            }
            
            .recipe-modal-content {
                padding: 1.5rem;
            }
            
            .recipe-image-container {
                position: relative;
                margin-bottom: 1.5rem;
            }
            
            .recipe-modal-image {
                width: 100%;
                height: 300px;
                object-fit: cover;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .recipe-category-badge {
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(255, 255, 255, 0.9);
                color: #333;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
            }
            
            .recipe-title {
                font-size: 2rem;
                margin: 0 0 1rem 0;
                font-weight: 700;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            .recipe-description {
                font-size: 1.1rem;
                line-height: 1.6;
                margin-bottom: 2rem;
                opacity: 0.9;
            }
            
            .recipe-modal-buttons {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .recipe-btn {
                padding: 1rem 2rem;
                border: none;
                border-radius: 50px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                flex: 1;
                min-width: 150px;
            }
            
            .recipe-btn.primary {
                background: white;
                color: #764ba2;
            }
            
            .recipe-btn.primary:hover {
                background: #f0f0f0;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .recipe-btn.secondary {
                background: transparent;
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.5);
            }
            
            .recipe-btn.secondary:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: white;
            }
            
            .recipe-modal-footer {
                padding: 1.5rem;
                text-align: center;
                border-top: 1px solid rgba(255, 255, 255, 0.2);
                opacity: 0.8;
            }
            
            .recipe-modal-footer p {
                margin: 0;
                font-size: 0.95rem;
            }
            
            @media (max-width: 768px) {
                .recipe-modal {
                    width: 95%;
                    margin: 1rem;
                }
                
                .recipe-modal-buttons {
                    flex-direction: column;
                }
                
                .recipe-btn {
                    flex: none;
                }
                
                .recipe-title {
                    font-size: 1.5rem;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Function to check if user has seen today's recipe
function hasSeenTodaysRecipe() {
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem('recipeOfDayLastShown');
    return lastShown === today;
}

// Function to mark today's recipe as seen
function markTodaysRecipeAsSeen() {
    const today = new Date().toDateString();
    localStorage.setItem('recipeOfDayLastShown', today);
}

// Function to add Recipe of the Day button to header
function addRecipeOfDayButton() {
    const nav = document.querySelector('.main-nav');
    if (nav) {
        const recipeBtn = document.createElement('li');
        recipeBtn.innerHTML = '<a href="#" onclick="showRecipeOfTheDay(); return false;">🌟 Recipe of the Day</a>';
        nav.appendChild(recipeBtn);
    }
}

// Initialize Recipe of the Day functionality
function initRecipeOfTheDay() {
    // Add the button to navigation
    addRecipeOfDayButton();
    
    // Show recipe of the day automatically if not seen today
    // Delay to allow page to load completely
    setTimeout(() => {
        if (!hasSeenTodaysRecipe()) {
            showRecipeOfTheDay();
            markTodaysRecipeAsSeen();
        }
    }, 2000); // Show after 2 seconds
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('recipeOfDayModal');
    if (modal && event.target === modal) {
        closeRecipeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeRecipeModal();
    }
});

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRecipeOfTheDay);
} else {
    initRecipeOfTheDay();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');

    // Optionally store preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

        // Add theme toggle button
        
        document.addEventListener('DOMContentLoaded', function() {
            const themeBtn = document.createElement('button');
            themeBtn.innerHTML = '🌙';
            themeBtn.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1001; background: rgba(255,255,255,0.8); border: none; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; font-size: 1.5rem;';
            themeBtn.onclick = toggleTheme;
            document.body.appendChild(themeBtn);
        });
        

        console.log('🍽️ Recette app loaded successfully! Enjoy your culinary journey!');

    