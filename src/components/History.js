import styled, { keyframes } from 'styled-components';
import LargeText from './LargeText';
import Card from './Card';
import slideInUp from 'react-animations/lib/slide-in-up';

const Parent = styled.div`
  margin-top: 3rem;
  width: 100%;
  max-width: 960px;
  animation: 0.6s ${keyframes`${slideInUp}`};
  `;
  
  const CardContainer = styled.div`
  padding-bottom: 0.5rem;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
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