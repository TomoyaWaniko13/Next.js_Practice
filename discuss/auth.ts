import NextAuth from 'next-auth';
import GitHub from '@auth/core/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@auth/db';

// TODO restart from this part.
