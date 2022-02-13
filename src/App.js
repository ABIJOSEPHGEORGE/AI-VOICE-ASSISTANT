import React,{useState,useEffect} from 'react'
import {ChakraProvider,theme} from '@chakra-ui/react'
import Navbar from './NavBar/Navbar'
import Faq from './Faq.jsx'
import alanBtn from '@alan-ai/alan-sdk-web';
import {scroller} from 'react-scroll'

const App = () => {
  const [index, setIndex] = useState(null)
  const [toggleColorFlag, setToggleColorFlag] = useState(false)

/* ------ALAN AI INTEGRATION------ */

useEffect(() => {
  alanBtn({
      key: '512f14a72d462e1144f99e38639a3f412e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'gotoFaq') {
          scroller.scrollTo(`accordion-item-${commandData.faqId}`,{
            duration:800,
            delay:0,
            smooth:'easeInOutQuart'
          })
          setIndex(commandData.faqId-1)
          // Call the client code that will react to the received command
        }else if (commandData.command === 'toggleColorMode'){
          setToggleColorFlag(flag => !flag);
        }
      },
  });
}, []);


  return (
    <ChakraProvider theme={theme}>
      <Navbar toggleColorFlag={toggleColorFlag}/>
      <Faq index={index} setIndex={setIndex} />
    </ChakraProvider>
  )
}

export default App