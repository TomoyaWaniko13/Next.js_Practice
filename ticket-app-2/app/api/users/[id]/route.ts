import prisma from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '@/ValidationSchemas/users';

/**
 * Interface for the properties of the request.
 * @interface
 * @property {object} params - The parameters of the request.
 * @property {string} params.id - The id of the user.
 */
interface Props {
  params: { id: string };
}

/**
 * Handles the PATCH request to update a user.
 * @async
 * @function
 * @param {NextRequest} request - The request object.
 * @param {Props} { params } - The properties of the request.
 * @returns {NextResponse} The response object.
 */
export async function PATCH(request: NextRequest, { params }: Props) {
  // Parse the request body
  const body = await request.json();
  // Validate the request body against the user schema
  const validation = userSchema.safeParse(body);

  // If validation fails, return a 400 status with the validation error
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Find the user in the database
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  // If the user is not found, return a 404 status
  if (!user) {
    return NextResponse.json({ error: 'user not found' }, { status: 404 });
  }

  // If a new password is provided, hash it
  if (body?.password) {
    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;
  }

  // If the username is changed, check for duplicates
  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: { username: body.username },
    });
    // If a duplicate username is found, return a 409 status
    if (duplicateUsername) {
      return NextResponse.json({ message: 'Duplicate username' }, { status: 409 });
    }
  }

  // Update the user in the database
  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: { ...body },
  });

  // Return the updated user
  return NextResponse.json(updateUser);
}
