const { client } = require('./index');

// Define the getAllUsers function
async function getAllUsers() {
  try {
    // Query to retrieve all users goes here
  } catch (error) {
    throw error; 
  }
}

async function testDB() {
  try {
    await client.connect();

    const users = await getAllUsers();
    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

async function dropTables() {
  try {
    await client.query(`
      // Query to drop tables goes here
    `);
  } catch (error) {
    throw error; 
  }
}

async function createTables() {
  try {
    await client.query(`
      // Query to create tables goes here
    `);
  } catch (error) {
    throw error; 
  }
}

async function rebuildDB() {
  try {
    await client.connect();

    await dropTables();
    await createTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}


testDB();
rebuildDB();
