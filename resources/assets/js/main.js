var React = require('react');
var ReactDOM = require('react-dom');

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
		console.log(window.signedIn);
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


var Item = React.createClass({

	getInitialState() {
		return {
			likeCount: 0
		}
	},

	onLikeItem() {

		if( ! window.signedIn )
		{
			alert('You need to login in before you can like an item.');
			return;
		}

		var postUrl = 'http://sell-used-items.dev/likes';

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
				console.log(status);
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

						<LikeButton itemId={this.props.itemId } likeItem={this.onLikeItem}/>
					
						<ShareButton itemId={this.props.itemId } />
					
						<CommentButton itemId={this.props.itemId} />
					
					</div>
				</div>

			</div>

			);
	}
});


var LikeButton = React.createClass({

	render() {
		return(
			<a onClick={this.props.likeItem}>Like</a>		
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


ReactDOM.render(
	
	<Items url="/api/items" />, 

	document.getElementById('itemsList')

);