let deserts = [];
const desertClass = document.querySelector('.desert-container');
const button = document.querySelector('.button');
url = 'http://localhost:3000/recipes'

// LOAD CONTENT FROM API ONLOAD
document.addEventListener('DOMContentLoaded', () =>{
    console.log('loaded');
     fetch(url)
        .then(res => res.json())
        .then( json => {
            deserts = json,
            postDeserts(deserts)
        })
});



    //POST CONTENT ON PAGE
    function postDeserts(){    
        deserts.forEach(desert => {
            let names = document.createElement('h5');
            names.setAttribute('class', 'card-title');
            names.innerHTML = desert.name;

            let img = document.createElement('img');
            img.setAttribute('src', desert.thumb_url);
            img.setAttribute('class', 'desert-url');
            img.setAttribute('class', 'card-img-top');
    

            let vid = document.createElement('vid');
            vid.setAttribute('src', desert.vid_url);
            vid.setAttribute('poster', desert.thumb_url)
            vid.setAttribute('class', 'vid');

            let h4 = document.createElement('h4');
                h4.setAttribute('span', 'like-count');
                h4.setAttribute('id', desert.id)
                h4.innerText = `${desert.user_ratings} Likes`;


            let btn = document.createElement('button')
                btn.setAttribute('class', 'like-btn btn btn-light')
                btn.setAttribute('id', desert.id)
                btn.addEventListener('click', handleLike);
                btn.innerText = "Like ❤️"

            let h5 = document.createElement('p');
                h5.setAttribute('class', 'card-text')
                h5.setAttribute('class', 'description')
                h5.innerText = `${desert.description}`;

            
            let divCard = document.createElement('div');
            divCard.setAttribute('class', 'card-body');
            divCard.append(names, img, vid, h4, btn, h5);
            desertClass.append(divCard);
        });
    }


    //SEARCH FUNCTION
    function filterSearch(){
        let desertNames = document.querySelectorAll('div.card-body');

        let filterValue = filterInput.value.toUpperCase();

        desertNames.forEach(e =>{
            let h2 = e.getElementsByTagName('h5')[0];

            if (h2.innerHTML.toUpperCase().indexOf(filterValue) > -1){
                e.style.display = ''
            } else{
                e.style.display = "none"
                e.classList.remove('selected')
            }
        });    
    }

    filterInput.addEventListener('keydown', filterSearch);


    //LIKE FUNCTIONS
   function handleLike(e){  
        e.srcElement.disabled = true
        e.target.classList.remove('btn-light')
        e.target.classList.add('btn-danger');
        incrementLikes(e);
    }

    function incrementLikes(e){
        let likeElement = e.srcElement.previousElementSibling.innerText
        let likeCount = parseInt(likeElement) + 1
        //likeCount.innerText = `${+1} likes`
        console.log(likeCount)
        fetch(`http://localhost:3000/recipes/${e.target.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify({
            "user_ratings": likeCount
          })
        })
         e.target.previousElementSibling.innerText = `${likeCount} Likes`; 
         //console.log(e.target);
         //e.srcElement.disabled = false
    }

    function disableUser(){
        const button = document.querySelector('.btn');
        button.classList.remove('btn-light');
        button.classList.add('btn-warning');
        button.classList.add('disabled')
    }









