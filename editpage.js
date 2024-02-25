const endPoint = "https://striveschool-api.herokuapp.com/api/product/";
// input per la modifica dei prodotti
const imgInput = document.getElementById("input-edit-img");
const nameInput = document.getElementById("input-edit-name");
const descInput = document.getElementById("input-edit-desc");
const priceInput = document.getElementById("input-edit-price");
const brandInput = document.getElementById("input-edit-brand");
// btn invio edit
const btnSend = document.getElementById("send-btn");
// sezone della card in modifica
const productContainer = document.getElementById("section-product")

const paramObj = new URLSearchParams(window.location.search);
const myId = paramObj.get("pid");

btnSend.addEventListener("click", async () => {
    await editProd();
    await data();
});

window.onload = data();
async function data() {
    productContainer.innerHTML = "";
    try {
        const res = await fetch(endPoint + myId, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YjE1NjljNDM3MDAwMTkzYzM2MWMiLCJpYXQiOjE3MDg0Mzc4NDYsImV4cCI6MTcwOTY0NzQ0Nn0.p_95V58ZWuC6PjqWHJTdA4qT_RZQqVvhw7btF0dUSok"
            }
        })
        const json = await res.json();
        creatTemplate(json);
        imgInput.value = json.imageUrl;
        nameInput.value = json.name;
        descInput.value = json.description;
        priceInput.value = json.price;
        brandInput.value = json.brand;

    } catch (error) {
        console.log(error);
    }
}

async function editProd () {
    if (imgInput.value && nameInput.value && descInput.value && priceInput.value && brandInput.value) {
        let editProd = { "name": nameInput.value, "description": descInput.value, "imageUrl": imgInput.value, "brand": brandInput.value, "price": priceInput.value, "time": new Date()};
        try {
            const res = await fetch(endPoint + myId, {
                method: "PUT",
                body: JSON.stringify(editProd),
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YjE1NjljNDM3MDAwMTkzYzM2MWMiLCJpYXQiOjE3MDg0Mzc4NDYsImV4cCI6MTcwOTY0NzQ0Nn0.p_95V58ZWuC6PjqWHJTdA4qT_RZQqVvhw7btF0dUSok"
                }
                
                
            })
        } catch (error) {
            console.log(error);
        }
    }
}

function creatTemplate ({name, description, brand, imageUrl, price, _id}) {

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
    containerCard.classList.add('card', 'col-lg-5', 'col-md-3', 'col-12');
    containerCard.style.height = "41.5em";
    img.classList.add('mt-2');
    img.style.maxHeight = "60%";
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