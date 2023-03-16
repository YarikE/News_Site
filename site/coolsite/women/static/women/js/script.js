{% load csrf_token %}
// Получение элементов управления страницей
var likeCountEl = document.getElementById('like-count');
var dislikeCountEl = document.getElementById('dislike-count');
var likeBtnEl = document.getElementById('like-btn');
var dislikeBtnEl = document.getElementById('dislike-btn');


function updateData(type) {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {


      var responseObj = JSON.parse(this.responseText);
      likeCountEl.innerHTML = responseObj.likes;
      dislikeCountEl.innerHTML = responseObj.dislikes;
    }
  };
  xhttp.open("POST", "/update-data/", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("type=" + type);
}

// Обработка событий клика на кнопки лайка и дизлайка
likeBtnEl.addEventListener("click", function() {
  updateData('like-count');
});

function addLike(id,element){
    post('/set-like/',{'id':id},(res)=>{console.log(res)})
}

document.querySelectorAll(".btn-like-add").addEventListener('click',(e)=>{
    debugger
})

function post(url,data,onSuccess){
var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {


      var responseObj = JSON.parse(this.responseText);
      onSuccess(responseObj)

    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("X-CSRFToken",csrf_token)
  xhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  xhttp.send(JSON.stringify(data));

  }
