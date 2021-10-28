
const controller = new AbortController();
const { watch } = require('fs/promises');
let filename = "./"

const { signal } = controller;
//after 10 min watcher stops watching
setTimeout(() => controller.abort(), 600000);

const event = async () => {
  try {
    const watcher = watch(filename, 
        { 
          signal 
        });
    for await (const event of watcher)
        console.log(`Console says: '${event.eventType}' in ${event.filename}`);
    } catch (error) {
        if (error.name === 'AbortError'){
          console.log("Programm has ben stopped");
          return;
      }
    throw err;
  }
};

event();