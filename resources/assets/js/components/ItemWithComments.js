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
					this.setState({ comments: data });
				}
			}.bind(this),
			error: function(xhr, status, err) {
				console.log('Error on fetchItemComments()');
			}.bind(this)
		});
	},

	componentDidMount() {
		this.fetchItemComments();

    //     var pusher = new Pusher('c52f44867e285beeeb6f');

    //     console.log(pusher);
  
    //     var channel = pusher.subscribe('test-channel');
  
  		// console.log(channel);

    //     channel.bind("App\\Events\\UserPostedAComment", function(comment) {
    //     	alert('hi');
    //         alert(comment);
    //     });
	},

	handleCommentSubmit(message) {
		var newComments = this.state.comments.concat({
				id: Date.now(),
				user: {
					name: window.user.info.name
				},
				message: message
			});

		this.setState({ comments: newComments });

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