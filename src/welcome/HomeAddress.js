// Form for Home Address
import  React, { Component } from "react";
import  style from './HomeAddress.css';
import Autocomplete from 'react-autocomplete'
import classnames from 'classnames';


export default class HomeAddress extends Component {
  constructor(props){
    super(props);

    this.state = {suggestions: [], hidden: true};
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

  fetchMapData(input){
    fetch(`http://apilayer.net/api/autocomplete?access_key=a27fff978a028f63197705eeef0b6ba6&text=${input}&country_code=USA`) 
    .then((resp) => resp.json())
    .then((resp) => {
      console.log('DATA NOW', resp)
      let suggestionResults = resp.results;
      // store what we need into new suggestions - set to State
      let suggestions = suggestionResults.map((el,i)=>{
        return el.formatted_address.reduce((acc,el,i,arr)=>{
          return acc + el + ' ';
        }, '')
        console.log('FormattedAddress --', formatedAddress);
      })
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
        <i className={style.back} onClick={this.handleBackClick}></i>
        <h3 className={style.addressHeader}>Find your address</h3> 
        <span className={style.text}>You can submit once you select from the dropdown.</span>
        <form onSubmit={this.handleSubmit}>
          <Autocomplete
            inputProps={{ 
              id: 'autoCompleteInput', 
              style: {
              width: '337px',
              marginTop: '10px',
              height: '22px',
              borderRadius: '3px',
              paddingLeft: '5px'
              } 
            }}
            wrapperStyle={{ position: 'relative', display: 'inline-block' }}
            value={this.state.value}
            items={this.state.suggestions}
            getItemValue={(item) => {
              console.log('getItemValue', item)
              return item
            }}
            onSubmit={this.handleSubmit}
            onSelect={(value, item) => {
              this.setState({ value, hidden:false })
            }}
            onChange={(event, value) => {
              console.log('event,value', event,value, this.timerId);
              if(value === this.state.value){
                console.log("ABORT onChange");
                return
              }
              // throttle the amt of API calls by calling after 1000ms have elapsed since last change
              this.setState({ value, hidden:true })
              clearTimeout(this.timerId)
              this.timerId = setTimeout(()=>{
                this.fetchMapData(value)
              }, 1000)
            }}
            renderMenu={children => {
                // console.log('renderMenu', children)
                return (
                  <div
                    className={style.suggestionMenu}
                  >
                    {children}
                  </div>
                )
              } 
            }
            renderItem={(item, isHighlighted, styles={color:'red'}) => {
                // console.log('item, isHighlighted', item, isHighlighted)
                return (
                  <div
                    className={`${isHighlighted ? style.isHighlighted : style.item}`}
                    key={item}
                  >
                    {item}
                  </div>
                )
              }
            }
          />
          <input 
            className={classnames({
              [style.submitBtn]: true,
              [style.hidden]: this.state.hidden
            })} 

            type="submit" value="Submit" 
          />
        </form>
      </div>
    )
  }
}