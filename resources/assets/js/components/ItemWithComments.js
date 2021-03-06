var React = require('react');
var ReactDOM = require('react-dom');

import Item from './Item';
import ItemOwner from './ItemOwner';
import Comment from './Comment';
import CommentForm from './CommentForm';

var ItemWithComments = React.createClass({

	getInitialState() {
		return {
			comments: []
		};
	},

	fetchItemComments() {

		var url = '/api/item/' + window.item.id + '/comments';

		$.ajax({
			url: url,
			dataType: 'JSON',
			type: 'GET',
			cache: false,
			success: function(data) {
				if( this.isMounted() ) {
					this.setState({ comments: data.comments });
				}
			}.bind(this),
			error: function(xhr, status, err) {
				console.log('Error on fetchItemComments()');
			}.bind(this)
		});
	},

	newCommentWasPosted() {
        this.newCommentChannel.bind("App\\Events\\UserPostedAComment", function(data) {
	        var newComments = this.state.comments.concat(data.comment);

	        this.setState({ comments: newComments });

		    // if (! ('Notification' in window)) {
		    //     alert('Web Notification is not supported');
		    //     return;
		    // }
		    
		    // Notification.requestPermission(function(permission) {
		    //     var notification = new Notification(data.comment.user.name +' said:' + data.comment.message);
		    // });

        }.bind(this));
	},

	componentWillMount() {
		this.pusher = new Pusher('86f659a98a596ff7d50e');
        this.newCommentChannel = this.pusher.subscribe('new-comment-on-item-' + window.item.id);
	},

	componentDidMount() {
		this.fetchItemComments();
		this.newCommentWasPosted();
	},

	handleCommentSubmit(message) {

		var postCommentUrl = '/api/item/' + window.item.id + '/comment';

		$.ajax({
			url: postCommentUrl,
			dataType: 'JSON',
			type: 'POST',
			cache: false,
			data: {
				itemId: window.item.id,
				userId: window.user.info.id,
				message: message
			},
			headers: { 'X-CSRF-Token' : $('meta[name="token"]').attr('content') },
			success: function(data) {
				this.fetchItemComments();
			}.bind(this),
			error: function(xhr, status, err) {
				console.log('An error was occurred when posting a new comment.');
			}.bind(this)
		});

	},

	render() {

		var comments = this.state.comments.map( function(comment) {
			return (				
				<Comment key={comment.id}
					user={comment.user_id}
					message={comment.message} />
			);	
		});

		var itemUrl = '/items/' + window.item.id;

		var displayCommentForm = false;

		return (	

			<div>
				<div className="col s12 m6">
					<div className="card-panel">

						<ItemOwner userId={ window.item.user_id } name={ window.item.user.name } />

						<Item itemId={window.item.id} 
							path={window.item.path}
							description={window.item.description}
							url={itemUrl} />
					</div>
				</div>

				<div className="col s12 m6">
					<div className="Item__comments">
						<div className="card-panel">
							<h4 className="Item__comments__title">Comments</h4>

							{comments}

							{ window.signedIn ? 
								<CommentForm onCommentSubmit={this.handleCommentSubmit}/> : 
								'Please login to post a comment.'
							}
							
						</div>
					</div>
				</div>
			</div>	
			);
	}

});


ReactDOM.render(
	<ItemWithComments />,
	document.getElementById('ItemWithComments')
	);	