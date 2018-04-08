// demo
import { createElement, Component, render } from "rax";
import View from "rax-view";
import Text from "rax-text";
import ListView from "rax-listview";
import Image from "rax-image";
import BookService from "../services/Books";
//const storage = require("@weex-module/storage");
let icon = {
  uri: "http://ocm66x3nz.bkt.clouddn.com/ios_ccnubox/book_icon.png"
};

// 将 item 定义成组件

class ListViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: [{}],
      keywords: "朝花夕拾",
      page: 1
    };
  }
  componentWillMount() {
    //  this._urlDeal();
    this._getBook();
  }
  //处理url，分解出参数
  // _urlDeal() {
  //   let param = window.location.href.split("&");
  //   let keywords = param[0].split("keywords=")[1];
  //   let page = param[1].split("page=")[1];
  //   this.setState({
  //     keywords,
  //     page
  //   });
  // }
  // 路由拉取书籍数据
  _getBook() {
    let option = {};
    option.page = this.state.page;
    option.keywords = this.state.keywords;
    BookService.getBook(option).then(
      res => {
        let data = res.result;
        //error!
        this.setState({ data });
      },
      err => {
        console.log(err);
        throw err;
      }
    );
  }
  // listLoading = () => {
  //   if (this.state.index < 4) {
  //     return (
  //       <View style={styles.loading}>
  //         <Text style={styles.text}>加载中...</Text>
  //       </View>
  //     );
  //   } else {
  //     return null;
  //   }
  // };
  listItem = (item, index) => {
    return (
      <View style={styles.book_content_containner}>
        <Image source={icon} style={styles.book_icon} />
        <Text style={styles.book_title}>{item.book}</Text>
        <Text style={styles.book_author}>
          {item.author} 著
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.publisher}
        </Text>
      </View>
    );
  };
  // handleLoadMore = () => {
  //   setTimeout(() => {
  //     this.state.index++;
  //     if (this.state.index < 5) {
  //       this.state.data.push(
  //         { name1: "loadmore 2" },
  //         { name1: "loadmore 3" },
  //         { name1: "loadmore 4" },
  //         { name1: "loadmore 5" },
  //         { name1: "loadmore 2" },
  //         { name1: "loadmore 3" },
  //         { name1: "loadmore 4" },
  //         { name1: "loadmore 5" }
  //       );
  //     }
  //     this.setState(this.state);
  //   }, 1000);
  // };

  render() {
    return (
      <View style={styles.App}>
        <View style={styles.awayTop} />
        <ListView
          renderFooter={this.listLoading}
          renderRow={this.listItem}
          dataSource={this.state.data}
          // onEndReached={this.handleLoadMore}
        />
      </View>
    );
  }
}

const styles = {
  App: {
    backgroundColor: "rgb(239,239,244)",
    width: 750,
    height: 1334,
    alignItems: "center"
  },
  awayTop: {
    width: 750,
    height: 18,
    backgroundColor: "rgb(239,239,244)"
  },
  book_content_containner: {
    backgroundColor: "rgb(255,255,255)",
    paddingTop: 41,
    paddingButtom: 41,
    paddingLeft: 45,
    marginTop: 20,
    height: 161,
    width: 750
  },

  book_icon: {
    position: "relative",
    top: 15,
    width: 60,
    height: 44
  },
  book_title: {
    fontSize: 30,
    marginLeft: 102,
    marginTop: -44,
    fontWeight: 800
  },
  book_author: {
    fontSize: 26,
    color: "rgb(174,174,178)",
    width: 500,
    whiteSpace: "noWrap",
    height: 30,
    marginTop: 15,
    marginLeft: 115,
    overflow: "hidden",
    textOverflow: "ellipsis"
  },

  text: {
    fontSize: 28,
    color: "#000000",
    fontSize: 28,
    padding: 40
  },
  item1: {
    height: 110,
    backgroundColor: "#909090",
    marginBottom: 3
  },
  item2: {
    height: 110,
    backgroundColor: "#e0e0e0",
    marginBottom: 3
  },
  loading: {
    padding: 50,
    textAlign: "center"
  }
};
export default ListViewDemo;
