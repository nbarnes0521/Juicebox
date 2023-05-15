const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/juicebox-dev');


// CREATE USER ////////////
async function createUser({ 
    username, 
    password,
    name,
    location
  }) {
    try {
      const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password, name, location) 
        VALUES($1, $2, $3, $4) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `, [username, password, name, location]);
  
      return user;
    } catch (error) {
      throw error;
    }
}

// GET ALL USERS /////////////
  async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username, name, location, active
      FROM users;
    `);
  
    return rows;
  }

// UPDATE USERS ////////////
async function updateUser(id, fields = {}) {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(', ');
  
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [user] } = await client.query(
        `
        UPDATE users
        SET ${setString}
        WHERE id=$${Object.values(fields).length + 1}
        RETURNING *;
        `,
        [...Object.values(fields), id]
      );
  
      return user;
    } catch (error) {
      throw error;
    }
  }

// CREATE POST ////////
async function createPost({
    authorId,
    title,
    content
  }) {
    try {
  
    } catch (error) {
      throw error;
    }
  }

// UPDATE POST ///////
async function updatePost(id, fields = {}) {
  try {

  } catch (error) {
    throw error;
  }
}

// GET ALL POSTS ///////
async function getAllPosts() {
    try {
  
    } catch (error) {
      throw error;
    }
  }

// GET POST BY USER //////
async function getPostsByUser(userId) {
    try {
      const { rows } = await client.query(`
        SELECT * FROM posts
        WHERE "authorId"=$1;
      `, [userId]);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

// GET USER BY ID ////////
async function getUserById(userId) {
    try {
      // First, get the user by their userId
      const { rows: [user] } = await client.query(
        `
        SELECT id, username, name, location
        FROM users
        WHERE id = $1;
        `,
        [userId]
      );
  
      // If the user doesn't exist, return null
      if (!user) {
        return null;
      }
  
      // Delete the 'password' key from the user object
      delete user.password;
  
      // Get the posts for the user using the getPostsByUser function
      const posts = await getPostsByUser(userId);
  
      // Add the posts to the user object with the key 'posts'
      user.posts = posts;
  
      // Return the user object
      return user;
    } catch (error) {
      throw error;
    }
  }
  


  module.exports = {
    client,
    getAllUsers,
    createUser,
    updateUser,
    createPost,
    updatePost,
    getAllPosts,
    getPostsByUser,
    getUserById
  };

  // npm run seed:dev (To run)