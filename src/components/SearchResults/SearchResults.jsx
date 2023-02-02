import styled from "styled-components";
import { addNewTeam } from "../../api/apiFunctions";

const SearchResults = ({results, email}) =>{

    const handleAddTeam = async (team) =>{
        if(window.confirm('do you want add this team?')){
            const t = await addNewTeam(team, email)
        }
    }


    return(
        <SearchResultsContainer >
            {
                results.length !== 0 ?
                results.map((team)=>{
                    return(
                        <FindedTeam onClick={()=>{handleAddTeam(team.data().id)}}>{team.data().id}</FindedTeam>
                    );
                })
                :
                <>No coincidences</>
            }
        </SearchResultsContainer>
    );
}
const FindedTeam = styled.div`
    width: 90%;
    cursor: pointer;
    padding: 1rem;
    
    &:hover{
        background-color: #eee;
    }
`
const SearchResultsContainer = styled.section`
`
export default SearchResults;