const firebase = require("firebase");

const getContact = (limit, offset, name, phone) => {
  const userReference = firebase.database().ref("/Contacts/");
  return new Promise((resolve, reject) => {
    userReference.on(
      "value",
      function (snapshot) {
        const folders = snapshot.val();
        if (folders === null) {
          resolve([]);
        } else {
          let data = Object.keys(folders).map((o) =>
            Object.assign({ id: o }, folders[o])
          );
          data = data.filter((item) => {
            if (name && phone) {
              return item.name.includes(name) && item.phone.includes(phone);
            } else if (name) {
              return item.name.includes(name);
            } else if (phone) {
              return item.phone.includes(phone);
            } else {
              return item;
            }
          });
          console.log("data sebelum di slice",data)
          data = data.slice(offset, offset + limit)
          console.log("data se", data, offset, limit, name, phone)
          resolve(data);
        }
        userReference.off("value");
      },
      (errorObject) => {
        console.log("The read failed: " + errorObject.code);
        reject("The read failed: " + errorObject.code);
      }
    );
  });
};

const totalData = (name, phone) => {
  const userReference = firebase.database().ref("/Contacts/");
  return new Promise((resolve, reject) => {
    userReference.on(
      "value",
      function (snapshot) {
        const folders = snapshot.val();
        if (folders === null) {
          resolve([]);
        } else {
          let data = Object.keys(folders).map((o) =>
            Object.assign({ id: o }, folders[o])
          );

          data = data.filter((item) => {
            if (name && phone) {
              return item.name.includes(name) && item.phone.includes(phone);
            } else if (name) {
              return item.name.includes(name);
            } else if (phone) {
              return item.phone.includes(phone);
            } else {
              return item;
            }
          });
          resolve(data.length);
        }
        userReference.off("value");
      },
      (errorObject) => {
        console.log("The read failed: " + errorObject.code);
        reject("The read failed: " + errorObject.code);
      }
    );
  });
};

//Create new instance
const createContact = (user) => {
  const referencePath = `/Contacts/${user.id}/`;
  const userReference = firebase.database().ref(referencePath);
  return new Promise((resolve, reject) => {
    userReference.set({ name: user.name, phone: user.phone }, (error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        resolve(user);
      }
    });
  });
};

//Update existing instance
const updateContact = (user) => {
  var referencePath = `/Contacts/${user.id}/`;
  var userReference = firebase.database().ref(referencePath);
  return new Promise((resolve, reject) => {
    userReference.update({ name: user.name, phone: user.phone }, (error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        resolve(user);
      }
    });
  });
};

//Delete an instance
const deletecontact = (user) => {
  var referencePath = `/Contacts/${user.id}/`;
  var userReference = firebase.database().ref(referencePath);
  return new Promise((resolve, reject) => {
    userReference.remove((error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        resolve(user);
      }
    });
  });
};

module.exports = {
  getContact,
  createContact,
  updateContact,
  deletecontact,
  totalData,
};
