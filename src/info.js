// demo
import { createElement, Component, render } from "rax";
import View from "rax-view";
import Text from "rax-text";
import BookService from "../services/Books";

// 将 item 定义成组件
const TITLE_NAME = "题名/责任人";
const PUBLISHER = "出版发行项";
const CONTENT = "内容简介";
const MORE_LINK = "更多";

class ListViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "0001315032",
      publisher: "",
      info: {}
    };
  }
  componentWillMount() {
    this._delUrl();
    this._getInfo();
  }
  _delUrl() {
    alert("query:" + window.location.href);
    let query = window.location.href.split("?")[1];
    let queryArr = query.split("&");
    alert("queryArr:" + queryArr);
    let id = queryArr[0].split("=")[1];
    let publisher = queryArr[1].split("=")[1];
    this.setState({
      id,
      publisher
    });
  }
  // 路由拉取单个书籍信息
  _getInfo() {
    let option = {};
    option.id = this.state.id;
    BookService.getSingeBookInfo(option).then(
      res => {
        alert(res);
        let info = res;
        // this.setState({ info });
        //alert(this.state.info);
      },
      err => {
        throw err;
      }
    );
  }

  render() {
    return (
      <View style={styles.App}>
        <View style={styles.detailContainner}>
          <View style={styles.title}>
            <h2> {TITLE_NAME}</h2>
            <p>
              {" "}
              {this.state.info.book}&nbsp;{this.state.info.author}
            </p>
          </View>
          <View style={styles.publisher}>
            <h2>{PUBLISHER}</h2>
            <p>{this.state.publisher}</p>
          </View>
          <View style={styles.content} />
          <h2>{CONTENT}</h2>
          <p>{this.state.info.intro}</p>
          <Link>{MORE_LINK}</Link>
        </View>
        <View style={styles.statusTab}>
          <table>
            <tr>
              <th>索书号</th>
              <th>馆藏地址</th>
              <th>书刊状态</th>
            </tr>
            {this.state.info.books.foreach((book, index) => {
              return (
                <tr>
                  <td>{book.tid}</td>
                  <td>{book.room}</td>
                  <td>
                    {book.status}-应还日期{book.status === "借出"
                      ? <br /> + book.date
                      : null}
                  </td>
                </tr>
              );
            })}
          </table>
        </View>
      </View>
    );
  }
}

const styles = {
  App: {
    backgroundColor: "black",
    // backgroundColor: "rgb(239,239,244)",
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
