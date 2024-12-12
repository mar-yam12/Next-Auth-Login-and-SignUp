// import { createUserWithAccount, getUserByEmail } from "@/utils/user"; // Import user-related utilities
// import bcrypt from 'bcryptjs'; // Import bcryptjs instead of bcrypt
// import { NextResponse } from "next/server";

// export const POST = async (req, res) => {
//     try {
//         const { name, email, password } = await req.json();

//         // Check if the email already exists in the database
//         const existingUser = await getUserByEmail(email);
//         if (existingUser) {
//             return NextResponse.json({
//                 message: "Email is already in use.",
//             }, { status: 400 });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10); // Salt round of 10

//         // Create the new user if the email doesn't exist
//         const newUser = await createUserWithAccount({
//             name,
//             email,
//             password: hashedPassword, // Use the hashed password
//         });

//         return NextResponse.json({
//             message: "User created",
//             data: {
//                 ...newUser
//             }
//         }, { status: 201 })

//     } catch (err) {
//         return NextResponse.json({
//             message: "Error",
//             err
//         }, { status: 500 });
//     }
// }

import { createUserWithAccount, getUserByEmail } from "@/utils/user"; // Ensure these utilities are correctly implemented
import bcrypt from "bcryptjs"; // Use bcryptjs for password hashing
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json(); // Parse the request body
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        // Check if the email already exists in the database
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { message: "Email is already in use." },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds set to 10

        // Create the new user
        const newUser = await createUserWithAccount({
            name,
            email,
            password: hashedPassword, // Store the hashed password
        });

        return NextResponse.json(
            {
                message: "User created successfully.",
                data: { id: newUser.id, name: newUser.name, email: newUser.email },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in user creation:", error); // Log the error for debugging

        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
};
