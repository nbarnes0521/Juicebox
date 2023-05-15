const {
    client,
    getAllUsers,
    createUser,
    updateUser,
    createPost,
    updatePost,
    getAllPosts,
    getPostsByUser,
    getUserById
  } = require('./index');


// DROP TABLES ///////////
async function dropTables() {
    try {
      console.log("Starting to drop tables...");
  
      await client.query(`
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
      `);
  
      console.log("Finished dropping tables!");
    } catch (error) {
      console.error("Error dropping tables!");
      throw error;
    }
  }
  

// CREATE TABLES ////////
  async function createTables() {
    try {
      console.log("Starting to build tables...");
  
      await client.query(`
        CREATE TABLE posts (
          id SERIAL PRIMARY KEY,
          "authorId" INTEGER REFERENCES users(id) NOT NULL,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          active BOOLEAN DEFAULT true
        );
      `);
  
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }
  
// CREATE INITIAL USERS /////////
  async function createInitialUsers() {

    try {
        
      console.log("Starting to create users...");
  
      const albert = await createUser({ username: 'albert', password: 'bertie99', name: 'Albert', location: 'Albany'});

      const sandra = await createUser({ username: 'sandra', password: 'sandra123', name: 'Sandra', location: 'San Antonio'});

      const glamgal = await createUser({ username: 'glamgal', password: 'glamgal123', name: 'Glam', location: 'Glamazon'});
  
      console.log(albert);
  
      console.log("Finished creating users!");
    } catch(error) {
      console.error("Error creating users!");
      throw error;
    }
  }

// CREATE INITIAL POSTS /////////
async function createInitialPosts() {
    try {
      const [albert, sandra, glamgal] = await getAllUsers();
  
      await createPost({
        authorId: albert.id,
        title: "First Post",
        content: "This is my first post. I hope I love writing blogs as much as I love writing them."
      });
  
      // Add more createPost calls for additional initial posts
  
      console.log("Finished creating initial posts!");
    } catch (error) {
      console.error("Error creating initial posts!");
      throw error;
    }
  }
  

// REBUILD DB //////////
async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
      await createInitialPosts();
    } catch (error) {
      throw error;
    }
  }
  

// TEST DB ////////
async function testDB() {
    try {
      console.log("Starting to test database...");
  
      console.log("Calling getAllUsers");
      const users = await getAllUsers();
      console.log("Result:", users);
  
      console.log("Calling updateUser on users[0]");
      const updateUserResult = await updateUser(users[0].id, {
        name: "Newname Sogood",
        location: "Lesterville, KY"
      });
      console.log("Result:", updateUserResult);
  
      console.log("Calling getAllPosts");
      const posts = await getAllPosts();
      console.log("Result:", posts);
  
      console.log("Calling updatePost on posts[0]");
      const updatePostResult = await updatePost(posts[0].id, {
        title: "New Title",
        content: "Updated Content"
      });
      console.log("Result:", updatePostResult);
  
      console.log("Calling getUserById with 1");
      const albert = await getUserById(1);
      console.log("Result:", albert);
  
      console.log("Finished database tests!");
    } catch (error) {
      console.log("Error during testDB");
      throw error;
    }
  }



  rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
