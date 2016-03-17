var React = require('react');
var Firebase = require('firebase');

var rootUrl = 'https://todos-abha.firebaseio.com/';

module.exports = React.createClass({
	getInitialState: function(){
		return {
			text: this.props.item.text,
			done: this.props.item.done,
			textChanged: false
		}
	},
	componentWillMount: function(){
		this.fb = new Firebase(rootUrl +'items/' + this.props.item.key)
	},
	render : function(){
		return  <div className="input-group">
					<span className="input-group-addon">
					  <input 
					  onChange={this.handleDoneChange}
					  type="checkbox" />
					 </span>
				  <input type="text" 
				    disabled={this.state.done}
				    onChange={this.handleTextChange}
				   className= "form-control"
				   value={this.state.text}
				   />

				   <span className="input-group-btn">
				   		{this.changeButtons()}
				     <button onClick={this.handleDelete} className="btn btn-default" >
				     Delete
				     </button>
				    </span> 	  
		</div>

	},

	changeButtons: function(){
		if(!this.state.textChanged){
			return null
		} else{
			return [
				<button 
					className="btn btn-default"
					onClick={this.handleSaveClick}
					>
				    Save
				</button>,
				<button 
				 className="btn btn-default"
				 onClick={this.handleUndoClick}
				 >
				 Undo
				 </button>
			   ]
			}	
		
	},

	handleSaveClick:function(event){
		this.fb.update({text:this.state.text});
		this.setState({textChanged:false});
	},
	handleUndoClick: function(){
		this.setState({
			text: this.props.item.text,
			textChanged:false
		})
	},

	handleTextChange: function(event){
		this.setState({
			text: event.target.value,
			textChanged:true
		});
		//this.fb.update({text:event.target.value});
	},

	handleDoneChange: function(event){
		var update = {done:event.target.checked}
		this.setState(update);
		this.fb.update(update);

	},
	handleDelete: function(){
		this.fb.remove();
	}
});