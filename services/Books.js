import request from "../box-ui/util/request";

const BookService = {
  getBook(option) {
    option.page = option.page || 1;
    return request({
      method: "GET",
      url:
        "https://ccnubox.muxixyz.com/api/lib/search/?keyword=" +
        option.keyword +
        "&page=" +
        option.page
    });
  }
};
export default BookService;
