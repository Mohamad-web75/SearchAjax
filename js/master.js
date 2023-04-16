let input = document.getElementById('ss');
let content = document.querySelector('#content ul');
let li = document.querySelectorAll('.list-search');
let liFirst = document.querySelector('.list-first');

let lastvalue = "";
let ajax = true;
let myArray = [];

input.addEventListener('keyup', async function searchajax(e) {
    if (!ajax) {
        return;
    }
    else {
        ajax = false;
    }
    if (this.value === "") {
        content.innerHTML = "";
        ajax = true;
        liFirst.style.display="block";
        liFirst.innerHTML="search content";
        return;
    }
    liFirst.innerHTML="loading...";
    // console.log(this.value);
    lastvalue = this.value;
    let val = encodeURIComponent(this.value);

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();

    // console.log(data);
    if (data.length) {
        
        for (let myData of data) {
            //console.log(myData.name);
            let li2 = document.createElement("li");
            li2.insertAdjacentHTML('afterbegin',
                `<span>${myData.title}</span><p>${myData.body}</p>`
            );
            content.appendChild(li2);
            myArray.push(li2);
            // console.log(myArray);
        }
        for (let arr of myArray) {
            arr.innerText.toLowerCase().includes(this.value.toLowerCase()) ? arr.classList.remove('hide') : arr.classList.add('hide');
            if(!arr.innerText.toLowerCase().includes(this.value.toLowerCase())){
                liFirst.style.display="block";
                liFirst.innerHTML="Not Found!!!!!";
            }else{
                liFirst.style.display="none";
            }
        } 
    }else{
        alert('moshkel dar daryaft data');
    }
    ajax = true;
    if (this.value != lastvalue) {
        searchajax.call(this);
    };
});
