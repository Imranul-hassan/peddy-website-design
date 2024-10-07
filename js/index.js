//create load categories
const loadCategories = () =>{
    fetch ("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

//create load pets
const loadPets = () =>{
    fetch ("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
};


// {petId: 16, breed: 'English Angora', category: 'Rabbit', date_of_birth: '2023-08-05', price: 300, …}
// breed
// : 
// "English Angora"
// category
// : 
// "Rabbit"
// date_of_birth
// : 
// "2023-08-05"
// gender
// : 
// "Female"
// image
// : 
// "https://i.ibb.co.com/zZHPJNh/pet-16.jpg"
// petId
// : 
// 16
// pet_details
// : 
// "This fluffy female English Angora rabbit, born on August 5, 2023, is known for her long, luxurious fur. Priced at $300, she's perfect for families who enjoy grooming and cuddling. She is not vaccinated."
// pet_name
// : 
// "Snowball"
// price
// : 
// 300
// vaccinated_status
// : 
// "Not"


//create display pets
const displayPets =(pets) =>{
    const petContainer = document.getElementById("pets")
    pets.forEach(pet => {
    console.log(pet)
    const card = document.createElement("div");
    card.classList ="card border-2";
    card.innerHTML =`
    <figure class="">
    <img
      src=${pet.image}
      class="h-full w-full object-cover p-3"
      alt="Shoes" />
    </figure>
    <div class="pl-3">
        <h2 class="card-title">
        ${pet.pet_name}
        </h2>
        <p> Breed: ${pet.breed}</p>
        <p> Birth: ${pet.date_of_birth}</p>
        <p> Gender: ${pet.gender}</p>
        <p> Price: ${pet.price}</p>
         <hr>
        <div class=" flex gap-5">
         <button class="btn"> <i class="fa-regular fa-thumbs-up"></i></button>
         <button class="btn"> Adopt </button>
         <button class="btn"> Details </button>
         
        </div>
        
        </div>
    </div>

    `
    petContainer.append(card);
    })
}

//create display categories
const displayCategories =(categories) =>{
    const categoryContainer = document.getElementById("categories")
    categories.forEach((item) => {
    console.log(item)
    //create button 
    const button = document.createElement("button");
    button.classList ="btn";
    button.innerText = item.category

    categoryContainer.append(button);
    });
};

loadCategories();
loadPets();