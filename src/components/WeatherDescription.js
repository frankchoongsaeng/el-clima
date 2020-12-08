import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 400;
`;


export default function ComponentName(props) {
    
  return (
    <>
      <Container>
        {props.children}
      </Container>
    </>
  )
}