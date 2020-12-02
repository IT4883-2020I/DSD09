export const sidebarMenu = [
  {
    key: 'Dashboard',
    heading: 'Bảng điều khiển',
    icon: 'fa fa-home-alt',
    route: '/dashboard',
  },
  {
    key: 'Drones',
    heading: 'Điều khiển drone',
    icon: 'fas fa-drone-alt',
    route: '/drones',
    subMenu: [
      {
        key: 'DroneState',
        heading: 'Tình trạng drone',
        icon: 'fal fa-monitor-heart-rate',
        route: '/drone-state',
      },
      {
        key: 'FlySetting',
        heading: 'Thiết lập đường bay',
        icon: 'fa fa-user-chart',
        route: '/fly-setting',
      },
      {
        key: 'DroneStatistic',
        heading: 'Thống kê drone',
        icon: 'fa fa-file-chart-line',
        route: '/drone-statistic',
      },
    ],
  },
  {
    key: 'FlightHub',
    heading: 'Flight hub',
    icon: 'fab fa-hubspot',
    route: '/flight-hub',
  },
  {
    key: 'Payloads',
    heading: 'Payloads',
    icon: 'fas fa-layer-group',
    route: '/payloads',
  },
  // {
  //   key: 'imageGallery',
  //   heading: 'Hình ảnh',
  //   icon: 'fas fa-images',
  //   route: '/imageGallery',
  // },
  // {
  //   key: 'videoGallery',
  //   heading: 'Video',
  //   icon: 'fas fa-images',
  //   route: '/videoGallery',
  // },
  {
    key: 'Problems',
    heading: 'Sự cố',
    icon: 'fas fa-times-octagon',
    route: '/drones',
    subMenu: [
      {
        key: 'Problems-list',
        heading: 'Danh sách sự cố',
        icon: 'fas fa-times-octagon',
        route: '/incidents',
      },
      {
        key: 'Propblems-imageGallery',
        heading: 'Tạo offline',
        icon: 'fas fa-images',
        route: '/imageGallery',
      },
      {
        key: 'Propblems-videoGallery',
        heading: 'Tạo từ tream',
        icon: 'fas fa-images',
        route: '/videoGallery',
      },
    ],
  },


  {
    key: 'SupervisedObject',
    heading: 'Đối tượng giám sát',
    icon: 'fas fa-binoculars',
    route: '/supervised-object',
  },
  {
    key: 'GeneralStatistic',
    heading: 'Báo cáo thống kê',
    icon: 'fas fa-chart-line',
    route: '/statistic',
  },
  {
    key: 'Warning',
    heading: 'Cảnh báo',
    icon: 'far fa-bell',
    route: '/warning',
  },
  {
    key: 'ActivityLog',
    heading: 'Lịch sử hoạt động',
    icon: 'fas fa-file-signature',
    route: '/activity-log',
  },
  {
    key: 'SurveillanceDomain',
    heading: 'Miền giám sát',
    icon: 'fas fa-crop-alt',
    route: '/surveillance-domain',
  },
  {
    key: 'HandleProblem',
    heading: 'Xử lý sự cố',
    icon: 'fas fa-toolbox',
    route: '/handle-problem',
  },
  {
    key: 'UserManagement',
    heading: 'Quản lý người dùng',
    icon: 'fas fa-user-circle',
    route: '/user-management',
  },
];
