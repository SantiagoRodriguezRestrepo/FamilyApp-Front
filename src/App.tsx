import { Toaster } from 'sonner';
import { AppRoutes } from './components/routes/AppRoutes';

function App() {
  return (
    <>
      <Toaster closeButton richColors position="top-right" expand visibleToasts={9} />
      <AppRoutes />
    </>
  );
}

export default App;
