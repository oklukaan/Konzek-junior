"use client"
import { useAutocomplete } from '@mui/base/useAutocomplete';
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { styled } from '@mui/system';
import { getStaticProps } from '@/app/helper.js/getProps';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';



export default function Home() {
  const [data, setData] = useState(null);
  const [kes, setKes] = useState(null);
  const [variable, setVariable] = useState<CountryData | null>(null);
  const [value, setValue] = useState<any | null>(
    null,
  );
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: top100Films,
    getOptionLabel: (option) => option.label,
    value,
    onChange: (event, newValue) => setValue(newValue),
  });

  useEffect(() => {
    async function fetchData() {
      const result = await getStaticProps(kes);
      setVariable(result);
    }
    fetchData();
  }, [kes]);

  function senderFunc() {
    setKes(value.label);
  }

  console.log("value", value);


  const { country } = variable?.data || {};

  return (
    <main className={styles.main}>
      <div className='content-type'>
        {country && (
          <div className='list-country'>
            <div className='list-item'>
              <div><span>Capital</span>:{country.capital}</div>
              <div><span>Country Name</span>:{country.name}</div>
              <div><span>Native</span>:{country.native} </div>
              <div><span>Emoji</span>:{country.emoji}</div>
              <div><span>Currency</span>:{country.currency}</div>
              <div><span>Languages/Code</span>:{country.languages[0].code}</div>
              <div><span>Languages/name</span>:{country.languages[0].name}</div>

            </div>
          </div>
        )}
        <Label {...getInputLabelProps()}>Pick a country details information</Label>
        <Root {...getRootProps()} className={focused ? 'Mui-focused' : ''}>
          <Input {...getInputProps()} />
        </Root>
        {groupedOptions.length > 0 && (
          <Listbox  {...getListboxProps()}>
            {(groupedOptions as typeof top100Films).map((option, index) => (
              <Option  {...getOptionProps({ option, index })}>{option.label}</Option>
            ))}
          </Listbox>
        )}
        <Stack spacing={2} direction="row">
          <Button onClick={senderFunc} variant="contained" className=''>Search</Button>
        </Stack>
      </div>

      <Link className='custom-btn' href={'/pages'}>Go to The Next Page</Link>
    </main>
  );
}


interface CountryData {
  data: {
    country: {
      name: string;
      native: string;
      capital: string;
      emoji: string;
      currency: string;
      languages: {
        code: string;
        name: string;
      }[];
    };
  }
}


const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
  display: flex;
  gap: 5px;
  padding-right: 5px;
  overflow: hidden;
  width: 320px;

  &.Mui-focused {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const Input = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  max-height: 300px;
  z-index: 1;
  position: absolute;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 2px 3px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  `,
);
const Label = styled('label')`
  display: block;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;
const Option = styled('li')(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected=true] {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.base--focused,
  &.base--focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.base--focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &[aria-selected=true].base--focused,
  &[aria-selected=true].base--focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);
const top100Films = [
  { label: 'TR' },
  { label: 'BR' },
  { label: 'GR' },
  { label: 'AL' },
  { label: 'FR' },
  { label: 'US' },
  { label: 'CA' },
  { label: 'DE' },
  { label: 'IT' },
  { label: 'JP' },
  { label: 'GB' },
  { label: 'AU' },
  { label: 'NZ' },
  { label: 'CN' },
  { label: 'IN' },
  { label: 'RU' },
  { label: 'SA' },

];