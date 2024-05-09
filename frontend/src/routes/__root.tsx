import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <NabBar />
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});

function NabBar() {
  return (
    <div className='p-2 flex gap-2'>
      <Link
        to='/'
        className='[&.active]:font-bold'>
        Home
      </Link>{' '}
      <Link
        to='/about'
        className='[&.active]:font-bold'>
        About
      </Link>
      <Link
        to='/expenses'
        className='[&.active]:font-bold'>
        Expenses
      </Link>
      <Link
        to='/create-expenses'
        className='[&.active]:font-bold'>
        Create
      </Link>
    </div>
  );
}
