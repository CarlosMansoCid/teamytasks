import styled from "styled-components";
import {BsSearch} from "react-icons/bs"
import { getData, getDataFilter } from "../../api/apiFunctions";
import { useState } from "react";


const SearchBar = ({findedTeams, handleFinding}) =>{


    const handleSearch = async (e) =>{
        e.preventDefault()
        handleFinding(true)
        const team = await getDataFilter('id', e.target.finded.value, 'teams')
        console.log(team)
        findedTeams(team, e.target.finded.value)
        handleFinding(false)
    }

    return(
        <SearchBarContainer onSubmit={(e)=>{handleSearch(e)}}>
            <SearchBarInput name="finded" placeholder="search team" required></SearchBarInput>
            <SearchLogo type="input">
                <BsSearch/>
            </SearchLogo>

        </SearchBarContainer>
    );
}
const SearchLogo = styled.button`
    border: none;
    background-color: #fff;
    cursor: pointer;
`
const SearchBarContainer = styled.form`

`
const SearchBarInput = styled.input`
    border: none;
    padding:.3rem;
    width:65%;

    &:focus{
        outline: none;
    }
`
export default SearchBar;