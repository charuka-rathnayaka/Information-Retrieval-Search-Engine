import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Grid } from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LeftPanel = (prop)=>{
    function changeCheckedVal(i,name,j){
        const newArray = [].concat(prop.checkedFilters)
        newArray[i][name][j] = !newArray[i][name][j]
        prop.setFiltersChecked(newArray)
    }
    return(
        <div>
            <Grid  container
                direction="column"
                justifyContent="center"
                sx={{}}
                >
                <Grid item sx={{ marginLeft:'20px', marginRight:'20px'}}>
                    <Grid sx={{justifyContent:'center', marginLeft:'10%',marginBottom:'20px', fontSize:"20px", fontWeight:"500", paddingTop:'20px', color:'black'}}>Filter by</Grid>
                    <div>
                        {prop.filters.map(function(filter, i){
                            return <div>
                                    <Accordion sx={{marginTop:"10px", backgroundColor:'#9e9e9e', color:'black'}}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                            <Grid item sx={{fontSize:'17px', justifyContent:'left', marginLeft:"12%"}}>
                                                {[Object.keys(filter)[0]]}
                                            </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Grid item sx={{marginLeft:"15%"}}>
                                    {filter[Object.keys(filter)[0]].map(function(value,j){
                                        return <div>
                                            <Grid container direction="row" alignItems='center'>
                                                <Grid item xs={3}>
                                                    <Checkbox checked={prop.checkedFilters[i][Object.keys(filter)[0]][j]} onChange={()=>changeCheckedVal(i,Object.keys(filter)[0],j)}/>
                                                </Grid>
                                                <Grid item xs={9}>
                                                {value['key'] } {prop.checkedFilters[i][Object.keys(filter)[0]][j]}
                                                </Grid>  
                                            </Grid>
                                            
                                        </div>
                                    })}
                                    </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                    <div>
                                    
                                    </div>
                                    
                                    

                            </div>
                        })}
                        
                    </div>
                </Grid>
            </Grid>

        </div>
    )

}

export default LeftPanel;