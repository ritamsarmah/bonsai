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
            case 'create-goal.html':
            case 'streak.html':
                navlocation = 'goals';
                break;
            case 'community.html':
                navlocation = 'community';
                break;
            case 'resources.html':
                navlocation = 'resources';
                break;
            case 'community.html':
                navlocation = 'community';
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
                var ref = firebase.database().ref('users/' + user.uid);

                ref.once('value', function (data) {
                    document.getElementById("hobbyText").innerHTML = data.val().hobby;
                });
            } else {
                // Force to login screen
                location.href = "login.html";
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
                            <a className="nav-link" href="community.html">Community</a>
                        </li>
                        <li className={this.state.navlocation === 'resources' ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" href="resources.html">Resources</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav" style={{ right: 0, left: 'auto' }}>
                        <li className="nav-item dropdown">
                            <a id="nav-username" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <div className="dropdown-item disabled">Hobby (<i id="hobbyText"></i>)</div>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" onClick={logout} href="login.html">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        location.href = "login.html";
    }).catch(function (error) {
        alert(error);
    });
}

ReactDOM.render(<NavComponent />, document.querySelector(navbarId));
