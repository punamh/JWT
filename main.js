document.querySelector("#login").addEventListener("click", function () {
  postData();
});
async function postData() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let obj = {
    username,
    password
  }
  try {
    let response = await fetch(`https://json-with-auth.onrender.com/user/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let data = await response.json();
    // console.log(data);
    fetchData(data.accessToken, data.user.id);

    if (data.accessToken) {
      alert(`hey ${data.user.username} Welcome Back!`);
    }
  } catch (error) {
    console.log(error);
  }
}
async function fetchData(accessToken,id){
    try {
        let response = await fetch(`https://json-with-auth.onrender.com/todos?userId=${id}`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                "Authorization":`Bearer ${accessToken}`
            }
        })
        let data = await response.json()
       console.log(data)
       displayData(data);
       
    } catch (error) {
        console.log(error)
    }
}
let main = document.querySelector('#container');

function displayData(arr){
  arr.forEach((ele)=>{
    let div = document.createElement('div');

    let completed = document.createElement('h3')
    completed.innerText= ele.completed;

    let createdAt = document.createElement('h5')
    createdAt.innerText= ele.createdAt;

    let id = document.createElement('h5')
    id.innerText= ele.id;

    let title = document.createElement('h1')
    title.innerText= ele.title;

    let userId = document.createElement('p')
    userId.innerText = ele.userId;

    let checkbox = document.createElement('input'); // Create a checkbox
    checkbox.type = 'checkbox'; // Set the type of the input to checkbox
    checkbox.checked = ele.completed; // Set the initial checked status based on the todo item completion status
    checkbox.addEventListener('change', () => toggleCompletion(ele.id, checkbox.checked));

    div.append(id,title,userId,createdAt,completed,checkbox)
    main.append(div);
  })
}

async function toggleCompletion(todoId, isCompleted) {
  try {
    let response = await fetch(`https://json-with-auth.onrender.com/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ completed: isCompleted }), // Send the updated completion status
    });
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
