import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const SpecificCourse = ({ params }: Props) => {
  console.log(params.id);

  // The parseInt() function parses a string argument and returns
  // an integer of the specified radix (the base in mathematical numeral systems).
  // The conditional statement is checking if the id parameter from params is not a valid integer.
  if (!parseInt(params.id)) {
    notFound();
  }

  return <div>Specific course {params.id}</div>;
};

export default SpecificCourse;
