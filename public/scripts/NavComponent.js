'use strict';

const navbarId = '#navbar';
const usernameId = 'nav-username';

class NavComponent extends React.Component {
    constructor(props) {
        super(props);

        var url = window.location.pathname;
        var filename = url.substring(url.lastIndexOf('/') + 1);
        var navlocation = ' ';
        switch (filename) {
            case 'goals.html':
            case 'update-goal.html':
                navlocation = 'goals';
                break;
            case 'resources.html':
                navlocation = 'resources';
                break;
            default:
                navlocation = 'home';
        }
        this.state = { navlocation: navlocation };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                document.getElementById(usernameId).innerHTML = user.displayName;
            }
        });
    }

    render() {
        return (
            <nav className="navbar navbar-bonsai navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="index.html"><img src="images/logo_wide.svg" alt="logo" height="70"></img></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className={this.state.navlocation === 'goals' ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" href="goals.html">Goals</a>
                        </li>
                        <li className={this.state.navlocation === 'community' ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" href="#">Community</a>
                        </li>
                        <li className={this.state.navlocation === 'resources' ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" href="resources.html">Resources</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav" style={{right: 0, left: 'auto'}}>
                        <li className="nav-item dropdown">
                            <a id="nav-username" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
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
