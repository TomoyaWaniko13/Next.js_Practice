'use client';

const CourseForm = () => {
  const onSubmit = () => {
    console.log('hello world!');
  };
  return (
    <form onSubmit={onSubmit}>
      <input type='text' name={'name'} className={'border'} />
      <button type={'submit'}>Submit</button>
    </form>
  );
};

export default CourseForm;
