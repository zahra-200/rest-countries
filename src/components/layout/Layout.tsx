
import Navbar from '../navBar/Navbar'

interface ILayout {
    children: React.ReactNode;
  }
  
  function Layout({ children }: ILayout) {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }

export default Layout