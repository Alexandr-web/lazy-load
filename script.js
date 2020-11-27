'use strict';

window.addEventListener('load', () => {
    const preolaider = document.querySelector('.preolaider');
    preolaider.style.display = 'none';
});

// получение постов c сервера
const getPosts = async url => {
    try {
        let response = await fetch(url);
        let content = await response.json();
        return content;
    } catch (err) {
        throw err;
    }
}

// создание постов 
const creatingPosts = data => {
    const list = document.querySelector('.list');

    data.then(posts => {
        posts.forEach(item => {
            let block = document.createElement('li');
            block.innerHTML = `<img data-src="loading.svg" src="" alt="loading" />`
            block.dataset.id = item.id;
            block.classList.add('item');

            list.appendChild(block);
        });

        showPosts();
    }).catch(err => {
        throw err;
    });
}

creatingPosts(getPosts('https://jsonplaceholder.typicode.com/todos/'));

// появление постов
function showPosts() {
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(item => {
            // берем все картинки в посте
            let images = [...item.target.childNodes]
                .filter(item => item.nodeName === 'IMG');

            // если попало в зону экрана
            if (item.isIntersecting) {
                item.target.classList.add('show');

                images.forEach(img => {
                    img.src = img.dataset.src;
                });
            } else {
                item.target.classList.remove('show');

                images.forEach(img => {
                    img.src = '';
                });
            }
        });
    });

    document.querySelectorAll('.item').forEach(item => {
        // помещаем, то над чем будет работать
        imageObserver.observe(item);
    });
}