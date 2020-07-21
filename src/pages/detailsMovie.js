import React from 'react';


class MovieDetails extends React.Component {

  constructor(props){
    super();
    this.state={
        comments:[],
        movie:{},
        isLoading:true,
        commentToAdd:""
    }

  }

  componentDidMount(){
      this.getMovieDetails();
  }



  getMovieDetails(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", window.localStorage.getItem('token'));
    
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:3500/movie/details?id="+this.props.match.params.id, requestOptions)
      .then(response => response.text())
      .then(result => {
          var res = JSON.parse(result);
          this.setState({
              comments:res.comment,
              movie:res.data,
              isLoading:false
          })
      })
      .catch(error => console.log('error', error));
  }


  addComment(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", window.localStorage.getItem('token'));
    
    var raw = JSON.stringify({"id_movie":this.props.match.params.id,"comment":this.state.commentToAdd});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:3500/comment/add", requestOptions)
      .then(response => response.text())
      .then(result => {console.log(result)
        this.getMovieDetails();
    })
      .catch(error => console.log('error', error));
  }

  updateV(e){
      this.setState({
        commentToAdd:e.target.value
      })
  }


  render(){
      
      return(<div>
          {
              this.state.isLoading ?
              <h1>Loading... {this.props.match.params.id} </h1>
              :
              <div>
                  <img src={this.state.movie.imgcover} width="350px" />
                  <h3>{this.state.movie.name}</h3>
                  <p>{this.state.movie.description}</p>
                  <h6>comments</h6>
                  <ul>
                      {
                          this.state.comments.map((comment)=>{
                          return(<li> <strong>{comment.user_name}</strong><br/> {comment.text}</li>);
                          })
                      }
                  </ul>

                    <textarea onChange={ (e)=>{ this.updateV(e) }} >{this.state.commentToAdd}</textarea><button onClick={()=>{ this.addComment() }}>add</button>    


              </div>
          }
      </div>);
  }
}

export default MovieDetails;