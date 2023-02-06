import * as React from 'react';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
interface ISearchBarProps {
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
      };


  return <>


  <Grid container  sx={{ minWidth: 120, width:"80%", padding:"1% 0 1% 0", margin:"0 8% 0 8%",
   display:"flex", flexDirection:{xs:"column", md:"row"}, justifyContent:"space-around", border:"2px solid red", borderRadius:"8px",
    position:"absolute", gap:"1rem", backgroundColor:"white",bottom:{ xs:"-50%" ,sm:"-40%", md:'-10%', lg:'-8%'} }}>
   
   
  <FormControl  sx={{width:{xs:"100%", md:"30%", lg:"30%"}, }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Where are you going?
        </InputLabel>
        <NativeSelect
        //   defaultValue={0}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
            
          }}
         
        >
          <option style={{fontWeight:900, color:"red"}}>Destinations</option>
          <option value={10}>Hampi</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
      

  <FormControl sx={{width:{xs:"100%", md:"30%", lg:"30%"}, }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Activity Type
        </InputLabel>
        <NativeSelect
          defaultValue={0}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
          
        >
          <option value={0}>Tour Type</option>
          <option value={10}>Hampi</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>

      
      <Stack  spacing={2} direction="row">
      <Button variant="contained"  sx={{width:"150%"}}>Search</Button>
      </Stack>
    </Grid>
  </>;
};

export default SearchBar;
