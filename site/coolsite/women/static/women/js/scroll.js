for (let i = 4; i < 8; i++){
            try {
                fetch(`http://127.0.0.1:8000/posts-scroll/${i}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                        body: JSON.stringify({'data': 'myData'})
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        block.innerHTML = block.innerHTML + `
                <li>
                    <div class="article-panel">
                        <p class="first">Категория: ${data.cat_id}</p>
                        <p class="last">Дата: ${data.time_update}</p>
                    </div>


                    <h2><a href="{% url 'post' ${data.id} %}">${data.title}</a></h2>

                        <div class="counter" data-counter>


                            <div class="counter__button counter__button_minus">
                                <button id="${data.id}" class="lm">-</button>
                            </div>

                            <div class="like${data.id}">
                                ${data.likes}
                            </div>

                            <img src="/like.png" width="30" height="30">

                            <div class="counter__button counter__button_plus">
                                <button id="${data.id}" class="lp">+</button>
                            </div>

                        </div>
                <div>
                </div>
                ${data.content}
                <div class="clear"></div>
                <p class="link-read-post"><a href="{% url 'post' ${data.id} %}">Читать пост</a></p>
                </li>
                        `;
                    })
                count++
                if (count > 13){
                    count = 4
                }
            } catch(err) {
            console.log(err)
            }
};

let count = 4
window.addEventListener("scroll", function(){

    var block = document.getElementById('infinite-scroll');
    var counter = 1;

    var contentHeight = block.offsetHeight;      // 1) высота блока контента вместе с границами
    var yOffset       = window.pageYOffset;      // 2) текущее положение скролбара
    var window_height = window.innerHeight;      // 3) высота внутренней области окна документа
    var y             = yOffset + window_height;

    // если пользователь достиг конца

    if(y >= contentHeight){
        for (let i = 0; i < 3; i++){
            try {
                fetch(`http://127.0.0.1:8000/posts-scroll/${count}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                        body: JSON.stringify({'data': 'myData'})
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        block.innerHTML = block.innerHTML + `
                <li>
                    <div class="article-panel">
                        <p class="first">Категория: ${data.cat_id}</p>
                        <p class="last">Дата: ${data.time_update}</p>
                    </div>


                    <h2><a href="{% url 'post' ${data.id} %}">${data.title}</a></h2>

                        <div class="counter" data-counter>


                            <div class="counter__button counter__button_minus">
                                <button id="${data.id}" class="lm">-</button>
                            </div>

                            <div class="like${data.id}">
                                ${data.likes}
                            </div>

                            <img src="/like.png" width="30" height="30">

                            <div class="counter__button counter__button_plus">
                                <button id="${data.id}" class="lp">+</button>
                            </div>

                        </div>
                <div>
                </div>
                ${data.content}
                <div class="clear"></div>
                <p class="link-read-post"><a href="{% url 'post' ${data.id} %}">Читать пост</a></p>
                </li>
                        `;
                    })
                count++
                if (count > 14){
                    break
                }
            } catch(err) {
            console.log(err)
            }
        }
    }
});





