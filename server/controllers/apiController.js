var firebase = require("firebase");

module.exports = {
  getContact: (req, res) => {
    const userReference = firebase.database().ref("/Contacts/");
    //Attach an asynchronous callback to read the data
    userReference.on(
      "value",
      function (snapshot) {
        const data = Object.keys(snapshot.val()).map(o => Object.assign({ id: o }, snapshot.val()[o]));
        const realData = Object.keys(data).map(o => Object.assign({ total: data.length }, data[o]));
        res.json({realData});
        userReference.off("value");
      }
    );
  },
  createContact: (req, res) => {
    const id = Date.now();
    const name = req.body.name;
    const phone = req.body.phone;
  
    const referencePath = '/Contacts/'+id+'/';
    const userReference = firebase.database().ref(referencePath);
    userReference.set({name, phone}, function(error) {
      if (error) {
        res.send("Data could not be saved." + error);
      } else {
        res.send("Data saved successfully.");
      }
    });
  },
  updateContact: (req, res) => {
    const id = req.params.id
    const name = req.body.name;
    const phone = req.body.phone;
  
  
    var referencePath = '/Contacts/'+id+'/';
    var userReference = firebase.database().ref(referencePath);
    userReference.update({name, phone}, function(error) {
      if (error) {
        res.send("Data could not be updated." + error);
      } else {
        res.send("Data updated successfully.");
      }
    });
  },
  deleteContact: (req, res) => {
    var id = req.params.id;
    var referencePath = '/Contacts/'+id+'/';
    var userReference = firebase.database().ref(referencePath);
    userReference.remove((error)=>{
      if (error) {
        res.send("Data could not be deleted." + error);
      } else {
        res.send("Data deleted successfully.");
      }
    })
  }
};
