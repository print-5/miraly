/**
 * Database Indexes Setup Script
 * Run this once to add performance indexes to your MongoDB collections
 * 
 * Usage: node src/scripts/add-indexes.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sai-nandhini";

async function addIndexes() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    const db = mongoose.connection.db;

    // Product indexes
    console.log('\nAdding Product indexes...');
    await db.collection('products').createIndex({ category: 1, isActive: 1 });
    await db.collection('products').createIndex({ isActive: 1, createdAt: -1 });
    await db.collection('products').createIndex({ slug: 1 }, { unique: true });
    await db.collection('products').createIndex({ stock: 1 });
    await db.collection('products').createIndex({ 'variants.stock': 1 });
    console.log('✓ Product indexes added');

    // Order indexes
    console.log('\nAdding Order indexes...');
    await db.collection('orders').createIndex({ user: 1, createdAt: -1 });
    await db.collection('orders').createIndex({ status: 1, createdAt: -1 });
    await db.collection('orders').createIndex({ createdAt: -1 });
    await db.collection('orders').createIndex({ isPaid: 1 });
    await db.collection('orders').createIndex({ isDelivered: 1 });
    console.log('✓ Order indexes added');

    // Category indexes
    console.log('\nAdding Category indexes...');
    await db.collection('categories').createIndex({ isActive: 1, order: 1 });
    await db.collection('categories').createIndex({ name: 1 }, { unique: true });
    console.log('✓ Category indexes added');

    // User indexes
    console.log('\nAdding User indexes...');
    await db.collection('users').createIndex({ email: 1 }, { unique: true, sparse: true });
    await db.collection('users').createIndex({ phone: 1 }, { unique: true, sparse: true });
    await db.collection('users').createIndex({ role: 1 });
    console.log('✓ User indexes added');

    // Coupon indexes
    console.log('\nAdding Coupon indexes...');
    await db.collection('coupons').createIndex({ code: 1 }, { unique: true });
    await db.collection('coupons').createIndex({ isActive: 1, validFrom: 1, validUntil: 1 });
    console.log('✓ Coupon indexes added');

    // HeroSlide indexes
    console.log('\nAdding HeroSlide indexes...');
    await db.collection('heroslides').createIndex({ isActive: 1, order: 1 });
    console.log('✓ HeroSlide indexes added');

    console.log('\n✅ All indexes added successfully!');
    console.log('\nYou can verify indexes in MongoDB with:');
    console.log('  db.products.getIndexes()');
    console.log('  db.orders.getIndexes()');
    console.log('  etc.');

  } catch (error) {
    console.error('❌ Error adding indexes:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

addIndexes();
