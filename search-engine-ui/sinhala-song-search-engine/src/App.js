//in client/src/App.js
import axios from 'axios';
import { useState,useEffect } from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField } from '@mui/material';
import LeftPanel from './leftPanel';
import SongCard from './songCard';
import SearchIcon from '@mui/icons-material/Search';

const App = () => {
  const [query,setQuery] = useState('')
  const [documents,setDocuments] = useState([])
  const [matchAll, setmatchAll] = useState(true);
  const [singer, setsinger] = useState(true);
  const [songName, setsongName] = useState(true);
  const [sourceDomain, setsourceDomain] = useState(true);
  const [targetDomain, settargetDomain] = useState(true);
  const [album, setalbum] = useState(true);
  const [lyrics, setlyrics] = useState(true);
  const [metaphor, setmetaphor] = useState(true);
  const [disableMatchingFields, setDisableMatchingFields] = useState(true);
  //const filterList = [{Album: ["abc","shbhxs"]},{Year:["1965", "1999","2000"]}]
  const [filter, setfilters] = useState([]);
  const [isFiltersLoaded, setIsFiltersLoaded] = useState(false);
  const [filterChecked, setFiltersChecked] = useState([]);
  const [filtersSet,setFiltersSet]= useState(false)
  const [allDataLoaded,setAllDataLoaded]= useState(false)

  function changeFilterChecked (filtersArray){
    var newFilterArray = []
    //console.log("fun",filtersArray,filtersArray.length)
    for (var fil = 0;fil<filtersArray.length;fil++){
      //console.log("fill")
      const keys = Object.keys(filtersArray[fil])
      
      const values = filtersArray[fil][keys[0]]
      //console.log(values)
      const arr = []
      for (var val=0;val<values.length;val++){
        arr.push(false)

      }
      const obj = {}
      obj[keys[0]]=arr
      newFilterArray.push(obj)
    }
    setFiltersChecked(newFilterArray)
    
  }
  useEffect(()=>{
    getFilterData()
  },[])

  useEffect(()=>{
    if(isFiltersLoaded && filter.length>0 && filterChecked.length>0){
      sendSearchSongRequest()
    }
    
  },[filter,filterChecked])

 

  useEffect(() => {
    if(isFiltersLoaded){
      
      changeFilterChecked(filter)
      setFiltersSet(true)
    }
  },[isFiltersLoaded]);
  
  

  const changeMatchAll = (allVal)=>{
    if(allVal == true){
      setDisableMatchingFields(false)
      setmatchAll(false)
      setsinger(false)
      setsongName(false)
      setsourceDomain(false)
      setalbum(false)
      setlyrics(false)
      setmetaphor(false)
      settargetDomain(false)

    }
    else{
      setDisableMatchingFields(true)
      setmatchAll(true)
      setsinger(true)
      setsongName(true)
      setsourceDomain(true)
      setalbum(true)
      setlyrics(true)
      setmetaphor(true)
      settargetDomain(true)
    }
  }

  const getMatchResults =()=>{
    var mResults=[]
    if(singer){
      mResults.push('Singer')
    }
    if(songName){
      mResults.push('Song Name')
    }
    if(sourceDomain){
      mResults.push('source domain')
    }
    if(album){
      mResults.push('Album')
    }
    if(lyrics){
      mResults.push('Lyrics')
    }
    if(metaphor){
      mResults.push('Metaphor')
    }
    if(targetDomain){
      mResults.push('target domain')
    }
    return mResults
  }

  const getFinalFilters = ()=>{
    var filtersObj = {}
    console.log(filterChecked)
    for (var t=0; t<filter.length;t++){
      const key = Object.keys(filter[t])
      var checkedVal = filterChecked[t][key[0]]
      var filtVal = filter[t][key[0]]
      var array =[]
      for (var v =0;v < checkedVal.length; v++){
        if(checkedVal[v]==true){
          array.push(filtVal[v]['key'])
        }
      }
      filtersObj[key[0]+'.keyword'] = array
    }
    return filtersObj

  }

  const getFilterData = () => {
    const results = {
      method: 'GET',
      url: 'http://localhost:3001/filters',
    };
    axios
      .request(results)
      .then((response) => {
        const keys = Object.keys(response.data)
        const newArrayF = []
        for(var c=0;c<keys.length;c++){
          var newObj = {}
          newObj[keys[c].slice(0,keys[c].length-8)] = response.data[keys[c]]
          newArrayF.push(newObj)
        }
        setfilters(newArrayF)

        setIsFiltersLoaded(true)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sendSearchSongRequest = () => {
    var queryObject = {}
    const search = query
    const matchResults = getMatchResults()
    const finalFilters = getFinalFilters()
    queryObject['search'] = search
    queryObject['matchResults'] = matchResults

    queryObject['filters']=finalFilters

    const newObj = JSON.stringify(queryObject)
    console.log("searching ", newObj)

    const results = {
      method: 'GET',
      url: 'http://localhost:3001/results',
      params: {
        searchQuery: newObj
      },
    };
    axios
      .request(results)
      .then((response) => {
        console.log("data",response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function setQueryVal(e){
    setQuery(e.target.value)
  }

  return (
    <div>
      <Grid container fullWidth sx={{backgroundColor:'#e0e0e0',paddingBottom:"1000px"}}>
      <div>
          <div> 
            <AppBar position="static" sx={{backgroundColor:'#424242'}}>
              <Toolbar sx={{fontSize: "28px", fontWeight:600}}>
                Sinhala Song Search Engine         
              </Toolbar>
            </AppBar>
              <Grid container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{marginTop:"60px"}}>
                <Grid item sx={{width:"1000px"}}>
                <TextField id="outlined-basic" label="Search Here......." variant="outlined" fullWidth onChange={setQueryVal}/>
                </Grid>
                <Grid item>
                <Button variant="contained" onClick={sendSearchSongRequest} endIcon={<SearchIcon />} sx={{backgroundColor:'#424242', ':hover': {
      bgcolor: 'black', 
      
    }}}>Search</Button>
                </Grid>
              </Grid>

              <Grid container direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{marginTop: '20px'}}>
                <Grid item sx={{color:'black'}}>
                  Matching Fields: 
                </Grid>
                <Grid item>
                <FormGroup>
                  <Grid container direction="row" justifyContent="center"
                alignItems="center" sx={{color:'black'}}>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {matchAll} onChange={()=>changeMatchAll(matchAll)}/>} label="All Fields" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {singer} disabled={disableMatchingFields}  onChange={()=>setsinger(!singer)}/>} label="Singer" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox  checked= {songName} disabled={disableMatchingFields} onChange={()=>setsongName(!songName)}/>} label="SongName" />
                    </Grid>
                    
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {album} disabled={disableMatchingFields} onChange={()=>setalbum(!album)}/>} label="Album" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {lyrics} disabled={disableMatchingFields} onChange={()=>setlyrics(!lyrics)}/>} label="Lyrics" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {metaphor} disabled={disableMatchingFields} onChange={()=>setmetaphor(!metaphor)}/>} label="Metaphor" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {sourceDomain} disabled={disableMatchingFields} onChange={()=>setsourceDomain(!sourceDomain)}/>} label="Source Domain" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {targetDomain} disabled={disableMatchingFields} onChange={()=>settargetDomain(!targetDomain)}/>} label="Target" />
                    </Grid>
                  </Grid>
                  
                  
                </FormGroup>
                  
                </Grid>
                
              </Grid>

              <Grid container direction="row" justifyContent='flex-start' sx={{marginTop:'80px'}}>
                <Grid item xs={3}>
                  {filtersSet==true && filterChecked.length>0?<LeftPanel filters={filter} checkedFilters={filterChecked} setFiltersChecked={setFiltersChecked}/>:null}
                  
                </Grid>
                
                <Grid item xs={9} sx={{paddingLeft:'10%',paddingRight:'10%', color:'white'}}>
                  <Grid sx={{color:'black', fontSize:'22px',fontWeight:400, marginBottom:'10px'}}><div>Number of Hits: {documents.length}</div></Grid>
                  
                  <div>
                  {documents.map(function(document, i){
                            return <div>
                              <SongCard document={document}/>
                              </div>
                    })}
                  </div>
                
                  
                </Grid>
              </Grid>

          </div>
          <br></br>
        
      </div>
      </Grid>
    </div>
  );
};

export default App;