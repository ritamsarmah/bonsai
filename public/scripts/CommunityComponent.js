'use strict';

const communityId = '#community';

var hobby;
var communityData;

class CommunityComponent extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.resource.name}</h3>
                <div className="col-lg-4 col-md-6">
                    <div className="panel panel-image">
                        <a href={this.props.resource.link} target="_blank">
                            <img height="100%" width="100%" src={this.props.resource.img}></img>
                        </a>
                    </div>
                </div>
                <br></br>
                <br></br>
            </div>
        );
    }
}


function CommunityList() {
    return (
        <div>
            <h1>{hobby} Forums & Communities</h1>
            <br></br>
            <br></br>
            <div className="row justify-content-center">
                {Object.values(communityData).map((r) => <CommunityComponent resource={r} />)}
            </div>
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