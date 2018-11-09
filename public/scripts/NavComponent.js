'use strict';

const navbarId = '#navbar';

class NavComponent extends React.Component {
    constructor(props) {
        super(props);

        var filename = window.location.pathname.split('/')[2].split("#")[0];
        var navlocation = ' ';
        console.log(filename);
        switch (filename) {
            case 'goals.html':
            case 'update-goal.html':
                navlocation = 'goals';
                break;
            case 'index.html':
                navlocation = 'home';
                break;
        }
        this.state = { navlocation: navlocation };
    }

    render() {
        return (
            <nav className="navbar navbar-bonsai navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#"><img src="images/logo_wide.svg" alt="logo" height="70"></img></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className={this.state.navlocation === 'home' ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" href="index.html">Home</a>
                        </li>
                        <li className={this.state.navlocation === 'goals' ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" href="goals.html">Goals</a>
                        </li>
                        <li className={this.state.navlocation === 'community' ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" href="#">Community</a>
                        </li>
                        <li className={this.state.navlocation === 'resources' ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" href="#">Resources</a>
                        </li>
                    </ul>
                    
                    <ul className="navbar-nav" style={{right: 0, left: 'auto'}}>
                        <li className="nav-item dropdown">
                            <a id="nav-username" className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Hobby <i>(Running)</i></a>
                                <a className="dropdown-item" href="#">Settings</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

ReactDOM.render(<NavComponent />, document.querySelector(navbarId));