import { PrismaClient } from '@prisma/client';

/**
 * This function creates a new instance of PrismaClient and returns it.
 * @returns {PrismaClient} A new PrismaClient instance.
 */
const prismaClientSingleton = () => {
  return new PrismaClient();
};

/**
 * This is a declaration for the globalThis object. It is extended to include a prismaGlobal property.
 * prismaGlobal is of the type that is returned by the prismaClientSingleton function.
 */
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

/**
 * This constant is either the existing prismaGlobal on the globalThis object or a new PrismaClient instance.
 * It is used to ensure that only one instance of PrismaClient exists in the application.
 */
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

/**
 * If the application is not in production mode, the prismaGlobal property on the globalThis object is set to the prisma constant.
 * This ensures that the same PrismaClient instance is used throughout the application.
 */
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
