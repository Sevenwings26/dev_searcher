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

            // Avatar
            const avatarUrl = data.items[0].avatar_url;
            // login
            const user = data.items[0].login;
            // followers
            const followerCount = data.items[0].followers;
            // following
            const followingCount = data.items[0].following;


            // add link to the image 
            document.getElementById('avatar-box').innerHTML = `<a target="_blank" href="https://www.github.com/${searchInput}"> <img src="${avatarUrl}"/> </a>`;

            // add link to the username also 
            document.getElementById('username').innerHTML = `<a target="_blank" href="https://www.github.com/${searchInput}"> ${user}`;

            document.getElementById('followers').innerHTML = `${followerCount}`;

            document.getElementById('following').innerHTML = `${followingCount}`;
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}
