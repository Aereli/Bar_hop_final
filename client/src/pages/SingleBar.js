import React from 'react'
import './SingleBar.css'
import { Link } from 'react-router-dom'

class SingleBar extends React.Component {
  state = {bar: {Name:'Loading...'}, reviews: [], reviews_: []}



fetchBar = () => {
  fetch(`/api/bars/${this.props.match.params.id}`)
  .then(response=>response.json())
  .then(bar => this.setState({bar}))
}
fetchReviews = () => {
  fetch(`/api/bars/${this.props.match.params.id}/reviews`)
  .then(response=>response.json())
  .then(reviews=> this.setState({reviews}))
  .then(reviews => {
    const reviews_ = this.state.reviews.reviews.map(({user, rating, text}) => ({name: user.name, rating, text}))
    console.table(reviews_)
    this.setState({reviews_})
  })
}
render(){
  console.log(this.state)
  
  const location = localStorage.getItem('location')
  const term = localStorage.getItem('term') || ''
  return(
    <div className="i-want-yo-body">
      {
        location                                            ?
        <Link to={`/bars/${location}/${term}`}>Back</Link>  :
        <Link to="/">Back</Link>
      }
      <div className="single-bar-rob">
        <h1>{this.state.bar.name}</h1>
      </div>
      <div className="containerRob">
        <div className="bar-data-rob">
          <img src={this.state.bar.image_url} alt = {this.state.bar.name} className="img-rob"
          />
        </div>

        <div className ="table-data-rob">
          {this.state.bar.name &&
          <table>
            <tbody>
            <tr>
              <td>Name</td>
              <td>{this.state.bar["name"]}</td>
            </tr>
            <tr>
              <td>Reviews</td>
              <td>{this.state.bar["review_count"]}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{this.state.bar["display_phone"]}</td>

            </tr>
            <tr>
              <td>Rating</td>
              <td>{this.state.bar["rating"]}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{this.state.bar["price"]}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{this.state.bar.location.address1}</td>
              <td>{this.state.bar.location.city},</td>
              <td>{this.state.bar.location.state}</td>
              <td>{this.state.bar.location.zip_code}</td>
           </tr>
           <tr>
             <td>Category</td>
             <td>{this.state.bar.categories[0].title}</td>
           </tr>
           </tbody>
          </table>
          }
        <div>
         
        </div>
        </div>
      </div>
      <div>
            {this.state.reviews_.map(review => Object.entries(review).map(([k, v]) => <p>{k}: {v}</p>))}
          </div>
  </div>

  )
}
  componentDidMount(){
    this.fetchBar()
    this.fetchReviews()
  }
}

 
  
  export default SingleBar
  
