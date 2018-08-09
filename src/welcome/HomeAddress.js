// Form for Home Address
import  React, { Component } from "react";
import  style from './HomeAddress.css';
import Autocomplete from 'react-autocomplete'

// to delay API calls until user stops typing
let delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

export default class HomeAddress extends Component {
  constructor(props){
    super(props);

    this.state = {suggestions: ['prefill', 'prekddkm']};
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleBackClick = this.handleBackClick.bind(this);
    // this.handleKeyUp = this.handleKeyUp.bind(this);
    this.fetchMapData = this.fetchMapData.bind(this);
    this.timerId = null;
  }


  handleSubmit(e) {
    console.log('HANDLE SUBMIT!', e);
    e.preventDefault();
    // this.props.toggleView('homeAddress')
  }

  handleBackClick(e) {
    this.setState({email: e.target.value});
    this.props.toggleView('phoneEmailForm')
  }

  handleInput(e) {
    this.setState({phone: e.target.value});
    console.log('HANDLE Change!', e);
  }

  // http://apilayer.net/api/autocomplete?access_key=a27fff978a028f63197705eeef0b6ba6&text=m&country_code=USA  

  // wait 1000ms after last keyup event to throttle API calls (only have 50)
  fetchMapData(input){
    fetch(`http://apilayer.net/api/autocomplete?access_key=a27fff978a028f63197705eeef0b6ba6&text=${input}&country_code=USA`) 
    .then((resp) => resp.json())
    .then((resp) => {
      console.log('DATA NOW', resp)
      // if(!resp.status){
      //   console.log('NOT VALID')
      //   return;
      // }

      let suggestionResults = resp.results;
      
      // store what we need into new suggestions - set to State
      let suggestions = suggestionResults.map((el,i)=>{
        let item = el.address_components;
        return `${item.street}, ${item.locality} ${item.region_code}, ${item.postal_code}`

      })

      console.log('SUGGESTIONS', suggestions);

      // Set the user to state.  Then make a view transition
      this.setState({
        suggestions
      }, (prevState)=>{
        console.log('STATE IS DONE');
      })
    })
    .catch(function(err) {
        console.log('ERRROR', err)
    });

  }

  render() {
    return (
      <div>
        <div className={style.back} onClick={this.handleBackClick}>Back</div>
          <Autocomplete
            inputProps={{ id: 'maps-autocomplete' }}
            wrapperStyle={{ position: 'relative', display: 'inline-block' }}
            value={this.state.value}
            items={this.state.suggestions}
            getItemValue={(item) => {
              console.log('getItemValue', item)
              return item
            }}
            onSelect={(value, item) => {
              // set the menu to only the selected item
              this.setState({ value })
              // or you could reset it to a default list again
              // this.setState({ unitedStates: getStates() })
            }}
            onChange={(event, value) => {
              console.log('event,value', event,value, this.timerId)
              this.setState({ value })
              clearTimeout(this.timerId)
              this.timerId = setTimeout(()=>{
                this.fetchMapData(value)
                // this.setState({ suggestions: ['marksksmskm','kkkkkk', 'dld,ld,dl,'] })                
              }, 1000)
            }}
            renderMenu={children => {
                console.log('renderMenu', children)
                return (
                  <div className="menu">
                    {children}
                  </div>
                )
              } 
              
            }
            renderItem={(item, isHighlighted) => {
                console.log('item, isHighlighted', item, isHighlighted)
                return (
                  <div
                    className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                    key={item}
                  >{item}</div>
                )
              }
            }
          />
      </div>
    )
  }
}