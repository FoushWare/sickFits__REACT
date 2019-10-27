import Page from '../components/Page';
import App,{Container} from 'next/app';
class MyApp extends App{
    render(){
      const {Component} = this.props;
      return(
        <Container>
          <Page>
             <Component/>
          </Page>
        </Container>
      );
    }


}
export default MyApp;
