// saving globals for callbacks
var currentUser;
var currentUserPosts;
var currentUserAlbums;

function getUserByName(username) {
  return new Promise(function(resolve, reject) {
    $.get('http://jsonplaceholder.typicode.com/users?username=' + username, function(users) {
      if (users.length) {
        resolve(users[0]);

      } else {
        reject('Incorrect Login, Please Try Again.');
      }
    });
  })
}


function getPostsByUser(user) {
  return new Promise(function(resolve, reject) {
    $.get('http://jsonplaceholder.typicode.com/posts?userId=' + user.id, function(posts) {
        resolve(posts);
    });
  })
}


function getAlbumsByUser(user) {
  return new Promise(function(resolve, reject) {
    $.get('http://jsonplaceholder.typicode.com/albums?userId=' + user.id, function(albums) {
        resolve(albums);
    });
  })
}

// This is the beginning of Part 2 - not sure what you mean by a 'view'
// still not sure how to get the data out of this.
var handleEvent = function handleListItems(event){
   let myElement = this;
   let strIndex = this.getAttribute("id");
   let parent = this.parentElement;
   if (parent.getAttribute("id") === "posts") {
     let index = parseInt(strIndex);
     
     var htmlString = `
     <div id="newView">
         <h2>${currentUserPosts[index].title}</h2>
         <p>${currentUserPosts[index].body}</p>
     </div>`

     //$.{"body"}.append(htmlString);
    } else {
    }
}


function renderHomepage(username, posts, albums) {
  // show the name
  $('body').append(`<div><h1>Hello ${username}</h1></div>`);

  var div = document.querySelector('div');

  var h2Posts = document.createElement('h2');
  h2Posts.innerHTML = 'Here Is Your List Of Posts';
  div.append(h2Posts);

  var postsUl = document.createElement('ul');
  postsUl.setAttribute("id", "posts");
  div.append(postsUl);

  // show the user posts
  var postLi = null;
  if (posts.length) {
    for (let i = 0; i < posts.length; i++) {
      postLi = document.createElement('li');
      postLi.innerHTML = `${posts[i].title}`;
      postLi.setAttribute("id",`${i}`);
      postLi.onclick = handleEvent;
      postsUl.appendChild(postLi);
    }
  } else {
    postsUl.innerHTML = "You Have No Posts.";

  }

  var h2Albums = document.createElement('h2');
  h2Albums.innerHTML = 'Here Is Your List Of Albums';
  div.append(h2Albums);

  var albumsUl = document.createElement('ul');
  albumsUl.setAttribute("id", "albums");
  div.append(albumsUl);

  // show the user albums
  var albumLi = null;
  if (albums.length){
    for (let i = 0; i < albums.length; i++) {
      albumLi = document.createElement('li');
      albumLi.innerHTML = `${albums[i].title}`;
      albumLi.setAttribute("id",`${i}`);
      albumLi.onclick = handleEvent;
      albumsUl.appendChild(albumLi);
    }
  } else {
    albumsUl.innerHTML = "You Have No Albums";
  }
}


// if there is no username, this displays the reject response.
function handleError(err) {
  alert(err);
}


function userHomePage() {

  // retrieve the name, get the users object first,
  // validate it and if it is good, get all the rest
  // of the data and THEN render the page.
  let userName = document.getElementById('userName');
  getUserByName(userName.value)
     .catch(handleError)
     .then(user => { 
        currentUser = user;
        return (Promise.all([getPostsByUser(user), getAlbumsByUser(user)]) ) })
     .then( function(results){
        currentUserPosts = results[0];
        currentUserAlbums = results[1];
         renderHomepage(userName.value, results[0], results[1])
       }
      );
}

    // Ange did most if not all of the calls,functions, etc work and I did the driving, 
    // and helped out here and there. 
