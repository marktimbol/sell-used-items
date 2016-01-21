var React = require('react');

var TotalLikesCount = React.createClass({

	render() {
		var message = 'Be the first to like this post.';

		if( this.props.count > 0 ) {
			message = this.props.count + ' people like this';
		}

		return (
			<p>{message}</p>
		);
	}	

});

export default TotalLikesCount;