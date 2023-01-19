import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


export default function SongCard(props) {
  return (
    <Card sx={{ width: "100%", justifyContent: 'center', marginBottom:'15px', backgroundColor:'#757575', color:'#f3e5f5' }}>
      <CardContent>
        <Typography   gutterBottom variant="h6">
          Singer: {props.document._source.Singer.toString()}
        </Typography>
        <Typography variant="h5" component="div">
          Song Name: {props.document._source["Song Name"]}
        </Typography>
        <Grid container
            direction="row"
            sx={{marginTop:'10px'}}>
            <Grid item xs={2}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Year: {props.document._source.Year}
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Album: {props.document._source.Album}
            </Typography>
            </Grid>
        </Grid>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Featured Artists: {props.document._source['Featured Artists'].toString()}
            </Typography>
        
        

        <Grid container direction='row'>
            <Grid item xs={2}>
                Metaphor
            </Grid>
            <Grid item xs={10}>
            {props.document._source.Metaphor}
            </Grid>
        </Grid>

        <Grid container direction='row'>
            <Grid item xs={2}>
                source domain
            </Grid>
            <Grid item xs={10}>
            {props.document._source['source domain']}
            </Grid>
        </Grid>

        <Grid container direction='row'>
            <Grid item xs={2}>
                target domain
            </Grid>
            <Grid item xs={10}>
            {props.document._source['target domain']}
            </Grid>
        </Grid>

        <Grid container direction='row'>
            <Grid item xs={2}>
                Lyrics
            </Grid>
            <Grid item xs={10}>
            {props.document._source.Lyrics}
            </Grid>
        </Grid>

        <Typography variant="body2">
        </Typography>
      </CardContent>
      <CardActions>
       
      </CardActions>
    </Card>
  );
}