const API = "http://localhost:8000/Post";

//? переменные для профиля
let nickName = document.querySelector(".nickName");
let imgProf = document.querySelector(".imgProf");
let addPost = document.querySelector(".add_post");
let modal = document.querySelector(".field");
let follow = document.querySelector(".follow");

//? переменные для инпутов
let region = document.querySelector("#region");
let imageUrl = document.querySelector("#image_url");
let countLike = document.querySelector("#likes");
let comment = document.querySelector("#comments");
let btnSend = document.querySelector(".btn_send");
//? для карточки
let postList = document.querySelector(".post_list");

btnSend.addEventListener("click", async function () {
  let post = {
    region: region.value,
    imageUrl: imageUrl.value,
    countLike: countLike.value,
    comment: comment.value,
  };
  if (
    !post.region.trim() ||
    !post.imageUrl.trim() ||
    !post.countLike.trim() ||
    !post.comment.trim()
  ) {
    alert("complete");
    return;
  }
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(post),
  });
  region.value = "";
  imageUrl.value = "";
  countLike.value = "";
  comment.value = "";
  render();
});

async function render() {
  let res = await fetch(`${API}?q=${searchVal}&_page=${currentPage}&_limit=1`);
  let twit = await res.json();
  pagination();
  postList.innerHTML = "";
  twit.forEach((item) => {
    let newItem = document.createElement("div");
    newItem.id = item.id;
    newItem.innerHTML = `
     <div class="card m-5" style="width: 18rem;">
     <div class="d-flex flex-direction-row">
     <img src="${imgProf.src}" class="card-img" alt="...">
     <div class="textPost">
     <h5 class="card-title mb-0 mt-1">${nickName.innerText}</h5>
    <p class="card-text">${item.region}</p>
    </div>
     </div>
      <img src="${item.imageUrl}" class="card-img-top" alt="...">
      <h3 class="heart">♡</h3>
      <div class="card-body">
        <p class="card-text likePlus">${item.countLike} отметок "Нравится"</p>
        <p class="card-text text-secondary">Посмотреть все комментарии ${item.comment}</p>
        <button onclick ="deletePost(${item.id})" class="btn btn-danger btn-delete">Delete</button>
        <button id="${item.id}" class="btn btn-success btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModalforEdit">Edit</button>
      </div>
    </div>
     `;
    postList.append(newItem);
    let likes = document.querySelector(".heart");
    let likePlus = document.querySelector(".likePlus");
    likes.addEventListener("click", () => {
      likes.innerText = "❤️";
      likes.id = item.id;
      let result = Number(item.countLike) + 1;
      likePlus.innerText = `${result} отметок "Нравится"`;
    });
  });
}
render();
