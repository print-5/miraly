import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

async function fixAdminAccount() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db();
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@miralyfoods.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    // Find admin user
    const adminUser = await db.collection('user').findOne({ 
      email: adminEmail,
      role: 'admin' 
    });

    if (!adminUser) {
      console.log('❌ Admin user not found!');
      return;
    }

    console.log('👤 Found admin user:');
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   _id: ${adminUser._id}`);
    console.log('');

    // Update user to have an id field if missing
    if (!adminUser.id) {
      const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      await db.collection('user').updateOne(
        { _id: adminUser._id },
        { 
          $set: { 
            id: userId,
            updatedAt: new Date()
          } 
        }
      );
      adminUser.id = userId;
      console.log('✅ Added id field to user');
    }

    // Check if account exists
    const existingAccount = await db.collection('account').findOne({
      userId: adminUser.id
    });

    if (existingAccount) {
      console.log('✅ Account already exists, updating email...');
      await db.collection('account').updateOne(
        { userId: adminUser.id },
        {
          $set: {
            accountId: adminEmail,
            updatedAt: new Date()
          }
        }
      );
      console.log('✅ Account email updated!');
    } else {
      console.log('📝 Creating new account record...');
      
      // Hash password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      // Create account
      const account = {
        id: `account_${Date.now()}_${Math.random().toString(36).substring(2)}`,
        userId: adminUser.id,
        accountId: adminEmail,
        providerId: 'email',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await db.collection('account').insertOne(account);
      console.log('✅ Account created successfully!');
    }

    console.log('\n✅ Admin account is now ready!');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Disconnected from MongoDB\n');
  }
}

fixAdminAccount();
