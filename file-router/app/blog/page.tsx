function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

const blog = async () => {
  await sleep();
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' });
  console.log(await res.json());
  return (
    <div>
      <h1>blog {new Date().toLocaleString()}</h1>
    </div>
  );
};

export default blog;
