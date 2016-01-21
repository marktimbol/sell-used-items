var React = require('react');

var CommentButton = React.createClass({

	handleClick() {
		alert('TODO here.');
	},

	render() {
		return(
			<a><i className="material-icons tiny">comment</i> Comment</a>		
		);
	}

});

export default CommentButton;