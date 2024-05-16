import { PrismaClient } from '@prisma/client';
import UserForm from '@/components/UserForm';
const prisma = new PrismaClient();

interface Props {
  params: { id: string };
}

const EditUserPage = async ({ params }: Props) => {
  // https://www.prisma.io/docs/orm/reference/prisma-client-reference#findunique
  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
    },
  });

  if (!user) {
    return <p className={'text-destructive'}>user not found.</p>;
  }

  user.password = '';
  return <UserForm user={user} />;
};

export default EditUserPage;
