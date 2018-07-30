// demo
import { createElement, Component, render } from "rax";
import View from "rax-view";
import Text from "rax-text";
import Link from "rax-link";
import BookService from "../services/Books";

// 将 item 定义成组件
const TITLE_NAME = "题名/责任人";
const PUBLISHER = "出版发行项";
const CONTENT = "内容简介";
const MORE_LINK = "更多";

let info = {
  bid: "I267/CWX6 ",
  book: "朝花夕拾",
  author: "从维熙著",
  intro: "1234564687",

  books: [
    {
      status: "保留本",
      room: "6F__中文图书阅览室(一)",
      bid: "I267/CWX6 ",
      tid: "T112852325",
      date: ""
    },
    {
      status: "可借",
      room: "2F__中文图书借阅室(一)",
      bid: "I267/CWX6 ",
      tid: "T112852326",
      date: ""
    },
    {
      status: "可借",
      room: "2F__中文图书借阅室(一)",
      bid: "I267/CWX6 ",
      tid: "T112852327",
      date: ""
    }
  ]
};
class ListViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "0001315032",
      publisher: "",
      info: info
    };
  }
  componentWillMount() {
    //this._delUrl();
    // this._getInfo();
  }
  _delUrl() {
    let query = window.location.href.split("?")[1];
    let queryArr = query.split("&");

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
        //alert(res);
        let info = res;
        this.setState({ info });
        //alert(this.state.info);
      },
      err => {
        throw err;
      }
    );
  }

  render() {
    console.log(this.state.info.books);
    return (
      <View style={styles.App}>
        <View style={styles.detail_containner}>
          <View style={styles.title}>
            <View style={styles.static_title}> {TITLE_NAME}</View>
            <View style={styles.details}>
              {this.state.info.book}&nbsp;{this.state.info.author}
            </View>
          </View>
          <View style={styles.publisher}>
            <View style={styles.static_title}>{PUBLISHER}</View>
            <View style={styles.details}>{this.state.publisher || "无"}</View>
          </View>
          <View style={styles.content} />
          <View style={styles.static_title}>{CONTENT}</View>
          <View style={styles.details}>{this.state.info.intro || "无"}</View>
          {/* {this.state.info.intro ? <Link style = {styles.link}>{MORE_LINK} </Link> : ""} */}
        </View>
        <View style={styles.statusTab}>
          <View style={styles.tr}>
            <View style={styles.th}>索书号</View>
            <View style={styles.th}>馆藏地址</View>
            <View style={styles.th}>书刊状态</View>
          </View>
          {this.state.info.books.map(book => {
            return (
              <View style={styles.tr}>
                <View style={styles.td}>{book.tid}</View>
                <View style={styles.td}>{book.room}</View>
                <View style={styles.td}>
                  {book.status}
                  {book.status === "借出"
                    ? "-应还日期" + <br /> + book.date
                    : null}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = {
  App: {
    paddingTop: 82,
    paddingLeft: 60,
    paddingRight: 60,
    backgroundColor: "rgb(239,239,244)"
    // flex:1,
    // display:'flex',
    // justifyContent:"center",
  },

  detail_containner: {
    // flex:1,
    backgroundColor: "rgb(239,239,244)",
    //  display:'flex',
    flexDirection: "column"
  },

  static_title: {
    color: "rgb(103,103,250)",
    fontSize: 30
  },
  details: {
    fontSize: 28,
    marginTop: 2,
    marginBottom: 38
  },

  statusTab: {
    //flex:2.5,
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    borderColor: "rgb(103,103,250)",
    fontSize: 28
  },
  // first_tr: {
  //   backgroundColor:"rgb(103,103,250)",

  //   display:'flex',
  //   flex:1,
  //   flexDirection:'row',
  //   justifyContent:"center",
  //   alignItem:'center'

  // },
  tr: {
    color: "rgb(67,67,67)",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItem: "center"
  },
  th: {
    height: 80,
    flex: 1,
    fontColor: "white",
    fontWeight: 600,
    backgroundColor: "rgb(103,103,250)",
    justifyContent: "center",
    borderStyle: "solid",
    borderColor: "rgb(103,103,250)",
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20
  },
  td: {
    borderStyle: "solid",
    borderColor: "rgb(103,103,250)",
    borderWidth: 2,
    justifyContent: "center",
    alignItem: "center",
    height: 120,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  }
};
export default ListViewDemo;
