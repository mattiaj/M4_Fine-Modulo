const endPoint = "https://striveschool-api.herokuapp.com/api/product/";
// Input di ricerca
const inputSearch = document.getElementById("input-search").value;
// variabile per la ricerca
let searchResults;
// container product
const productContainer = document.getElementById("container-prod");



// chiamata funzione per ricevere i prodotti
window.onload = getResult();
// fetch GET
async function getResult () {
    try {
        const res = await fetch(endPoint, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YjE1NjljNDM3MDAwMTkzYzM2MWMiLCJpYXQiOjE3MDg0Mzc4NDYsImV4cCI6MTcwOTY0NzQ0Nn0.p_95V58ZWuC6PjqWHJTdA4qT_RZQqVvhw7btF0dUSok"
            }
        });
        const json = await res.json();
        json.forEach(element => {
            creatTemplate(element)
        });
        
    } catch (error) {
        console.log(error)
    }
}

// funzione che crea il template
function creatTemplate ({name, description, brand, imageUrl, price, _id}) {
/* 
    <div class="card col-lg-2 col-md-3 col-6" style="width: 18rem;">
        <img src="" alt="">
        <div class="card-body">
          <h5 class="card-title">iphone 1500</h5>
          <p class="card-text"></p>
          <div class="d-flex justify-content-around">
              <span>Apple</span>
              <span>1200</span>
          </div>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div> */
// dichiarazione componenti
let containerCard = document.createElement("div");
let idProd = document.createElement('a');
let iconIdProd = document.createElement('i');
let img = document.createElement('img');
let cardBody = document.createElement('div');
let cardTitle = document.createElement('h5');
let cardDesc = document.createElement('p');
let brandPrice = document.createElement('div');
let brandName = document.createElement('span');
let prodPrice = document.createElement('span');
let btnCard = document.createElement('a');

// assegnazione classi
idProd.classList.add('bg-dark', 'rounded-circle', 'px-2', 'pb-1', 'text-light')
iconIdProd.classList.add('fa-solid', 'fa-info');
containerCard.classList.add('card', 'col-lg-2', 'col-md-3', 'col-12');
containerCard.style.height = "37.5em";
img.classList.add('mt-2');
img.style.maxHeight = "289px";
cardBody.classList.add('card-body', 'p-0', 'd-flex', 'flex-column');
cardBody.style.height = "30em";
cardTitle.classList.add('card-title', 'pt-2');
cardDesc.classList.add('card-text', 'overflow-hidden', 'h-25', 'd-inline-block');
brandPrice.classList.add('d-flex', 'justify-content-around', 'align-items-baseline');
btnCard.classList.add('btn', 'btn-secondary', 'mt-1', 'ms-3');

// assegnazione valori
containerCard.id = _id;
idProd.href = `prodpage.html?pid=${containerCard.id}`;
img.src = imageUrl;
cardTitle.innerText = name;
cardDesc.innerText = description;
brandName.innerText = brand;
prodPrice.innerText = "prezzo: €" + price;
btnCard.innerText = "Aggiungi al carrello";

// creazione card
idProd.appendChild(iconIdProd);
brandPrice.appendChild(brandName);
brandPrice.appendChild(idProd);
brandPrice.appendChild(prodPrice);
cardBody.appendChild(cardTitle);
cardBody.appendChild(cardDesc),
cardBody.appendChild(brandPrice);
cardBody.appendChild(btnCard);
containerCard.appendChild(img);
containerCard.appendChild(cardBody);
productContainer.appendChild(containerCard);

}



