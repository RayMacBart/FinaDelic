function buttonclick() {
   div = document.createElement('div');
   div.style.height = "4rem";
   div.style.width = "5rem";
   div.style.backgroundColor = "red";
   document.body.appendChild(div);
}

const button = document.getElementById("button1");

// button.addEventListener('click', buttonclick);
button.addEventListener('click', () => {
                                       const div = document.createElement('div');
                                       div.style.height = "4rem";
                                       div.style.width = "5rem";
                                       div.style.backgroundColor = "red";
                                       const text = document.createElement('h1');
                                       text.innerHTML = 'IT WORKS!';
                                       text.style.color = "magenta";
                                       document.body.appendChild(div);
                                       document.body.appendChild(text);
                                    });

button.style.color = "green";

console.log('heeeeello!');