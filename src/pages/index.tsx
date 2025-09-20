import { Intro, IntroPath } from '@pages/Intro';
import { Root, RootPath } from '@pages/Root';
import { Soon, SoonPath } from '@pages/Soon';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';
// styles
import './index.css';

const appRouter = createHashRouter([
  {
    path: RootPath,
    element: <Root />,
  },
  {
    path: IntroPath,
    element: <Intro />,
  },
  {
    path: SoonPath,
    element: <Soon />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
);
