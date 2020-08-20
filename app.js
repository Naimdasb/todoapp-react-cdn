function TodoItem (props){
 
    return (
      <div className='item'>
        <p className='item_text'>{props.data}</p>
        <button className='item_btn' onClick={props.rem}>Remove</button>
        <button className='item_btn' onClick={props.don}>{props.aux}</button>
      </div>

    )
  
}



class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input : '',
      list : ['Wake up', 'Eat'],
      doneList : ['Sleep']
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRem = this.handleRem.bind(this)
    this.handleDon = this.handleDon.bind(this)
  }
  
  handleChange (event) {
    this.setState({
      input: event.target.value
    })
    
  }
  
  handleAdd () {
    this.setState({
      list: [...this.state.list, this.state.input],
      input: ''
    })
    
  }
  
  handleRem (indexI, val) {
    if(val === 0) {
      let getList = [...this.state.list]
      let updatedList = getList.filter( (item,index) => indexI !== index) 
      this.setState({
      list: updatedList
    })
    }
     else {
      let getList = [...this.state.doneList]
      let updatedList = getList.filter( (item,index) => indexI !== index) 
      this.setState({
       doneList: updatedList
    })
     }
   
   }
   
  handleDon (indexI, val) {
    if (val === 0) {
      this.setState({
        doneList: [...this.state.doneList, this.state.list[indexI]]
      })
      this.handleRem(indexI, val)
    }
    
    if (val === 1) {
      this.setState({
        list: [...this.state.list, this.state.doneList[indexI]]
      })
      this.handleRem(indexI, val)
    }
    
    
    
    
  }
  
  render() {
    return (
    
      <div className='todo_app'>
        <h1>Todo List!</h1>
        <div>
          <div className='inputs'>
            <input className='text' type='text' onChange={this.handleChange} value={this.state.input}/>
            
            <button className='add' onClick={this.handleAdd}>Add to my list</button>
          </div>
          <div className='lists'>
          <div className='todo'>
            <p className='title'>Todo</p>
            {this.state.list.map( (item,index) => <TodoItem data={item} key={index} rem={() => this.handleRem(index, 0)} don={() => this.handleDon(index, 0)} aux={'Done'}/>)}
          </div>
          <div className='todo'>
            <p className='title'>Done List</p>
            {this.state.doneList.map( (item,index) => <TodoItem data={item} key={index} rem={() => this.handleRem(index, 1)} don={() => this.handleDon(index, 1)} aux={'Move to Todo'}/>)}
          </div>
          </div>
        </div>
      </div>
    
    )
  }
}





class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Todo />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))