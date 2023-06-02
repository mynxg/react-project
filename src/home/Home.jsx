import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Button, Message } from '@arco-design/web-react';
import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft, IconSettings, IconBulb,
  IconArchive,IconStorage,IconTool,
 } from '@arco-design/web-react/icon';
// import IconUsers from './icon/IconUsers.svg';
import IconUsers from "../assets/IconUsers";
import IconMenu from "../assets/IconMenu";
import IconUser from "../assets/IconUser";
import IconOrder from "../assets/IconOrder";
import IconShop from "../assets/IconShop";
import IconTic from "../assets/IconTic";
import IconData from "../assets/IconData";
import { Link, Outlet } from 'react-router-dom';
import Drop from '../common/Drop';
import Footers from '../components/Footers';
import F from '../components/F';
import "../css/home.css";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;


function Home() {

  const [collapsed, setCollapsed] = useState(false)
  const [itemName, setItemName] = useState("商品管理");

  // const [itemId,setItemId] = useState("1_1");
  // const [itemLink,setItemLink] = useState("");


  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className='layout-collapse-demo'>
      <Sider collapsed={collapsed} collapsible trigger={null} breakpoint='xl'>
        {/* <div className='logo' ></div> */}

        <Menu
          defaultOpenKeys={['1']}
          defaultSelectedKeys={['1_1']}
          onClickMenuItem={(key, event) =>
            Message.info({
              content: `You select ${key}, ${event.target.innerText}`,
              showIcon: true,
            },
              setItemName(event.target.innerText),

              // this.setState({  
              //   setItemName: event.target.innerText,
              //   itemId: key,
              //   // itemLink: key=="3_1"?"commodityManagementChange":"commodityManagement",
              //   }),
            )

          }
          // style={{ width: '100%' }}
        >

          <MenuItem key='0_1' disabled>
            <IconHome />
            主页
          </MenuItem>

          <SubMenu
            key='1'
            title={
              <span>
                <IconSettings />
                基础管理
              </span>
            }
          >
            <MenuItem key='1_1'><Link to="commodityManagement"><IconShop/>  商品管理</Link></MenuItem>
          </SubMenu>
          <SubMenu
            key='2'
            title={
              <span>
                <IconTic />
                订单管理
              </span>
            }
          >
            <MenuItem key='2_1'><Link to="tradeOrder"><IconOrder/>交易订单</Link></MenuItem>
          </SubMenu>

          <SubMenu
            key='3'
            title={
              <span>
                <IconStorage />
                系统管理
              </span>
            }
          >
            <MenuItem key='3_1'><Link to="userManagement"><IconUsers />用户管理</Link></MenuItem>
            <MenuItem key='3_2'><Link to="menuManagement"><IconMenu />菜单管理</Link></MenuItem>
            <MenuItem key='3_3'><Link to="roleManagement"><IconUser />角色管理</Link></MenuItem>
            <MenuItem key='3_4'>公司管理</MenuItem>
            <MenuItem key='3_5'><IconTool />系统环境变量</MenuItem>
            {/* <MenuItem key='3_6'>权限管理</MenuItem> */}
          </SubMenu>
          <SubMenu
            key='4'
            title={
              <span>
                <IconCalendar />
                支付管理
              </span>
            }
          >
            <MenuItem key='4_1'>支付配置信息</MenuItem>
            <MenuItem key='4_2'>支付配置</MenuItem>
          </SubMenu>
          <SubMenu
            key='5'
            title={
              <span>
                <IconData />
                图表
              </span>
            }
          >
            <MenuItem key='5_1'>数据可视化</MenuItem>
          </SubMenu>
          <SubMenu
            key='6'
            title={
              <span>
                <IconBulb />

              </span>
            }
          >
            {/* <MenuItem key='5_1'>数据可视化</MenuItem>          */}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>

        <Header style={{}}>
          <Button shape='round' className='trigger' onClick={handleCollapsed}>
            {collapsed ? <IconCaretRight /> : <IconCaretLeft />}
          </Button>
          <Drop />
        </Header>
        <Layout style={{ padding: '0 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>{itemName}</Breadcrumb.Item>
          </Breadcrumb>
          <Content>
            {/* <Routes>
            
              <Route path='/' element={<CommodityManagement />} />
              <Route path='/commodityManagement' element={<CommodityManagement />} />
              
              <Route path='/commodityManagementChange' element={<CommodityManagementChange/>}/>
            </Routes> */}
            <Outlet />
          </Content>
          <Footer></Footer>
        </Layout>
      
      </Layout>
      
    </Layout>

  );
}

export default Home;
