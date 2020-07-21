import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


import React from 'react';

class Status extends React.Component {

    constructor(props){
        super(props);
        this.state={
            aboutToEdit:false,
            statu:props.statu,
            id:props.sid,
            all:props
        }

        console.log(props);
    }

    componentDidMount(){
        
    }


    updateStat(){
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", window.localStorage.getItem('token'));

var raw = JSON.stringify({"statut": this.state.statu ,"id":this.state.id});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:3500/statut/update", requestOptions)
  .then(response => response.text())
  .then(result => {
      this.setState({
          aboutToEdit:false,
      })

    this.state.all.update();
  })
  .catch(error => console.log('error', error));
    }


    updateText(e){
        this.setState({
            statu:e.target.value
        })
    }

    deletePost(){
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", window.localStorage.getItem('token'));
        
        var raw = JSON.stringify({"id":this.state.id});
        
        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://127.0.0.1:3500/statut/delete", requestOptions)
          .then(response => response.text())
          .then(result => {console.log(result)
        
    this.state.all.update();
        })
          .catch(error => console.log('error', error));
    }
    
 render(){
     let props = this.props;
    return(
        <Card >
        <CardHeader
            avatar={
                <Avatar aria-label="recipe" >
                    <img style={{width:"100%"}} alt="" src={props.avatar}/>
                    </Avatar>
            }
            
            title={props.username}
            subheader={props.adddate}
        />
        <CardMedia
            image="/static/images/cards/paella.jpg"
            title="Paella dish"
        />
        {
            this.state.aboutToEdit === false ?
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                {props.statu}
    </Typography>
            <button onClick={ ()=>{ this.setState({aboutToEdit:true}) } } >update</button>
            <button onClick={ ()=>{ this.deletePost() } } >delete</button>
            

        </CardContent>
        :
            <div>
                <textarea name="" value={this.state.statu} onChange={(e)=>{this.updateText(e)}}  id="" width="100%" rows="2"></textarea>
                <button onClick={ ()=>{this.updateStat()} } >UPDATE</button>
            </div>
        }
    
    
    </Card>
     )
 }
     
}


export default Status;