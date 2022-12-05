import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './conponents/Login/Login';
import RegistrationReactBootstarp from './conponents/RegistrationReactBootstarp';
import Main from './Layout/Main';




const router = createBrowserRouter([
    {
      path:'/',
      element:<Main></Main>,
      children:[
        {
          path:'/',
          element: <RegistrationReactBootstarp></RegistrationReactBootstarp>
        },
        {
          path:'/register',
          element:<RegistrationReactBootstarp></RegistrationReactBootstarp>
        },
        {
          path:'/login',
          element:<Login></Login>
        }
      ]
    }
])
function App() {


  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
