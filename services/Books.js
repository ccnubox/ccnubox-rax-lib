import request from "../src/box-ui/util/request";

const BookService = {
  getBook(option) {
    option.page = option.page || 1;
    return request({
      method: "GET",
      url:
        "https://ccnubox.muxixyz.com/api/lib/search/?keyword=" +
        option.keywords +
        "&page=" +
        option.page
    });
  },
  getSingeBookInfo(option) {
    return request({
      method: "GET",
      url: "https://ccnubox.muxixyz.com/api/lib/detail/" + option.id + "/"
    });
  }
};
export default BookService;
