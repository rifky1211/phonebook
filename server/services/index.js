const firebase = require("firebase");

const getContact = () => {
  const userReference = firebase.database().ref("/Contacts/");
  return (new Promise((resolve, reject)=>{
    userReference.on("value", function(snapshot) {
      const folders = snapshot.val();
      if (folders === null) {
        resolve([]);
      }else{
        const data = Object.keys(folders).map(o => Object.assign({ id: o }, folders[o]));
        resolve(data);
      }
      userReference.off("value");
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.code);
      reject("The read failed: " + errorObject.code);
    });
  }));
}

//Create new instance
const createContact = (user) => {
  const referencePath = `/Contacts/${user.id}/`;
  const userReference = firebase.database().ref(referencePath);
  return (new Promise((resolve, reject) => {
    userReference.set({name: user.name, phone: user.phone}, (error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        resolve(user);
      }
    });
  }));
}

//Update existing instance
const updateContact = (user) => {
  var referencePath = `/Contacts/${user.id}/`;
  var userReference = firebase.database().ref(referencePath);
  return (new Promise((resolve, reject) => {
    userReference.update({name: user.name, phone: user.phone}, (error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        resolve(user);
      }
    });
  }));
}

//Delete an instance
const deletecontact = (user) => {
  var referencePath = `/Contacts/${user.id}/`;
  var userReference = firebase.database().ref(referencePath);
  return (new Promise((resolve, reject) => {
    userReference.remove((error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        resolve(user);
      }
    })
  }));
}

module.exports = {getContact, createContact, updateContact, deletecontact}