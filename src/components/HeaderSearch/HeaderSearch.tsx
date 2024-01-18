import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, InputLabel, MenuItem, FormControl, Box, OutlinedInput, Checkbox, ListItemText, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    display: "flex",
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
            width: 150,
        },
    },
};

const typesList = [
    "Album", "Artist", "Playlist", "Track", "Show", "Episode"
];



export const HeaderSearch = () => {

    // const theme = useTheme();
    const [type, setType] = useState<string[]>([]);
    const [searchText, setSearchText] = useState("")

    const handleChange = (event: SelectChangeEvent<typeof type>) => {
        const {
            target: { value },
        } = event;
        setType(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>

            <Box sx={{
                paddingLeft: "3.5rem",
            }}>
                {/* <FormControl sx={{ width: 100 }} size="small">
                    <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={type}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', overflow: "scroll", gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {typesList.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, type, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}

                <FormControl sx={{ width: 100 }} size="small">
                    <InputLabel id="demo-multiple-checkbox-label">Types*</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={type}
                        onChange={handleChange}
                        input={<OutlinedInput label="Types" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {typesList.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={type.indexOf(name) > -1} />
                                <ListItemText primary={name} sx={{
                                    "& .css-1cy0rh6-MuiButtonBase-root-MuiMenuItem-root": {
                                        padding: "0.5rem",
                                    }
                                }} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => {
                    // console.log(e.target.value)
                    setSearchText(e.target.value)
                }}
            />
            <Button variant='contained' >Search</Button>
        </Search>
    )
}