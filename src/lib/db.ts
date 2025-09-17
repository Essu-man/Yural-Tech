import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

interface User {
  id: number;
  email: string;
  password_hash: string;
  role: 'admin' | 'client';
  name: string;
  created_at?: string;
}

// Initialize Neon database connection
let sql: ReturnType<typeof neon> | null = null;

export function getSql() {
  if (!sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    sql = neon(process.env.DATABASE_URL);
  }
  return sql;
}

// Database schema setup
export async function initializeDatabase() {
  try {
    // Create users table with RBAC
    await getSql()`
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
    await getSql()`
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
    
    const users = await getSql()`
      SELECT id, email, password_hash, role, name 
      FROM users 
      WHERE email = ${email}
    `;

    if (!users || (Array.isArray(users) && users.length === 0)) {
      return null;
    }

    const user = Array.isArray(users) ? users[0] as User : users as unknown as User;
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function getUserById(id: number) {
  try {
    const users = await getSql()`
      SELECT id, email, role, name, created_at
      FROM users 
      WHERE id = ${id}
    `;

    if (!users || (Array.isArray(users) && users.length === 0)) {
      return null;
    }

    return Array.isArray(users) ? users[0] as User : users as unknown as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
