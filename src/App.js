import { Flex, Layout, Spin } from 'antd';
import FormProduct from './layouts/Form/FormProduct';
import { useApp } from './context/app-context';
const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#000',
  backgroundColor: '#fff',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
  maxHeight: '100%',
  height: '100vh'
};


const App = () => {
  const {loading} = useApp()
  
  if(loading){
    return <Spin fullscreen/>
  }
  return(
  <>
    

    <Layout style={layoutStyle}>
     
      <Layout>
        {/* <Header style={headerStyle}>Header</Header> */}
        <Content style={contentStyle}>
          <FormProduct/>
        </Content>
        {/* <Footer style={footerStyle}></Footer> */}
      </Layout>
    </Layout>
  </>
  )
};
export default App