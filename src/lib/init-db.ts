import { initializeDatabase } from './db';

// Initialize database when this module is imported
export async function initDatabase() {
  try {
    await initializeDatabase();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    throw error;
  }
}

// Auto-initialize on import (for development)
if (process.env.NODE_ENV === 'development') {
  initDatabase().catch(console.error);
}
