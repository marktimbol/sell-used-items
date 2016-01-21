var React = require('react');

import TotalLikesCount from './TotalLikesCount';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

var Item = React.createClass({

	getInitialState() {
		return {
			liked: false,
			likesCount: 0,
			comments: [1,2,3]
		};
	},

	setLikeButtonClass() {
		var props = this.props;

		var itemId = $.grep(window.user.likes, function(item) {
		    return item.likeable_id == props.itemId;
		});		

		if( itemId.length )
		{
			this.setState({liked: true}, function() {});
		}
	},

	fetchLikesCount() {

		var url = '/api/item/' + this.props.itemId + '/totalLikesCount';

		$.ajax({
			url: url,
			dataType: 'JSON',
			type: 'GET',
			success: function(data) {
				this.setState({ likesCount: data });
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(err.toString());
			}.bind(this)
		});
	},

	handleLikeItem() {
		
		var itemUrl = '/api/item/' + this.props.itemId + '/like/' + window.user.info.id ;

		$.ajax({
			url: itemUrl,
			type: 'POST',
			headers: { 'X-CSRF-Token' : $('meta[name="token"]').attr('content') },
			success: function(data) {	
				this.fetchLikesCount();
				this.setState({ liked: true });
			}.bind(this),
			error: function( xhr, status, err ) {
				console.log(err.toString());
			}
		});
	},

	handleUnlikeItem() {

		var itemUrl = '/api/item/' + this.props.itemId + '/unlike/' + window.user.info.id;

		$.ajax({
			url: itemUrl,
			type: 'DELETE',
			headers: { 'X-CSRF-Token' : $('meta[name="token"]').attr('content') },
			success: function(data) {	
				this.fetchLikesCount();
				this.setState({ liked: false });
			}.bind(this),
			error: function( xhr, status, err ) {
				console.log(err.toString());
			}
		});

	},	

	componentDidMount() {
		this.setLikeButtonClass();
		this.fetchLikesCount();
	},

	render() {
		return (
			<div className="card">
				<div className="card-image">
					<a href={this.props.url}>
						<img src={this.props.path} alt={this.props.description} title={this.props.description} />
					</a>
				</div>

				<div className="card-content">
					{this.props.description}

					<div className="Item__counters">
						<br />
						<TotalLikesCount count={this.state.likesCount} />
					</div>
				</div>

				<div className="card-action">
					<LikeButton onLikeItem={this.handleLikeItem} onUnlikeItem={this.handleUnlikeItem} liked={this.state.liked} />
					<CommentButton />
				</div>
			</div>
		);
	}
});

export default Item;