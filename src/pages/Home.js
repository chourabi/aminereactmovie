import React from 'react';
import Status from '../components/Statut';
import Movie from '../components/Moviesnana';



class Home extends React.Component {

    constructor(props) {
        super();
        this.state={
            statits:[],
            titsanatoadd:"",
            movies:[]
        }


        this.getAllStatutes=this.getAllStatutes.bind(this);
    }



    getAllMovies(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://127.0.0.1:3500/listmovies", requestOptions)
        .then(response => response.text())
        .then(result => {
            var movies = JSON.parse(result);
            console.log(movies);
            this.setState({
                movies:movies.data
            })
        })
        .catch(error => console.log('error', error));
            }
            


    getAllStatutes() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", window.localStorage.getItem('token'));

       
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:3500/statut/list", requestOptions)
            .then(response => response.text())
            .then(result => {
                let allUserCrap = JSON.parse(result);
                console.log(allUserCrap);
                this.setState({
                    statits:allUserCrap
                })

            })
            .catch(error => console.log('error', error));
    }

    componentDidMount(){
        this.getAllStatutes();
        this.getAllMovies();
    }


    addTitsana(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", window.localStorage.getItem('token'));
        
        var raw = JSON.stringify({"statut":this.state.titsanatoadd});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://127.0.0.1:3500/statut/add", requestOptions)
          .then(response => response.text())
          .then(result => {
              this.getAllStatutes();
          })
          .catch(error => console.log('error', error));
    }


    titsanachange(e){
        this.setState({
            titsanatoadd:e.target.value
        })
    }

    render() {
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h3>Latest movies</h3>
                        <div className="movielist">
                            {
                                this.state.movies.map((movie)=>{
                                    return( <Movie title={movie.name} imgcover={movie.imgcover} idmovie={movie.id} /> );
                                })
                            }
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <h3>Latest states</h3>
                        <div>
                            <h6>ADD A NEW STATITSANA</h6>
                            <div className="row">
                                <div className="col-sm-12">
                                    <textarea onChange={(event)=>{this.titsanachange(event)}} >{this.state.titsanatoadd}</textarea>
                                </div>
                                <div className="col-sm-12">
                                    <button disabled={ this.state.titsanatoadd === "" } onClick={ ()=>{ this.addTitsana() } } >ADD titsana</button>
                                </div>
                            </div>
                        </div>
                        <div className="statslist">
                            {
                                this.state.statits.map((status)=>{
                                    return(
                                        <Status update={this.getAllStatutes} sid={status._id} avatar={status.user.avatar} adddate={status.add_date} username={status.user.user_name} statu={status.title} />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Home;