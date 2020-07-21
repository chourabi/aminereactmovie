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
import { Link } from 'react-router-dom';

class Movie extends React.Component {

    constructor(props){
        super(props);
        this.state={
            props:props
        }

        console.log(props);
    }

    componentDidMount(){
        
    }



    
 render(){
     let props = this.props;
    return(
        <Card >
        <CardHeader
            title={props.title}
        />
        <CardMedia
            style={{height:150}}
            image={props.imgcover}
            title="Paella dish"
        />

            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                <Link to={ '/detailsmovie/'+props.idmovie }>Details</Link>
            </Typography>
        </CardContent>

    
    
    </Card>
     )
 }
     
}


export default Movie;