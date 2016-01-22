var React = require('react');
var ReactDOM = require('react-dom');

import Item from './Item';

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

        var pusher = new Pusher('86f659a98a596ff7d50e');
        var channel = pusher.subscribe('test-channel');
  
        channel.bind("App\\Events\\UserRegistered", function(data) {
        	console.log(data);
        	alert('Hey Pusher.com');
        });
	},

	render() {

		var items = this.state.items.map( function(item) {

			var itemUrl = '/items/' + item.id;

			return (
				<div className="col s6 m4">
					<Item key={item.id}
						itemId={item.id} 
						path={item.path}
						description={item.description}
						url={itemUrl} />	
				</div>
				);
		});

		return(
			<div className="Items">
				{ items }
			</div>
		);
	}

});

ReactDOM.render(
	<Items url="/api/items" />, 
	document.getElementById('Items')
);