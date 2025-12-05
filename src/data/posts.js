// src/data/posts.js
export const posts = [
  {
    id: 1,
    title: "Quái vật tốc độ: Siêu xe Bugatti Chiron",
    date: "2025-12-05",
    category: "Siêu xe",
    youtubeId: "PkkV1vLHUvQ",
    image: "/images/anhBia/chiron.jpg",
    // Đã xóa trường excerpt, giờ nó sẽ tự lấy từ content bên dưới
    content: `
      <p>Bugatti Chiron không chỉ là một chiếc xe hơi, nó là một kiệt tác nghệ thuật cơ khí, là đỉnh cao của sự sang trọng và tốc độ mà con người có thể chạm tới trong kỷ nguyên động cơ đốt trong.</p>
      
      <h3>Sức mạnh từ trái tim W16</h3>
      <p>Trái tim của Chiron là khối động cơ W16 8.0L khổng lồ với 4 bộ tăng áp (Quad-turbo). Cỗ máy này sản sinh công suất khủng khiếp lên tới <strong>1.500 mã lực</strong> và mô-men xoắn cực đại 1.600 Nm. Để dễ hình dung, sức mạnh này tương đương với khoảng 15 chiếc Toyota Vios cộng lại.</p>
      
      <img src="/images/anhMinhHoa/chiron.jpg" alt="Động cơ Bugatti Chiron">

      <h3>Khả năng vận hành</h3>
      <ul>
        <li>Tăng tốc 0-100 km/h: Dưới 2.5 giây</li>
        <li>Tăng tốc 0-200 km/h: Dưới 6.5 giây</li>
        <li>Tốc độ tối đa: Được giới hạn điện tử ở 420 km/h (mặc dù xe có thể chạy nhanh hơn thế).</li>
      </ul>
      <img src="/images/anhMinhHoa/chiron2.png" alt="Động cơ Bugatti Chiron">
      <h3>Thiết kế và Nội thất</h3>
      <p>Bên trong khoang lái, mọi thứ đều được bọc da cao cấp, sợi carbon và nhôm nguyên khối. Bạn sẽ không tìm thấy bất kỳ chi tiết nhựa rẻ tiền nào. Dải đèn LED hình chữ C đặc trưng chia đôi khoang lái tạo nên vẻ đẹp vừa cổ điển vừa viễn tưởng.</p>
      <img src="/images/anhMinhHoa/chiron3.png" alt="Nội thất Bugatti Chiron">
      <p>Sở hữu một chiếc Chiron không chỉ là sở hữu một phương tiện di chuyển, mà là sở hữu một tấm vé gia nhập vào câu lạc bộ những người giàu có và đam mê tốc độ nhất hành tinh.</p>
    `,
  },
  {
    id: 2,
    title: "Phía sau nghi can X: Khi Toán học che giấu Tội ác",
    date: "2025-12-06",
    category: "Review Sách",
    youtubeId: "R_lPhL3wgkg", // Để null để web tự động hiện ảnh bìa thay vì video
    image: "/images/anhBia/NghiCanX-cover.jpg", // Nhớ tải ảnh về bỏ vào thư mục public/images/sach/
    content: `
      <p>Nếu bạn nghĩ truyện trinh thám chỉ là việc đi tìm "Hung thủ là ai?", thì <strong>Phía sau nghi can X</strong> của Keigo Higashino sẽ thay đổi hoàn toàn quan điểm đó. Ngay từ chương đầu tiên, tác giả đã cho chúng ta biết hung thủ. Nhưng câu hỏi lớn nhất đọng lại là: <em>"Hắn đã che giấu điều đó như thế nào?"</em></p>
      
      <h3>Cuộc đấu trí giữa hai thiên tài</h3>
      <p>Câu chuyện xoay quanh Ishigami - một thiên tài toán học ẩn mình trong vỏ bọc giáo viên cấp 3, và Yukawa - giáo sư vật lý với biệt danh "Galileo". Hai người bạn cũ, hai bộ óc vĩ đại đứng ở hai bên chiến tuyến của một vụ án mạng.</p>

      <blockquote>
        "Việc nghĩ ra một bài toán vô cùng khó và việc giải bài toán đó, việc nào khó hơn?"
      </blockquote>

      <p>Câu hỏi này không chỉ là thách thức toán học, mà là ẩn dụ xuyên suốt cho toàn bộ bi kịch của câu chuyện. Ishigami đã thiết lập một "bài toán" hoàn hảo để bảo vệ người phụ nữ anh thầm yêu.</p>

      <img src="/images/anhMinhHoa/NghiCanX.jpg" alt="Phía sau nghi can X">

      <h3>Sự hy sinh nhân danh tình yêu</h3>
      <p>Điều ám ảnh nhất của cuốn sách không phải là thủ thuật gây án, mà là động cơ phía sau nó. Đó không phải là tội ác vì tham lam hay thù hận, mà là một sự hiến dâng. Ishigami dùng logic lạnh lùng của toán học để bảo vệ một thứ tình cảm nóng hổi và đau đớn.</p>
      
      <h3>Kết luận</h3>
      <p>Gấp lại cuốn sách, bạn sẽ không cảm thấy thỏa mãn như khi bắt được tội phạm thông thường. Thay vào đó là một nỗi buồn day dứt. Đây xứng đáng là một trong những tiểu thuyết trinh thám xuất sắc nhất của văn học Nhật Bản hiện đại.</p>
    `,
  },
  {
    id: 3,
    title: "Phương trình hạ chí: Bài toán buồn của đại dương",
    date: "2025-12-07",
    category: "Review Sách",
    youtubeId: "5klMkOEz6Hg", // Để null để hiện ảnh bìa (hoặc tìm trailer phim Manatsu no Houteishiki điền vào)
    image: "/images/anhBia/HaChi.jpg",
    content: `
      <p>Khác với không khí ngột ngạt, u tối của <em>Phía sau nghi can X</em>, <strong>Phương trình hạ chí</strong> đưa chúng ta đến Hari Cove - một thị trấn biển rực rỡ nắng hè nhưng đang sục sôi vì tranh cãi khai thác tài nguyên.</p>
      
      <h3>Khi Giáo sư Vật lý ghét trẻ con phải trông trẻ</h3>
      <p>Điểm thú vị nhất của tác phẩm này không nằm ở thủ thuật gây án (vốn khá đơn giản), mà nằm ở sự phát triển nhân vật của Manabu Yukawa. Vị giáo sư vốn nổi tiếng lạnh lùng và "dị ứng" với trẻ con, nay lại trở thành người hướng dẫn bất đắc dĩ cho cậu bé Kyohei cô độc.</p>

      <img src="/images/anhMinhHoa/HaChi1.jpg" alt="Phương trình hạ chí">

      <p>Hình ảnh Yukawa dạy Kyohei bắn tên lửa nước hay nhìn ngắm đáy biển không chỉ là những bài học vật lý, mà là cách anh dạy cậu bé đối mặt với thế giới. Đó là sự dịu dàng hiếm hoi ẩn sau vẻ ngoài lý trí của "Galileo".</p>

      <h3>Công lý hay Sự lựa chọn?</h3>
      <p>Vụ án trong <em>Phương trình hạ chí</em> không có kẻ ác hoàn toàn. Nó là hệ quả của những nỗ lực tuyệt vọng để bảo vệ gia đình và những bí mật trong quá khứ. Câu hỏi lớn nhất mà cuốn sách đặt ra:</p>

      <blockquote>
        "Đôi khi, việc phơi bày sự thật có thực sự mang lại hạnh phúc, hay nó sẽ phá hủy cuộc đời của những người ở lại?"
      </blockquote>

      <p>Yukawa lần này không chỉ giải một phương trình vật lý, anh phải giải một "phương trình lòng người". Anh chọn cách xử lý nhân văn hơn, thấu hiểu hơn, nhưng cũng đầy day dứt.</p>
      <img src="/images/anhMinhHoa/HaChi2.jpg" alt="Phương trình hạ chí">
      <h3>Lời kết</h3>
      <p>Đây là một cuốn sách đẹp. Đẹp vì khung cảnh biển xanh nắng vàng, và đẹp vì tình người ấm áp. Một nốt trầm buồn nhưng lấp lánh trong series Thám tử Galileo.</p>
    `,
  },
  {
    id: 4,
    title: "Nếu ta chưa từng thấy thái dương: Khi bóng tối là nơi trú ẩn",
    date: "2025-12-08",
    category: "Review Phim",
    youtubeId: null, // Bạn có thể tìm trailer phim điền vào đây, hoặc để null để hiện ảnh bìa
    image: "/images/anhBia/NeuTaChuaTungThayThaiDuong.jpg",
    content: `
      <p><em>"Had I not seen the Sun / I could have borne the shade..." (Nếu ta chưa từng thấy thái dương / Ta đã có thể chịu đựng bóng tối).</em></p>
      <p>Tựa đề bộ phim được lấy trực tiếp từ những vần thơ khắc khoải của Emily Dickinson, và nó đã gói gọn hoàn hảo bi kịch của toàn bộ tác phẩm. Đây không phải là một bộ phim ồn ào, mà là một bản nhạc buồn được chơi chậm rãi trong ráng chiều.</p>
      
      <h3>Ánh sáng và Bóng tối</h3>
      <p>Đạo diễn đã sử dụng ngôn ngữ điện ảnh cực kỳ tinh tế khi xử lý ánh sáng. Trong nửa đầu phim, mọi khung hình đều ngập tràn nắng ấm, rực rỡ và đầy hy vọng. Đó là lúc nhân vật chính tìm thấy "thái dương" của đời mình.</p>

      <img src="/images/anhMinhHoa/NeuTaChuaTungThayThaiDuong.jpg" alt="NeuTaChuaTungThayThaiDuong1">

      <p>Nhưng chính vì sự rực rỡ đó, mà nửa sau của bộ phim – khi mặt trời tắt nắng – trở nên lạnh lẽo đến thấu xương. Sự tương phản gay gắt về màu sắc (Color Grading) giữa hai phần phim khiến người xem thực sự cảm nhận được nỗi đau mất mát.</p>

      <h3>Diễn xuất không lời</h3>
      <p>Không cần quá nhiều thoại, ánh mắt của nhân vật chính đã nói lên tất cả. Sự chuyển biến từ ánh mắt lấp lánh hy vọng sang sự trống rỗng vô hồn là điểm sáng chói lọi về mặt diễn xuất.</p>
       <img src="/images/anhMinhHoa/NeuTaChuaTungThayThaiDuong2.jpg" alt="NeuTaChuaTungThayThaiDuong2">
      <blockquote>
        "Thà chưa bao giờ biết đến hạnh phúc, còn hơn nếm trải nó để rồi bị tước đoạt vĩnh viễn."
      </blockquote>

      <h3>Lời kết</h3>
      <p><strong>Had I not seen the sun</strong> để lại một dư vị đắng chát. Bộ phim đặt ra câu hỏi muôn thuở: Liệu chúng ta có nên mạo hiểm bước ra ánh sáng để rồi có nguy cơ bị thiêu đốt, hay mãi mãi ẩn mình an toàn trong bóng tối? Một tác phẩm điện ảnh đẹp đến nao lòng nhưng cũng buồn đến xé lòng.</p>
    `,
  },
];
