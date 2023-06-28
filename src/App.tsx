import { Sidebar } from './features/sidebar/Sidebar';
import { Header } from './features/header/Header';
import { MenuBar } from './features/menu-bar/MenuBar';
import { Canvas } from './features/canvas/Canvas';
import { Inspector } from './features/inspector/Inspector';
import './App.scss';
import { Copilot } from './features/copilot/Copilot';


function App() {
  return (
    <div className="App">
      <MenuBar/>
      <Header/>
      <Sidebar/>
      <Canvas/>
      <Inspector/>
      <Copilot/>
      <div className="footer"></div>
    </div>
  );
}

export default App;
