#!/usr/bin/env node

/**
 * Create Admin User Using Better Auth API
 */

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

async function createAdminProper() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();

    // Create Better Auth instance
    const auth = betterAuth({
      database: mongodbAdapter(db, { client }),
      emailAndPassword: {
        enabled: true,
        autoSignIn: true,
      },
      user: {
        additionalFields: {
          role: {
            type: "string",
            required: false,
            defaultValue: "customer",
          },
          phone: {
            type: "string",
            required: false,
          },
          address: {
            type: "string",
            required: false,
          },
        },
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@miralyfoods.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Delete existing admin if exists
    await db.collection('user').deleteOne({ email: adminEmail });
    await db.collection('account').deleteMany({ accountId: adminEmail });
    console.log('🗑️ Cleaned up existing admin records');

    // Create admin user using Better Auth API
    const result = await auth.api.signUpEmail({
      body: {
        email: adminEmail,
        password: adminPassword,
        name: "Admin User",
      },
    });

    console.log('📋 Sign up result:', result);

    if (result.error) {
      console.error('❌ Error creating admin:', result.error);
      return;
    }

    console.log('✅ Admin user created via Better Auth API');

    // Update user role to admin
    await db.collection('user').updateOne(
      { email: adminEmail },
      { 
        $set: { 
          role: 'admin',
          phone: '9876543210',
          address: 'Admin Office, Chennai'
        } 
      }
    );

    console.log('✅ Updated user role to admin');

    // Verify the creation
    const user = await db.collection('user').findOne({ email: adminEmail });
    const account = await db.collection('account').findOne({ accountId: adminEmail });

    console.log('\n📋 Created User:');
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   ID: ${user.id}`);

    console.log('\n📋 Created Account:');
    console.log(`   Provider: ${account.providerId}`);
    console.log(`   Account ID: ${account.accountId}`);
    console.log(`   User ID: ${account.userId}`);

    console.log('\n🎉 Admin creation completed successfully!');
    console.log(`\n📝 Login credentials:`);
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

createAdminProper().catch(console.error);