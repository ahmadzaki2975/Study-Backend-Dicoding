const fs = require('fs');

fs.readFile('./FileSystem/Todo.txt', 'UTF-8', (data, error) => {
  if(error) {
    console.error(error);
  } else {
    console.log(data);
  }
})