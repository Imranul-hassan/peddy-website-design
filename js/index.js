
// load spinner
const handleSpinner = ()=>{
    document.getElementById("spinner").style.display ="block"

    setTimeout(function() {
        displayPets()
    },3000)
}

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

const loadCategoryPets = (category) =>{
    fetch (`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => displayPets(data.data))
    .catch((error) => console.log(error));

};

const loadDetails =async (petId) =>{
   const uri =`https://openapi.programming-hero.com/api/peddy/pet/${petId}`
   const res = await fetch(uri);
   const data = await res.json();
   displayDetails(data.petData)
}

// adopt
const loadAdopt = async(petId)=>{
   const uri =`https://openapi.programming-hero.com/api/peddy/pet/${petId}`
   const res = await fetch(uri);
   const data = await res.json();
   displayAdopt(data.petData)

}

const displayAdopt = (petData) =>{
    const displayAdoptContainer = document.getElementById("modal-content")
    document.getElementById("show-modal").click();
    let countdown = 3;
    displayAdoptContainer.innerHTML =`
        <div class="flex flex-col items-center justify-center">
            <p class="text-3xl font-bold"> Congrasulations </p>
            <p class="text-xl "> Adoption process is start for your pet </p>
             <p> <span id="countdown">${countdown}
        </div>
    `
    const intervalId = setInterval(() => {
        countdown--;
        document.getElementById("countdown").textContent = countdown;
    }, 1000);

    setTimeout(() => {
        clearInterval(intervalId); 
        document.getElementById("show-modal"); 
    }, 3000);

}
// thumbs load
const loadThumbs = async (petId) =>{
    const uri =`https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    const res = await fetch(uri);
    const data = await res.json();
    displayThumbsImage(data.petData)
 }

const displayThumbsImage = (petData)=>{
    console.log(petData)
    const thumbsContainer = document.getElementById("pet-thumbs")
    

    thumbsContainer.innerHTML =`
        <img src="${petData.image}" class="w-full py-3"/> 
    `
}

const displayDetails = (petData) =>{
    console.log(petData)
    const detailsContainer = document.getElementById("modal-content")
    document.getElementById("show-modal").click();

    detailsContainer.innerHTML =`
        <img src="${petData.image}" class="w-full py-3"/>
        <h2 class="card-title">
        ${petData.pet_name}
        </h2>
        <p> Breed: ${petData.breed}</p>
        <p> Birth: ${petData.date_of_birth}</p>
        <p> Gender: ${petData.gender}</p>
        <p> Price: ${petData.price}</p>
         <hr>
         <p class="py-3">Details Description </br> </br> ${petData.pet_details}</p>
         
    `
};


//create display pets
const displayPets =(pets) =>{
    const petContainer = document.getElementById("pets")
    petContainer.innerHTML ="";

    if(pets.length === 0){
        petContainer.classList.remove("grid")
        petContainer.innerHTML =`
        <div class="flex flex-col justify-center items-center" >
            <img src="./images/error.webp"/>
            <p class="font-bold text-xl">No Information Available</p>
        </div>
        `
        return;
    }
    else{
        petContainer.classList.add("grid");
    }

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
        <div class=" lg:flex gap-4 py-2">
         <button onclick="loadThumbs(${pet.petId})" class="btn bg-white  border-teal-100 "> <i class="fa-regular fa-thumbs-up"></i></button>
         <button onclick="loadAdopt(${pet.petId})" class="btn text-[#0E7A81] text-lg bg-white  p-2 border-teal-100"> Adopt</button>
         <button onclick="loadDetails(${pet.petId})" class="btn text-[#0E7A81] text-lg bg-white p-2 border-teal-100"> Details </button>
         
        </div>
        
        </div>
    </div>

    `
    petContainer.append(card);

    })
}

//create display categories
const displayCategories =(categories) =>{
    const categoryContainer = document.getElementById("categories");

    categories.forEach((item) => {
    console.log(item)
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
       <button onclick="loadCategoryPets('${item.category}')" class="btn">
            <img src="${item.category_icon}" class="w-8"/>
            <p class="pt-2 text-lg">${item.category}</p>
       </button>

    `
    categoryContainer.append(buttonContainer);
    });
};



loadCategories();
loadPets();
