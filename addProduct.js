const endPoint = "https://striveschool-api.herokuapp.com/api/product/";
// container prodotti
const containerEditProd = document.getElementById("container-product");
// elementi per far comparire e scomparire input di aggiunta prodotti
const btnProd = document.getElementById('btn-prod');
const sectionNewProd = document.getElementById('new-prod');
// Input per l'aggiunta di prodotti
const imgInput = document.getElementById("input-img");
const nameInput = document.getElementById("input-name");
const descInput = document.getElementById("input-desc");
const priceInput = document.getElementById("input-price");
const brandInput = document.getElementById("input-brand");
// btn invio per la creazione del prodotto
const createProduct = document.getElementById("create-product");
createProduct.addEventListener("click", async () => {
   await addProduct();
   await getResult;
})

// listener per far comparire la sezione per l'aggiunta di prodotti
btnProd.addEventListener("click", () => {
    sectionNewProd.classList.toggle('d-none');
})
// fetch POST
async function addProduct () {
    sectionNewProd.innerHTML = "";
    let newProd = { "name": nameInput.value, "description": descInput.value, "brand": brandInput.value, "imageUrl": imgInput.value, "price": priceInput.value, "time": new Date()};

    try {
        const res = await fetch(endPoint, { 
            method: "POST", body: JSON.stringify(newProd),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YjE1NjljNDM3MDAwMTkzYzM2MWMiLCJpYXQiOjE3MDg0Mzc4NDYsImV4cCI6MTcwOTY0NzQ0Nn0.p_95V58ZWuC6PjqWHJTdA4qT_RZQqVvhw7btF0dUSok"
            }
        });
    } catch (error) {
        
    }
}

window.onload = getResult();
// fetch GET
async function getResult () {
    containerEditProd.innerHTML = "";
    try {
        const res = await fetch(endPoint, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YjE1NjljNDM3MDAwMTkzYzM2MWMiLCJpYXQiOjE3MDg0Mzc4NDYsImV4cCI6MTcwOTY0NzQ0Nn0.p_95V58ZWuC6PjqWHJTdA4qT_RZQqVvhw7btF0dUSok"
            }
        });
        const json = await res.json();
        json.forEach(element => {
            editSection(element)
        });
        
    } catch (error) {
        console.log(error)
    }
}
// creazione elementi per la modifica o cancellazione
function editSection ({name, description, brand, imageUrl, price, _id}) {
    // creazione elementi
    let container = document.createElement('div');
    let img = document.createElement('img');
    let bodyContainer = document.createElement('div');
    let title =document.createElement('h3');
    let desc = document.createElement('p');
    let info = document.createElement('div');
    let brandProd = document.createElement('span');
    let priceProd = document.createElement('span');
    let containerBtn = document.createElement('div');
    let editBtn = document.createElement('a');
    let deleteBtn = document.createElement('a');
    // assegnazione valori
    img.src = imageUrl;
    title.innerText = name;
    // desc.innerText = description;
    // brandProd.innerText = brand;
    // priceProd.innerText = price;
    editBtn.innerText = "Edit";
    editBtn.href = `editpage.html?pid=${_id}`;
    // editBtn.target = "_blank";
    deleteBtn.innerText = "delete";
    // assegnazione classe
    container.classList.add('card','col-lg-2', 'col-md-3', 'col-12');
    // container.style.height = "40em";
    img.classList.add('mt-1');
    img.style.maxHeight = "289px";
    bodyContainer.classList.add('card-body', 'p-0');
    bodyContainer.style.height = "50%"
    title.classList.add('card-title');
    // desc.classList.add('card-text', 'overflow-hidden', 'h-25', 'd-inline-block');
    info.classList.add('d-flex', 'justify-content-around');
    containerBtn.classList.add('d-flex', 'justify-content-end', 'align-items-end', 'my-2');
    editBtn.classList.add('btn', 'btn-primary', 'btn-sm', 'mx-1'),
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
    // elimina prodotto
    deleteBtn.addEventListener("click", async () => {
        await deleteProd(_id);
        await getResult();
    })
    // creazione elemento
    containerBtn.appendChild(editBtn);
    containerBtn.appendChild(deleteBtn);
    info.appendChild(brandProd);
    info.appendChild(priceProd);
    bodyContainer.appendChild(title);
    // bodyContainer.appendChild(desc);
    // bodyContainer.appendChild(info);
    bodyContainer.appendChild(containerBtn);
    container.appendChild(img);
    container.appendChild(bodyContainer);
    containerEditProd.appendChild(container);
}
// fetch DELETE
async function deleteProd (id) {
    const res = await fetch(endPoint + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YjE1NjljNDM3MDAwMTkzYzM2MWMiLCJpYXQiOjE3MDg0Mzc4NDYsImV4cCI6MTcwOTY0NzQ0Nn0.p_95V58ZWuC6PjqWHJTdA4qT_RZQqVvhw7btF0dUSok"
        }
    })
}