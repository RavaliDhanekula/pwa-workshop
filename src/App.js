import React, { Component } from 'react';

//import logo from './logo.svg';
// import './App.css';
import { props } from './data.js';
import { ThemeProvider, GreenButton, Text, Box , Card, Image, Flex } from 'pcln-design-system';

// import { urlBase64ToUint8Array } from './utility'

const ListingFlex = Flex.extend`
  flex-direction: column;
`;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service_worker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    }).catch(function(err) {
      console.log(err)
    });
  });
  
} else {
  console.log('service worker is not supported');
}

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <ListingFlex>
      {render_listing()}
      </ListingFlex>
     </ThemeProvider>
    )
  }
}

export default App;

function render_listing() {
    return props.map( props => {
      return (
        <Card my={3}>
          <Flex align='center'>
            <Box width={0.25}>
              <Image src={props.imageURL} alt="image"/>
            </Box>
            <Box width={0.5} mx={3}>
              <Text bold color='blue' fontSize={3}>
                {props.hotelName}
              </Text>
                <Text bold color='orange' fontSize={3}>
                Neighborhood: {props.hotelLocation}
              </Text>
            </Box>
            <Box width={0.25}>
              <GreenButton>
                Book for ${props.price}
              </GreenButton>
            </Box>
          </Flex>
        </Card>)
    }
  )     
}
