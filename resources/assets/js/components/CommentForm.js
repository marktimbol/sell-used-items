
var React = require('react');

var CommentForm = React.createClass({

	getInitialState() {
		return {
			message: ''
		}
	},

	handleChange(e) {
		e.preventDefault();
		this.setState({ message: e.target.value });
	},

	handleSubmit(e) {
		e.preventDefault();
		this.props.onCommentSubmit(this.state.message);
		this.setState({ message: '' });
	},

	render() {
		return (
			<div className="row">
				<div className="col s12">
					<form method="POST" onSubmit={this.handleSubmit}>
						<div className="input-field">
							<textarea value={this.state.message} onChange={this.handleChange} className="materialize-textarea"></textarea>
							<label>Write your comment</label>
						</div>
						<button type="submit" className="btn btn-waves-effect btn-waves-light">Submit comment</button>
					</form>
				</div>
			</div>
		);
	}
});

export default CommentForm;