import styled  from 'styled-components';
import LargeText from './LargeText';
import Card from './Card';

const Parent = styled.div`
  margin-top: 3rem;
  width: 100%;
  max-width: 960px;
`;

const CardContainer = styled.div`
  display: flex;
`;

export default function History(props) {


    
  return (
    <Parent>
      <LargeText>History</LargeText>
      <CardContainer>
        {
          (() => {
            if(props.historylist.length > 0){

                let tempHistoryList = [];
                for (let i = 0; i < props.historylist.length && i < 7; ++i){
                  tempHistoryList.push(<Card key={i} data={props.historylist[i]} />)
                }

                // return props.historylist.map((weatherdata, i) => return i < 7 ? <Card data={weatherdata} />)
                return tempHistoryList;

            }
            else
              return <p style={{color: "white"}}>No search history to display</p>
          })()
        }
     
      </CardContainer>
    </Parent>
  )
}