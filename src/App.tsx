import { Sidebar } from './features/sidebar/Sidebar';
import { Header } from './features/header/Header';
import { MenuBar } from './features/menu-bar/MenuBar';
import { Canvas } from './features/canvas/Canvas';
import { Inspector } from './features/inspector/Inspector';

function App() {
  return (
    <div className="App">
      <MenuBar/>
      <Header/>
      <Sidebar/>
        <Canvas/>
      <Inspector/>
      <div className="copilot"></div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
