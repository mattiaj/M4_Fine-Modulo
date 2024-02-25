const endPoint = "https://striveschool-api.herokuapp.com/api/product/";
const productContainer = document.getElementById("container-prod");

window.onload = prodPage();

async function prodPage () {
        let objParam = new URLSearchParams(window.location.search);
        let productId = objParam.get("pid");
        try {
            const res = await fetch(endPoint + productId, { 
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YjE1NjljNDM3MDAwMTkzYzM2MWMiLCJpYXQiOjE3MDg0Mzc4NDYsImV4cCI6MTcwOTY0NzQ0Nn0.p_95V58ZWuC6PjqWHJTdA4qT_RZQqVvhw7btF0dUSok"
                }
            });
            const json = await res.json();
            createProdTemplate(json);
        } catch (error) {
            
        }
}

// funzione che crea il Template del singolo prodotto
function createProdTemplate ({name, description, brand, imageUrl, price}) {
    // creazione elementi
    let container = document.createElement('div');
    let img = document.createElement('img');
    let bodyContainer = document.createElement('div');
    let title =document.createElement('h3');
    let desc = document.createElement('p');
    let info = document.createElement('div');
    let brandProd = document.createElement('span');
    let priceProd = document.createElement('span');
    let btnContainer = document.createElement('div');
    let btnCart = document.createElement('a');

    // assegnazione classe
    container.classList.add('d-flex', 'flex-md-row', 'flex-column', 'border','border-2','rounded', 'm-5');
    img.classList.add('m-2')
    img.style.height = "400px";
    bodyContainer.classList.add('mx-3','my-2', 'd-flex', 'flex-column', 'justify-content-between')
    brandProd.classList.add('me-5');
    priceProd.classList.add('ms-5')
    btnCart.classList.add('btn', 'btn-secondary');
    btnContainer.classList.add('align-self-end')

    // assegnazione valori
    img.src = imageUrl;
    title.innerText = name;
    desc.innerText = description;
    brandProd.innerText = brand;
    priceProd.innerText = "prezzo: €" + price;
    btnCart.innerText = "Aggiungi al carrello"

    // creazione elemento
    info.appendChild(brandProd);
    info.appendChild(priceProd);
    btnContainer.appendChild(btnCart);
    bodyContainer.appendChild(title);
    bodyContainer.appendChild(desc);
    bodyContainer.appendChild(info);
    bodyContainer.appendChild(btnContainer);
    container.appendChild(img);
    container.appendChild(bodyContainer);
    productContainer.appendChild(container)
}