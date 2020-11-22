const idDeDieu = "5fb9da20a6183a3210f82ec4";
const idLuoiDien = "5fb9da20a6183a3210f82ec7";
const idChayRung = "5fb9da20a6183a3210f82ec6";
const idCayTrong = "5fb9da20a6183a3210f82ec5";

const adminUser = "5fb55512ae1a5e0910c315cc";
const testUser = "5fb55512ae1a5e0910c315cd";
const adminChayRung = 2;
const adminLuoiDien = 3;
const adminDeDieu = 4;
const adminCayTrong = 5;

const openStatus = "5fba2e79a1e657329c688903";
const inProgressStatus = "5fba2e7aa1e657329c688904";
const resolvedStatus = "5fba2e7aa1e657329c688905";

const normalLevel = "5fba2e7aa1e657329c688906";
const urgencyLevel = "5fba2e7aa1e657329c688907";

const incidents = [
  {
    name: "Mưa lũ tại miền núi phía Bắc gây hàng loạt sự cố đê điều nguy hiểm",
    description:
      "Mưa lũ tại miền núi phía Bắc đã ảnh hưởng đến hệ thống đê điều nhiều nơi. Đặc biệt là tại Hà Nội và Phú Thọ.",
    location: "đê Hữu Hồng (Ba Vì)",
    status: openStatus,
    level: normalLevel,
    createdBy: adminDeDieu,
    assignedBy: adminDeDieu,
    assignee: [adminDeDieu, adminCayTrong],
    dueDate: "2020-09-28",
    loggedTime: 14400,
    type: idDeDieu,
    videos: [{ url: "https://drive.google.com/uc?id=WNYNk31Ze2Gxt9IoDMvHxLx2E4HTq95R" }]
  },
  {
    name: "Bão lũ sắp dồn dập tấn công, đê điều tại Việt Nam có đủ sức chống lũ?",
    description:
      "Hệ thống đê điều góp phần rất lớn trong an toàn phòng lũ, đảm bảo an toàn dân sinh. Tuy nhiên, do chưa có quy hoạch ứng phó bài bản nên vẫn xảy ra tình trạng chạy theo sự cố, hỏng đến đâu, vá đến đấy. Giải pháp nào để đảm bảo an toàn đê điều khi mùa bão lũ sắp dồn dập?",
    location: "đê Hữu Đáy (Mỹ Đức)",
    status: inProgressStatus,
    level: normalLevel,
    createdBy: adminDeDieu,
    assignedBy: adminDeDieu,
    assignee: [adminDeDieu],
    dueDate: "2020-09-29",
    loggedTime: 14400,
    type: idDeDieu
  },
  {
    name: "Nổ tại trạm biến áp Hiệp Bình Phước, TP.HCM cúp điện diện rộng",
    description:
      "TTO - Khoảng 15h30 ngày 15-4, người dân sống trên đường số 3, phường Hiệp Bình Phước, quận Thủ Đức, TP.HCM nghe tiếng nổ phát ra từ trạm biến áp Hiệp Bình Phước và liền sau đó nhiều khu vực bị cúp điện.",
    location: "Đường số 3, phường Hiệp Bình Phước, quận Thủ Đức, TP.HCM",
    status: resolvedStatus,
    level: urgencyLevel,
    createdBy: adminLuoiDien,
    dueDate: "2020-09-30",
    loggedTime: 7200,
    type: idLuoiDien
  },
  {
    name: "Đà Nẵng: Bất cẩn đốt thực bì gây cháy rừng",
    description:
      "Ngày 17.9, Công an H.Hòa Vang (TP.Đà Nẵng) xác định nguyên nhân vụ cháy rừng ở xã Hòa Nhơn (H.Hòa Vang) hôm 15.9 là do người dân đốt thực bì gây cháy lan.",
    location: "Thôn Phước Thiện - Phước Hậu (xã Hòa Nhơn, H.Hòa Vang)",
    status: openStatus,
    level: normalLevel,
    createdBy: adminChayRung,
    dueDate: "2020-12-30",
    loggedTime: 7200,
    type: idChayRung,
    images: [{ url: "https://drive.google.com/uc?id=1JhMh7K9Bp8x8J-5e1U6xZ0WoC5Guu5GW" }]
  },
  {
    name: "Vấn nạn cháy rừng ở Việt Nam",
    description:
      "Thời gian qua, do ảnh hưởng của biến đổi khí hậu dẫn đến diễn biến thời tiết thất thường khiến nhiều diện tích rừng Việt Nam bị thiêu rụi và đe dọa nghiêm trọng đến thảm thực vật rừng, cũng như ảnh hưởng tới phát triển kinh tế - xã hội, môi trường, khí hậu… Do đó, cháy rừng đang trở thành vấn đề nghiêm trọng của quốc gia cần có sự chung tay vào cuộc mạnh mẽ hơn nữa của toàn bộ hệ thống chính trị và ý thức của người dân trong bảo vệ và phát triển rừng Việt Nam.",
    location: "Việt Nam",
    status: openStatus,
    level: urgencyLevel,
    createdBy: adminChayRung,
    dueDate: "2020-12-30",
    loggedTime: 7200,
    type: idChayRung
  },
  {
    name: "Vấn nạn cháy rừng ở Việt Nam",
    description:
      "Thời gian qua, do ảnh hưởng của biến đổi khí hậu dẫn đến diễn biến thời tiết thất thường khiến nhiều diện tích rừng Việt Nam bị thiêu rụi và đe dọa nghiêm trọng đến thảm thực vật rừng, cũng như ảnh hưởng tới phát triển kinh tế - xã hội, môi trường, khí hậu… Do đó, cháy rừng đang trở thành vấn đề nghiêm trọng của quốc gia cần có sự chung tay vào cuộc mạnh mẽ hơn nữa của toàn bộ hệ thống chính trị và ý thức của người dân trong bảo vệ và phát triển rừng Việt Nam.",
    location: "Việt Nam",
    status: inProgressStatus,
    level: urgencyLevel,
    createdBy: adminChayRung,
    assignedBy: adminChayRung,
    assignee: [adminChayRung],
    dueDate: "2020-12-30",
    loggedTime: 7200,
    type: idChayRung,
    images: [{ url: "https://drive.google.com/uc?id=1JhMh7K9Bp8x8J-5e1U6xZ0WoC5Guu5GW" }]
  },
  {
    name: "Trồng 1 tỉ cây xanh, được không?",
    description:
      "GS.TS Vương Văn Quỳnh, nguyên viện trưởng Viện sinh thái rừng và môi trường - Trường ĐH Lâm nghiệp, phân tích: 1 tỉ cây xanh nếu quy ra diện tích tương đương 300.000 - 400.000ha rừng trồng. Đây là diện tích không quá lớn nếu kết hợp cả trồng rừng tập trung cũng như trồng cây phân tán. ",
    location: "Việt Nam",
    status: resolvedStatus,
    level: normalLevel,
    createdBy: adminChayRung,
    dueDate: "2020-12-30",
    loggedTime: 7200,
    type: idChayRung,
    images: [{ url: "https://drive.google.com/uc?id=1vni2i2w2YMAZfelRXilxaEvcygKIEWvd" }]
  },
  {
    name: "Bị cây xanh ngã đè: Ai chịu trách nhiệm?",
    description:
      "TTO - Sự việc cây xanh gãy đổ gây chết người gần đây lại dấy lên sự bức xúc, lo lắng của nhiều người dân, nhất là khi những 'cái chết từ trên trời rơi xuống' không phải lần đầu tiên và trách nhiệm đối với nhân mạng chưa được giải quyết tương ứng.",
    location: "Việt Nam",
    status: openStatus,
    level: urgencyLevel,
    createdBy: adminChayRung,
    dueDate: "2020-12-30",
    loggedTime: 7200,
    type: idChayRung,
    images: [
      { url: "https://drive.google.com/uc?id=1JhMh7K9Bp8x8J-5e1U6xZ0WoC5Guu5GW" },
      { url: "https://drive.google.com/uc?id=1vni2i2w2YMAZfelRXilxaEvcygKIEWvd" }
    ]
  }
];

export default incidents;
