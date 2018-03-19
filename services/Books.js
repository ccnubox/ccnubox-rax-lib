import request from  "../box-ui/util/request";

const BookService ={
    getMoney(option){
        return request({
            method:"GET",
            url:"/api/lib/search/?keyword="+option.keyword+"&page="+option.page
        })
    }
}
export default MoneyService;