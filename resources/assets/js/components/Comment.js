
var React = require('react');

var Comment = React.createClass({
	render() {
		return (
			<div className="Item__comment">
				<div className="row">
					<div className="col s2">
						<img src="http://materializecss.com/images/yuna.jpg" alt="" className="circle responsive-img" />
					</div>
					<div className="col s10">
						<h6 className="Item__comment__name">{this.props.user ? this.props.user : 'Guest'}</h6>
						<p>{this.props.message}</p>
					</div>
				</div>
			</div>
		);
	}
});

export default Comment;