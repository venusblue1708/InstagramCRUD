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
