var React = require('react');

var ItemOwner = React.createClass({

	render() {
		return (
			<div className="Item__user">
				<div className="row valign-wrapper">
					<div className="col s2">
						<img src="http://materializecss.com/images/yuna.jpg" alt="" className="circle responsive-img" />
					</div>
					<div className="col s10">
						<h6 className="Item__user__name">{ this.props.name }</h6>
					</div>
				</div>
			</div>
			);
	}

});

export default ItemOwner;