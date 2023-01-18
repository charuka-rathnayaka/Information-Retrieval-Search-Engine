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
    <Card sx={{ width: "100%", justifyContent: 'center' }}>
      <CardContent>
        <Typography  color="text.secondary" gutterBottom variant="h6">
          Singer: {props.document._source.Singer}
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
                හදේ කොතැනක හෝ හිඳී ඔබ\nනිදා නොනිදා මෙන්\nබලා අවසර සොයා කල් දැන\nවෙලා හස රැහැනින්\nපෙළයි මා, මුදා සුව දැහැනින් //\n\nසයුර ඉම රත් සිතිජ රේඛාවේ\nමියෙන හිරු සේ ගිලී ගිම් අඳුරේ\nතලා මා සිත පලා ගිය ඔබ\nදවයි මා….හද, තනිවෙනා මොහොතින්\n\nහදේ කොතැනක...\n\nඋතුම් පිවිතුරු ප්‍රේමයේ නාමෙන්\nසහස් සුවහස් පැතුම් බල මහිමෙන්\nඉනූ කඳුලද සිඳෙන්නට පෙර\nයදින්නම්…. ඔබ, මැකී යනු මතකෙන්\n\nහදේ කොතැනක…
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