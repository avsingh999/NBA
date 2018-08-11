import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDfncbCctzLKtY1hAjy0edoRH-DU-hUtsE",
    authDomain: "nba-react-53068.firebaseapp.com",
    databaseURL: "https://nba-react-53068.firebaseio.com",
    projectId: "nba-react-53068",
    storageBucket: "nba-react-53068.appspot.com",
    messagingSenderId: "658203184231"
  };
firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaselooper = (snapshot) => {

    const data = [];
    // console.log(snapshot.val())

    snapshot.forEach((childSnapshot)=> {
        // console.log("&&&&&&&&&&&7")
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    });
    return data
}

firebaseArticles.once('value')
.then((snapshot)=>{
    // const articles = firebaselooper(snapshot);
    console.log(snapshot.val())

})

export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaselooper
}