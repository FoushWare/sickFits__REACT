import Page from '../components/Page';
import App,{Container} from 'next/app';
import {ApolloProvider} from 'react-apollo';
import withData from '../lib/withData';
class MyApp extends App{
  //This getinitialProps run before render()
    //when return something here you can exposed it with props in render()
  static async getInitialProps({Component,ctx}){
    let pageProps={};
    if(Component.getInitialProps){
      pageProps= await Component.getInitialProps(ctx);
    }
    //this exposes[show] the query to the user
    pageProps.query=ctx.query;
    return {pageProps};
  }
    render(){
      const {Component,apollo,pageProps} = this.props;
      return(
        <Container>
          <ApolloProvider client={apollo}>
            <Page>
              <Component  {...pageProps} />
            </Page>
          </ApolloProvider>
        </Container>
      );
    }


}
export default withData(MyApp) ;
