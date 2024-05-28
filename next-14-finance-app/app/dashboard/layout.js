import PageHeader from '@/components/page-header';

export default function Layout({ children }) {
  return (
    <>
      <PageHeader className={'my-8'} />
      {children}
      <footer>Footer</footer>
    </>
  );
}
