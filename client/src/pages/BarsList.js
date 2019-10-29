import React from 'react'
import { Link } from 'react-router-dom'
import Beer from './images/beer.svg'

class BarsList extends React.Component {
  state = {
            bars: [],
            location: this.props.match.params.location,
            term: this.props.match.params.term || 'drinks',
            loader: true,
          }

  componentDidMount() {
    const { location, term='drinks' } = this.props.match.params;
    location && this.fetchBars(location, term)
  }

  handleInputChange = field => e => this.setState({ [field]: e.target.value })

  handleSubmit = event => {
    event.preventDefault()
    const { location, term } = this.state;
    this.props.history.push(`/bars/${location}/${term || ''}`)
    this.fetchBars(location, term)
  }

  fetchBars = (location, term) => {
    if (!location) return;
    const url = `/api/bars/search/${location}/${term || ''}`;
    fetch(url)
    .then(response => response.json())
    .then(yelpResponse => {
      this.setState({
        bars: yelpResponse,
        location,
        term,
        loader: false,
      })
    })
  }

  render(){
    return (
      <>
      <React.Fragment>
      <h1 className="h1-will"><a href="/">BarHop</a></h1>
      {this.state.loader ? <img src={Beer} className="loader" alt="beer"/> : ''}
        <form className="form-class" onSubmit={this.handleSubmit}>
          <div className="div2">
            <input
              id="location"
              className="input-will"
              type="text"
              placeholder="Search for a Bar Location"
              onChange={this.handleInputChange('location')}
              value={this.state.location}
              required
            />
            <input
              type="text"
              className="input-will"
              placeholder="Search a bar by keyword"
              onChange={this.handleInputChange('term')}
              value={this.state.term}
            />
            
            <img src={Beer} className="beer-icon" alt="beer-icon"/>
           
            </div>
        </form>
        
      <div className="barlist">
        {
          this.state.bars
          .map(bar => (
            <Link to={`/bar/${bar.id}`} key={bar.id}>
            <div className="main-result">
              <div className="results">
                <h3 className="will-h3">{bar.name}</h3>
                  <img 
                  className="result-images"
                  src={bar.image_url} 
                  alt={bar.name}/>
                <h3 className="will-h3"> 
                  Rating:  
                   <span className="span-will">
                  
                  {[...Array(Math.floor(bar.rating)).keys()].map(i => <img src={Beer} key={`beericon${i}`} className="beer-icon-list" alt="beer-icon"/>)}
                  </span>
                </h3>
              </div>
            </div>
            </Link>
          ))
        }
       </div>
       </React.Fragment>
       </>
    )
  }
}

export default BarsList
