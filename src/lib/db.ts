import { neon } from '@neondatabase/serverless';

// Initialize Neon database connection
export const sql = neon(process.env.DATABASE_URL!);

// Database schema setup
export async function initializeDatabase() {
  try {
    // Create users table with RBAC
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'client')),
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create service_requests table
    await sql`
      CREATE TABLE IF NOT EXISTS service_requests (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        service_type VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'in_progress', 'completed', 'rejected')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // No automatic user creation - users will be created manually in Neon console

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// User authentication functions
export async function authenticateUser(email: string, password: string) {
  try {
    const bcrypt = require('bcryptjs');
    
    const user = await sql`
      SELECT id, email, password_hash, role, name 
      FROM users 
      WHERE email = ${email}
    `;

    if (user.length === 0) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user[0].password_hash);
    
    if (!isValidPassword) {
      return null;
    }

    return {
      id: user[0].id,
      email: user[0].email,
      role: user[0].role,
      name: user[0].name
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function getUserById(id: number) {
  try {
    const user = await sql`
      SELECT id, email, role, name, created_at
      FROM users 
      WHERE id = ${id}
    `;

    return user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
