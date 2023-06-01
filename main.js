const API = "http://localhost:8001/post";

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
// ?twit
let twit = document.querySelector(".twit_count");

follow.addEventListener("click", () => {
  follow.style.backgroundColor = "#30b4d8";
});
function twitCount() {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let countTwit = document.createElement("div");
      countTwit.innerHTML = `<p>${data.length} публикаций</p>`;
      twit.append(countTwit);
    });
  render();
}
twitCount();
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
  let res = await fetch(`${API}`);
  let twit = await res.json();

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

// ! delete
async function deletePost(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.log(error);
  }
  render();
}

//? for edit
let regionEdit = document.querySelector("#regionEdit");
let imageUrlEdit = document.querySelector("#image_url_edit");
let LikesEdit = document.querySelector("#likesEdit");
let commentsEdit = document.querySelector("#comments_edit");
let btnEdit = document.querySelector(".btnEdit");
let modalEdit = document.querySelector("#exampleModalforEdit");

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-edit")) {
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        regionEdit.value = data.region;
        imageUrlEdit.value = data.imageUrl;
        commentsEdit.value = data.comment;
        LikesEdit.value = data.countLike;

        btnEdit.id = data.id;
      });
  }
});

btnEdit.addEventListener("click", function () {
  let id = this.id;
  // console.log(id);
  region = regionEdit.value;
  imageUrl = imageUrlEdit.value;
  comment = commentsEdit.value;
  countLike = LikesEdit.value;
  if (!region || !imageUrl || !comment || !countLike) {
    alert("заполните все поля");
    return;
  }

  let editedPost = {
    region,
    imageUrl,
    countLike,
    comment,
  };
  saveEdit(editedPost, id);
});

function saveEdit(editedPost, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(editedPost),
  }).then(() => render());
  let modal = bootstrap.Modal.getInstance(modalEdit);
  modal.hide();
}
