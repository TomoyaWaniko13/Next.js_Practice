import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '@/ValidationSchemas/userSchema';
import prisma from '@/prisma/db';
import bcrypt from 'bcryptjs';

interface Props {
  params: { id: string };
}

// handle a request from a UserForm.tsx file
export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();

  const validation = userSchema.safeParse(body);

  // 400 Bad Request
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  // 404 Not Found
  if (!user) {
    return NextResponse.json({ error: 'user not found' }, { status: 404 });
  }

  if (body?.password && body.password !== '') {
    body.password = await bcrypt.hash(body.password, 10);
  } else {
    // The delete operator is used to remove the password property from the body object
    // This ensures that the password is not updated to an empty value in the database
    delete body.password;
  }

  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: { username: body.username },
    });
    // 409 Conflict
    if (duplicateUsername) {
      return NextResponse.json({ message: 'duplicate username' }, { status: 409 });
    }
  }

  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updateUser);
}
