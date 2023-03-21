const Buttons_plus = document.querySelectorAll(".lp");
const Buttons_minus = document.querySelectorAll(".lm");


Buttons_plus.forEach(button_plus => {
button_plus.addEventListener("click", async function() {
  fetch(`http://127.0.0.1:8000/likes-plus/${button_plus.id}/`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({'data': 'myData'})
})
    .then(response => response.json())
    .then(data => {
        let likesCount = data.likes_count
        let ID = data.id
        const currentElem = document.querySelector(`.like${ID}`)
        currentElem.innerHTML = likesCount
    })
    .catch(error => console.error(error));
})
});


Buttons_minus.forEach(button_minus => {
button_minus.addEventListener("click", async function() {
  fetch(`http://127.0.0.1:8000/likes-minus/${button_minus.id}/`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({'data': 'myData'})
})
    .then(response => response.json())
    .then(data => {
        let likesCount = data.likes_count
        let ID = data.id
        const currentElem = document.querySelector(`.like${ID}`)
        currentElem.innerHTML = likesCount
    })
    .catch(error => console.error(error));
});
});

