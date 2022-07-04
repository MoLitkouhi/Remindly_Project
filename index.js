const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

const reminderController = require('./controller/reminder_controller');

// Basic Server
app.use(express.static(__dirname + '/public'));

// Configuring express-Layouts
app.use(ejsLayouts);

// We need an extention regarding Express to give the ability getting data from browser.
app.use(express.urlencoded({ extended: false }));

// For using the advanced version we need to set uo the ejs
app.set('view engine', 'ejs');

// Case 1: User goes to localhost:8080/ ----> Homepage.
app.get('/', (req, res) => {
  // In this function you can have your logic like talk to the db then send the result to the
  // browser through the below method.
  /* To avoid a code with tons of logic it's better to write our callback function inside an external
    folder then import that here */
  let logic = '2*2 =' + 2 * 2;
  res.send('Welcome to your HomePage.' + logic);
});

// Case 2: User goes to localhost:8080/reminder ----> shows a list of reminders.
app.get('/reminder', reminderController.reminder_list);

// Case 3: User wants to create a NEW reminder goes to ocalhost:8080/reminder/new
// ----> shows a CREATE REMINDER PAGE.
app.get('/reminder/new', reminderController.create_page);

// Case 4: User will send new reminder data to us(POST)
app.post('/reminder', reminderController.create);

// Case 5: User wants to see each reminder individually.
app.get('/reminder/:id', reminderController.listOne);

// Case 6: User wants to EDIT an individuale reminder.
app.get('/reminder/:id/edit', reminderController.edit_page);

// Case 7: User clicks UPDATE BUTTON from case 6, and expects their reminder to be updated.
app.post('/reminder/edit/:id', reminderController.update);

// Case 8: User clicks DELETE btn and expect thr reminder to be deleted.
app.post('/reminder/delete/:id', reminderController.delete);

app.listen(port);
