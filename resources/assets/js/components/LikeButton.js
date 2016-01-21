var React = require('react');

var LikeButton = React.createClass({

	handleClick() {
		if( ! window.signedIn ) {
			alert('You need to login in before you can make this action.');
			return false;
		}

		if( ! this.props.liked ) {
			this.props.onLikeItem();	
		} else {
	        this.props.onUnlikeItem();	
		}
	},

	render() {
		return(
			<a onClick={this.handleClick} className={this.props.liked ? 'liked' : ''}><i className="material-icons tiny">thumb_up</i> Like</a>		
		);
	}

});

export default LikeButton;