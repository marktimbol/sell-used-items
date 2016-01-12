var React = require('react');
var ReactDOM = require('react-dom');

class PeopleWhoLikedThis extends React.Component
{
	getInitialState() {
		return {
			totalLikesCount: 0
		};
	},

	fetchTotalLikesCount() {

		var url = '/api/item/' + this.props.itemId + '/totalLikesCount';

		$.ajax({
			url: url,
			dataType: 'JSON',
			type: 'GET',
			success: function(data) {
				this.setState({ totalLikesCount: data });
			}.bind(this),
			error: function(xhr, status, err)
			{
				console.log(err.toString());
			}.bind(this)
		});
	},

	componentDidMount() {
		this.fetchTotalLikesCount();
	},

	render() {

		var message = 'Be the first to like this post.';

		if( this.state.totalLikesCount > 0 )
		{
			message = this.state.totalLikesCount + ' people like this';
		}

		return (
			<p>{message}</p>
		);
	}	

}

class LikeButton extends React.Component
{
	getInitialState() {
		return {
			liked: false
		}
	},

	setItemlikeButtonClassName() {
		var props = this.props;

		var itemId = $.grep(window.user.likes, function(item) {
		    return item.likeable_id == props.itemId;
		});		

		if( itemId.length )
		{
			this.setState({ 
				liked: true
			});
		}
	},

	componentDidMount() {
		this.setItemlikeButtonClassName();
	},

	handleClick() {
		if( ! this.state.liked )
		{
			this.setState({ liked: ! this.state.liked });
			this.props.onLikeItem();	
		}
		else
		{
			this.setState({ liked: ! this.state.liked });
	        this.props.onUnlikeItem();	
		}
	},

	render() {
		return(
			<a onClick={this.handleClick} className={this.state.liked ? 'liked' : ''}><i className="material-icons tiny">thumb_up</i> Like</a>		
		);
	}

}

class CommentButton extends React.Component
{
	render() {
		return(
			<a><i className="material-icons tiny">comment</i> Comment</a>
		);
	}
}

class Item extends React.Component
{
	handleLikeItem() {

		if( ! window.signedIn )
		{
			alert('You need to login in before you can like an item.');
			return;
		}

		var postUrl = '/api/likes';

	    $.ajaxSetup({
	        headers: { 'X-CSRF-Token' : $('meta[name="token"]').attr('content') }
	    });

		$.ajax({
			url: postUrl,
			type: 'POST',
			data: {
				id: this.props.itemId
			},
			success: function(data) {	
				console.log(data);
			}.bind(this),
			error: function( xhr, status, err ) {
				console.log(err.toString());
			}
		});

	},

	handleUnlikeItem() {

		if( ! window.signedIn )
		{
			alert('You need to login in before you can like an item.');
			return;
		}

		var postUrl = '/api/likes/'+this.props.itemId;

	    $.ajaxSetup({
	        headers: { 'X-CSRF-Token' : $('meta[name="token"]').attr('content') }
	    });

		$.ajax({
			url: postUrl,
			type: 'DELETE',
			data: {
				id: this.props.itemId
			},
			success: function(data) {	
				console.log(data);
			}.bind(this),
			error: function( xhr, status, err ) {
				console.log(err.toString());
			}
		});

	},	

	render() {

		return (

			<div className="col s6 m4">

				<div className="card">

					<div className="card-image">
						<a href={this.props.url}>
							<img src={this.props.path} />
						</a>
						<span className="card-title">AED { this.props.price }</span>
					</div>

					<div className="card-content">
						{ this.props.description }
					</div>

					<div className="card-action">

						<LikeButton itemId={this.props.itemId } onLikeItem={this.handleLikeItem} onUnlikeItem={this.handleUnlikeItem} />
					
						<CommentButton itemId={this.props.itemId} />
					
						<PeopleWhoLikedThis itemId={this.props.itemId} />
					
					</div>
				</div>

			</div>

			);
	}
}


class Items = React.Component
{
	getInitialState() {
		return {
			items: []
		};
	},

	fetchItems() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({ items: data });
			}.bind(this),
			error: function( xhr, status, err ) {
				console.log('There was an error while making a request to ' + this.props.url );
			}.bind(this)
		});
	},

	componentDidMount() {
		this.fetchItems();
	},

	render() {
		var itemsList = this.state.items.map( function(item) {

			var itemUrl = '/items/' + item.id;

			return (
				<Item 
					key={item.id} 
					itemId={item.id}
					price={item.price} 
					description={item.description} 
					path={item.path} 
					url={itemUrl} />
				);
		});

		return(
			<div className="items">
				{ itemsList }
			</div>
		);
	}

}

var LikeButtonTest = React.createClass({

	getInitialState() {
		return {
			liked: false
		};
	},

	handleClick() {
		this.setState({ liked: ! this.state.liked });
	},

	render() {
		var text = this.state.liked ? 'like' : 'haven\'t liked it';
		return (
			<p onClick={this.handleClick}>
				You {text} this. Click to toggle.
			</p>
		);
	}
});


ReactDOM.render(
	
	<Items url="/api/items" />, 

	document.getElementById('itemsList')

);