let id=-1

const productdata = (e) => {
  e.preventDefault();
  let value = document.getElementById("btn").value;
  console.log(value,id);

  let product = {
    title: document.getElementById("title").value,
    img: document.getElementById("img").value,
    price: document.getElementById("price").value,
    category: document.getElementById("category").value,
  };
  if (value == "post") {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    });
  }
  else{
    fetch(`http://localhost:3000/products/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product),
      });
  }

  console.log(product);
};

document.getElementById("form").addEventListener("submit", productdata);
console.log(id)
// display the product
const display = (data) => {
  data.map((ele) => {
    let img = document.createElement("img");
    img.src = ele.img;
    let title = document.createElement("h2");
    title.innerHTML = ele.title;
    let price = document.createElement("p");
    price.innerHTML = ele.price;
    let category = document.createElement("p");
    category.innerHTML = ele.category;
    let btn1 = document.createElement("button");
    btn1.innerHTML = "Update";

    btn1.addEventListener("click", () => {
      document.getElementById("title").value = ele.title;
      document.getElementById("img").value = ele.img;
      document.getElementById("price").value = ele.price;
      document.getElementById("category").value = ele.category;
      document.getElementById("btn").value = "Update";
      id=ele.id;
    });

    let btn2 = document.createElement("button");
    btn2.innerHTML = "Delete";
    btn2.addEventListener("click", () => {
      console.log(ele.id);
      fetch(`http://localhost:3000/products/${ele.id}`, {
        method: "DELETE",
      });
    });
    let div = document.createElement("div");
    div.append(img, title, price, category, btn1, btn2);
    document.getElementById("ui").append(div);
  });
};

let get = async () => {
  let res = await fetch("http://localhost:3000/products");
  let data = await res.json();
  // console.log(data);
  display(data);
};

get();