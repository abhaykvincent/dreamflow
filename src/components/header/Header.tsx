import ResponsiveControl from '../ResponsiveControl/ResponsiveControl';
import RolesControl from '../RolesControl/RolesControl';
import VersionControl from '../../features/versionControl/VersionControl';
import './Header.scss';
export function Header() {
  return (
    <header>
      
      <div className="left">
        <div className="logo"></div>
        <div className="page">
          <div className="page-name">
            <div className="name">Product</div>
          </div>
          <div className="breadcrumbs"> <span>Home</span> / <span>Collection</span> </div>
        </div>
        <div className="preview"></div>
      </div>

      <div className="center">
        <ResponsiveControl/>
        <RolesControl/>
      </div>

      <div className="right">
        <VersionControl/>
      </div>

    </header>
  );  
}