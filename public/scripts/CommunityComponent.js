'use strict';

const communityId = '#community';

var hobby;
var communityData;

class CommunityComponent extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.resource.name}</h3>
                <div className="panel panel-image">
                    <a href={this.props.resource.link} target="_blank">
                        <img height="100%" width="100%" src={this.props.resource.img}></img>
                    </a>
                </div>
                {/* <div style={{ textAlign: "center" }}>
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
                </ul> */}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        );
    }
}


function CommunityList() {
    return (
        <div>
            <h1>{hobby} Community Forums and Resources</h1>
            <br></br>
            <br></br>
            {Object.values(communityData).map((r) => <CommunityComponent resource={r} />)}
        </div>
    );
}

// Load data from Firebase
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var ref = firebase.database().ref('users/' + user.uid);

        ref.once('value', function (data) {
            hobby = data.val().hobby;
            var hobbyRef = firebase.database().ref('hobbies/' + hobby + '/community/sites');
            hobbyRef.once('value', function (data) {
                communityData = data.val();
                ReactDOM.render(<CommunityList />, document.querySelector(communityId));
            });
        });
    }
});