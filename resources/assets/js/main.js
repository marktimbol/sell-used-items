var React = require('react');
var ReactDOM = require('react-dom');

var LikeButton = React.createClass({

	getInitialState() {
		return {
			likeButtonClassName: ''
		}
	},

	setItemlikeButtonClassName() {

		var props = this.props;

		var itemId = $.grep(window.user.likes, function(item) {
		    return item.likeable_id == props.itemId;
		});		

		if( itemId.length )
		{
			this.setState({ likeButtonClassName: 'liked' });
		}
	},

	componentDidMount() {

		this.setItemlikeButtonClassName();

		console.log(this.props.likeButtonClassName);

		if( this.props.likeButtonClassName ) {
			this.setState({ likeButtonClassName: this.props.likeButtonClassName });
		}

	},

	render() {
		return(
			<a onClick={this.props.likeItem} className={this.state.likeButtonClassName}>Like</a>		
		);
	}

});

var ShareButton = React.createClass({

	render() {
		return(
			<a>Share</a>
		);
	}
});


var CommentButton = React.createClass({

	render() {
		return(
			<a>Comment</a>
		);
	}

});

var Item = React.createClass({

	getInitialState() {
		return {
			likeCount: 0,
			likeButtonClassName: ''
		}
	},

	onLikeItem() {

		console.log('onLikeItem()');

	    this.setState({ likeButtonClassName: 'liked' }, function() {
	    	console.log(this.state.likeButtonClassName);
	    });


		if( ! window.signedIn )
		{
			alert('You need to login in before you can like an item.');
			return;
		}

		var postUrl = 'http://sell-used-items.dev/likes';

	    $.ajaxSetup({
	        headers: { 'X-CSRF-Token' : $('meta[name="token"]').attr('content') }
	    });

		// $.ajax({
		// 	url: postUrl,
		// 	type: 'POST',
		// 	data: {
		// 		id: this.props.itemId
		// 	},
		// 	success: function(data) {	

		// 		console.log(data);

		// 	}.bind(this),
		// 	error: function( xhr, status, err ) {
		// 		console.log(err.toString());
		// 	}
		// });

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

						<LikeButton itemId={this.props.itemId } likeItem={this.onLikeItem} likeButtonClassName={this.state.likeButtonClassName} />
					
						<ShareButton itemId={this.props.itemId } />
					
						<CommentButton itemId={this.props.itemId} />
					
					</div>
				</div>

			</div>

			);
	}
});


var Items = React.createClass({

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

});


ReactDOM.render(
	
	<Items url="/api/items" />, 

	document.getElementById('itemsList')

);