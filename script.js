const searchform=document.querySelector('form');
const searchResult=document.querySelector('.search-result');
const container=document.querySelector('.container');
let searchQuery='';
const APP_ID = "41cfa7d9";
const APP_key =   "58de747600fbadb266dad12f7d02f9b8";


searchform.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery=e.target.querySelector('input').value;
   fetchAPI();
})
async function fetchAPI(){
    const urlbase=`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;

    const response=await fetch(urlbase);
    const data=await response.json();
    generateHTML(data.hits);
    console.log(data);
}
function generateHTML(results){
    let generatedHTML=''
     results.map((result)=>{
         return generatedHTML+=`
         <div class="item">
         <img src="${result.recipe.image}">
         <div class="flex-container">
             <h1 class="title">${result.recipe.label}</h1>
                 <a href="${result.recipe.url}" class="view-btn">View Recipe</a>
             </div>
             <p class="item-data">${result.recipe.calories.toFixed(2)}</p>
             <p class="item-data">Health labels: ${result.recipe.healthLabels.slice(0,3)}</p>
             <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
         </div>
         
         `
     })
     searchResult.innerHTML=generatedHTML;
}