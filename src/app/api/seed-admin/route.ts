import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { client } from "@/lib/mongodb-client";
import { hash } from "bcryptjs";

export async function POST() {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@miralyfoods.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    const db = client.db();
    const usersCollection = db.collection("user");
    const accountsCollection = db.collection("account");

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      // Update existing user to admin role
      await usersCollection.updateOne(
        { email: adminEmail },
        { 
          $set: { 
            role: "admin",
            phone: "9876543210",
            address: "Admin Office, Chennai",
            updatedAt: new Date()
          } 
        }
      );

      return NextResponse.json({
        success: true,
        message: "Admin user role updated successfully!",
        admin: {
          email: adminEmail,
          name: existingAdmin.name,
          role: "admin"
        }
      });
    }

    // Create new admin user
    const hashedPassword = await hash(adminPassword, 12);
    
    const adminUserId = `user_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    
    const adminUser = {
      id: adminUserId,
      email: adminEmail,
      name: "Admin User",
      emailVerified: true,
      image: null,
      role: "admin",
      phone: "9876543210",
      address: "Admin Office, Chennai",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Create account record for Better Auth email provider
    const account = {
      id: `account_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      userId: adminUserId,
      accountId: adminEmail,
      providerId: "email",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await usersCollection.insertOne(adminUser);
    await accountsCollection.insertOne(account);

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully!",
      admin: {
        email: adminEmail,
        name: "Admin User",
        role: "admin"
      },
      credentials: {
        email: adminEmail,
        password: adminPassword
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to create admin: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const db = client.db();
    const adminUsers = await db.collection("user").find({ role: "admin" }).toArray();
    
    return NextResponse.json({
      success: true,
      admins: adminUsers.map((user: any) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
      }))
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to fetch admin users: ${error.message}` },
      { status: 500 }
    );
  }
}