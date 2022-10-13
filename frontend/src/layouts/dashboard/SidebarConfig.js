// component
import Iconify from '../../components/general/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'מדדים יומיים',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  // {
  //   title: 'נתוני לקוחות',
  //   path: '/dashboard/customers',
  //   icon: getIcon('eva:people-fill')
  // },
  {
    title: 'קניית גלידה',
    path: '/dashboard/answerCalls',
    icon: getIcon('healthicons:call-centre')
  },
  {
    title: 'חיזוי קנייה',
    path: '/dashboard/predictCall',
    icon: getIcon('mdi:axis-arrow-info')
  },
  {
    title: 'אודות',
    path: '/dashboard/about',
    icon: getIcon('akar-icons:info')
  },
  
];

export default sidebarConfig;
