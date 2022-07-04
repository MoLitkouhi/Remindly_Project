const Database = require('../database');

/* 
  First way to create a dynamic id;
  let dyId = 0;
*/

let reminderController = {
  reminder_list: (req, res) => {
    // Due to using ejs we have access to the res.render() function;
    // res.send("That's a new feature of Node.");

    // render method will get the related file and send it to the browser.
    res.render('reminder/index', { reminders: Database.cindy.reminders });
  },
  create_page: (req, res) => {
    res.render('reminder/create');
  },

  /* 
    By create function we will extract all data was sending from the user(browser);
  */
  create: (req, res) => {
    let reminder = {
      /* 
        First way od=f dynamic id:
        id: dyId++ 
      */
      // Second way of create a dynamic ID;
      id: Database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };

    // The next step is adding data to our database(db);
    Database.cindy.reminders.push(reminder);
    // Now we want user to see the list of reminders.
    res.redirect('/reminder');
  },

  // listOne function will show each reminder individually.
  /*
  req.params will return parameters in the matched route. 
  If your route is /user/:id and you make a request to /user/5 - req.params would yield {id: "5"}
  */
  listOne: (req, res) => {
    let idToFind = req.params.id;
    let searchResult = Database.cindy.reminders.find((item) => {
      return item.id == idToFind;
    });
    if (searchResult != undefined) {
      res.render('reminder/single-reminder', { reminderItem: searchResult });
    } else {
      // res.render('reminder/index', { reminders: Database.cindy.reminders });
      res.redirect('/reminder');
    }
  },

  // EIDT function for updating data
  edit_page: (req, res) => {
    res.render('reminder/edit');
  },

  // Update
  update: (req, res) => {
    let updatedInfo = {
      // Server will collect all updated info and send it to db
      id: req.cindy.reminders.id,
      title: req.body.title,
      description: req.body.description,
      completed: true,
    };

    // In this step updated data should be saved in db
    Database.cindy.reminders.replace(updatedInfo);
    res.redirect('/reminder');
  },

  // Delete
  delete: (res, req) => {},
};

module.exports = reminderController;
