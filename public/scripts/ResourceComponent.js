'use strict';

const resourcesId = '#resources';

var resourceData;

class ResourceComponent extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.resource.name}</h3>
                <div className="panel panel-image">
                    <img height="100%" width="100%" src={this.props.resource.img}></img>
                </div>
                <div style={{ textAlign: "center" }}>
                    <a href={this.props.resource.link} target="_blank">
                        <img src="http://www.niftybuttons.com/amazon/amazon-button1.png" alt="Amazon Button"></img>
                    </a>
                </div>
                <ul className="bullet-center">
                    {Object.values(this.props.resource.description).map((item) => {
                        return (
                            <li>{item}</li>
                        );
                    })}
                </ul>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        );
    }
}


function ResourceList() {
    return (
        <div>
            <h1 id="title"></h1>
            <br></br>
            <br></br>
            {Object.values(resourceData).map((r) => <ResourceComponent resource={r} />)}
        </div>
    );
}

// Load data from Firebase
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var ref = firebase.database().ref('users/' + user.uid);

        ref.once('value', function (data) {
            var hobby = data.val().hobby;
            var hobbyRef = firebase.database().ref('hobbies/' + hobby + '/resources/starter-pack');
            hobbyRef.once('value', function (data) {
                resourceData = data.val();
                ReactDOM.render(<ResourceList />, document.querySelector(resourcesId));
            });
        });
    }
});