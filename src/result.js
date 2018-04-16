// demo
import { createElement, Component, render } from "rax";
import View from "rax-view";
import Text from "rax-text";
import ListView from "rax-listview";
import Image from "rax-image";
import BookService from "../services/Books";
import Link from "rax-link";
//import setStateAsync from './common/common'
//alert(setStateAsync)
let icon = {
  uri: "http://ocm66x3nz.bkt.clouddn.com/ios_ccnubox/book_icon.png"
};

// 将 item 定义成组件
class ListViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      keywords: "",
      page: 1
    };
  }
  componentWillMount() {
    this._urlDeal();
  }
  componentDidMount() {
    this._getBook();
  }
  //处理url，分解出参数
  _urlDeal() {
    let param = decodeURI(window.location.href).split("&");
    let keywords = param[0].split("keywords=")[1];
    let page = param[1].split("page=")[1];
    this.setState({
      keywords,
      page
    });
  }
  // 路由拉取书籍数据
  _getBook() {
    let data = 1;
    let option = {};
    option.page = this.state.page;
    option.keywords = this.state.keywords;
    BookService.getBook(option).then(
      res => {
        // alert(this.state)
        this.setState(
          {
            data: res.result
          },
          r => {
            alert(r);
          }
        );
        alert(this.state.data);
        // alert(data)
      },
      err => {
        throw err;
      }
    );
  }
  listLoading = () => {
    return (
      <View style={styles.loading}>
        <Text style={styles.text}>加载中...</Text>
      </View>
    );
  };
  listItem = (item, index) => {
    return (
      <Link
        style={styles.book_content_containner}
        href={
          "./third.bundle.js/?id=" + item.id + "&publisher=" + item.publisher
        }
      >
        <Image source={icon} style={styles.book_icon} />
        <Text style={styles.book_title}>{item.book}</Text>
        <Text style={styles.book_author}>
          {item.author} 著
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.publisher}
        </Text>
      </Link>
    );
  };
  handleLoadMore = () => {
    setTimeout(() => {
      let page = this.state.page++;
      this.setState({ page });
      this._getBook();
    }, 1000);
  };

  render() {
    return (
      <View style={styles.App}>
        <View style={styles.awayTop}>{this.state.data}</View>
        <ListView
          renderFooter={this.listLoading}
          renderRow={this.listItem}
          dataSource={this.state.data}
          onEndReached={this.handleLoadMore}
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
