const displayScreen = document.getElementById('display-user');

// displayScreen.style.display = 'flex';
displayScreen.style.width = "70%";
displayScreen.style.height = "50vh";
displayScreen.style.backgroundColor = "white";
displayScreen.style.margin = "auto";
// displayScreen.style. = "black";       
displayScreen.style.borderRadius = "20px";
displayScreen.style.boxShadow = "20px";



// let userAvatar = document.createElement('div');
// userAvatar.id = 'avatar';

// displayScreen.appendChild(userAvatar);

// let avatar = document.getElementById('avatar')
// avatar.style.width = '300px'
// avatar.style.height = '300px';
// avatar.style.backgroundColor = 'white'
// avatar.style.borderRadius = '100%'



const form = document.getElementById('form');

form.addEventListener('submit', submitInput);

function submitInput(e) {
    e.preventDefault();

    const searchInput = document.getElementById('input').value;

    fetch("https://api.github.com/search/users?q=" + searchInput)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.items[0]);

            if (data.items.length === 0){
                document.getElementById('avatar-box').innerHTML = "";
                document.getElementById('username').innerHTML = "No user found";
                document.getElementById('followers').innerHTML = "0";
                document.getElementById('following').innerHTML = "0";
                document.getElementById('repos').innerHTML = "0";
            } else{

                
                // Avatar
                const avatarUrl = data.items[0].avatar_url;
                // login
                const user = data.items[0].login;

            // count the number of following
            const followingCount = data.items[0].following_url.length;

            // Count the number of followers
            const followerCount = data.items[0].followers_url.length; 
            // console.log("Number of followers:", followerCount);

            // count repos 
            const reposCount = data.items[0].repos_url.length;

            
            // add user link to the image 
            document.getElementById('avatar-box').innerHTML = `<a target="_blank" href="https://www.github.com/${searchInput}"> <img src="${avatarUrl}"/> </a>`;
            
            // add user link to the username  
            document.getElementById('username').innerHTML = `<a target="_blank" href="https://www.github.com/${searchInput}"> ${user}`;
            
            // view followers number 
            document.getElementById('followers').innerHTML = `${followerCount}`;

            // view following numbers 
            document.getElementById('following').innerHTML = `${followingCount}`;
            
            // view repos count 
            document.getElementById('repos').innerHTML = `${reposCount}`;
               
        }  
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}
