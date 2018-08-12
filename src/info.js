// demo
import { createElement, Component, render } from "rax";
import View from "rax-view";
import ScrollView from "rax-scrollview";
import Text from "rax-text";
const native = require("@weex-module/test");
import Touchable from "rax-touchable";
import BookService from "../services/Books";
import { parseSearchString } from "./box-ui/util";

// 将 item 定义成组件
const TITLE_NAME = "题名/责任人";
const PUBLISHER = "出版发行项";
const CONTENT = "内容简介";
const MORE_LINK = "更多";

let initialInfo = {
  bid: "",
  book: "",
  author: "",
  intro: "",
  books: []
};
class ListViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      publisher: "",
      info: initialInfo,
      displayFullIntro: false
    };
  }
  componentDidMount() {
    let qd;
    if (window.location.search) {
      qd = parseSearchString(window.location.search);
    }

    if (!qd) {
      alert("参数缺失错误");
    }

    const id = qd.id[0];
    this.setState({
      id
    });
    this._getInfo(id);
  }
  // 路由拉取单个书籍信息
  _getInfo(id) {
    let option = {};
    option.id = id || this.state.id;
    BookService.getSingeBookInfo(option).then(
      res => {
        let info = res;
        this.setState({ info });
        native.changeLoadingStatus(true);
      },
      err => {
        throw err;
      }
    );
  }

  toggleIntro = () => {
    this.setState({
      displayFullIntro: !this.state.displayFullIntro
    });
  };

  renderIntro = () => {
    if (this.state.info.intro === "")
      return (
        <View>
          <Text style={styles.details}>{"无"}</Text>
        </View>
      );
    if (this.state.info.intro.length > 100) {
      return (
        <View>
          <Text style={[styles.details, styles.intro_text]}>
            {this.state.displayFullIntro
              ? this.state.info.intro
              : this.state.info.intro.slice(0, 100)}
          </Text>
          <Touchable onPress={this.toggleIntro}>
            <Text style={styles.more}>
              {this.state.displayFullIntro ? "收起" : "更多"}
            </Text>
          </Touchable>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.details}>{this.state.info.intro}</Text>
        </View>
      );
    }
  };

  render() {
    let booksList;
    const booksListData = this.state.info.books;
    if (booksListData.length) {
      booksList = (
        <View style={styles.statusTab}>
          <View style={styles.tr}>
            <Text style={[styles.th, styles.tr_id]}>索书号</Text>
            <Text style={[styles.th, styles.tr_address]}>馆藏地址</Text>
            <Text style={[styles.th, styles.tr_status]}>书刊状态</Text>
          </View>
          {booksListData.map(book => {
            return (
              <View style={styles.tr}>
                <View style={styles.td}>
                  <Text style={styles.td_text}>{book.tid}</Text>
                </View>
                <View style={styles.td}>
                  <Text style={styles.td_text}>{book.room}</Text>
                </View>
                <View style={styles.td}>
                  <Text
                    style={[
                      styles.td_text,
                      book.status === "可借" ? styles.td_text_highlight : {}
                    ]}
                  >
                    {book.status +
                      (book.status === "借出"
                        ? "-应还日期" + <br /> + book.date
                        : "")}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      );
    } else {
      booksList = <Text style={styles.emptyTip}>{this.state.info.bid}</Text>;
    }

    return (
      <View style={styles.App}>
        <ScrollView
          style={[
            {
              height: screen.height,
              display: "flex",
              alignItems: "center"
            }
          ]}
        >
          <View style={styles.detail_containner}>
            <View style={styles.title}>
              <Text style={styles.static_title}> {TITLE_NAME}</Text>
              <Text style={styles.details}>
                {this.state.info.book}&nbsp;{this.state.info.author}
              </Text>
            </View>
            <View style={styles.publisher}>
              <Text style={styles.static_title}>{PUBLISHER}</Text>
              <Text style={styles.details}>{this.state.publisher || "无"}</Text>
            </View>
            <View style={styles.content} />
            <Text style={styles.static_title}>{CONTENT}</Text>
            <View style={styles.details}>{this.renderIntro()}</View>
          </View>
          {booksList}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  App: {
    backgroundColor: "rgb(239,239,244)",
    flex: 1,
    display: "flex"
  },

  detail_containner: {
    width: 630,
    paddingTop: 82,
    justifyContent: "center",
    display: "flex"
  },

  more: {
    fontSize: 28,
    color: "#6767fa",
    textAlign: "right",
    marginTop: -45,
    paddingRight: 5
  },

  static_title: {
    color: "#6767fa",
    fontSize: 28
  },
  details: {
    fontSize: 28,
    color: "#434343",
    marginTop: 2,
    marginBottom: 38
  },

  intro_text: {
    marginBottom: 0
  },

  statusTab: {
    width: 630,
    marginTop: 16,
    display: "flex",
    borderColor: "rgb(103,103,250)",
    fontSize: 28
  },
  emptyTip: {
    fontSize: 28,
    color: "#434343"
  },
  tr_id: {
    width: 140
  },
  tr_address: {
    width: 250
  },
  tr_status: {
    width: 240
  },
  tr: {
    width: 630,
    height: 80,
    color: "rgb(67,67,67)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  th: {
    height: 80,
    lineHeight: 80,
    textAlign: "center",
    color: "white",
    fontSize: 28,
    backgroundColor: "rgb(103,103,250)"
  },
  td: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: 120,
    flex: 1,
    paddingLeft: 10
  },
  td_text: {
    color: "#434343",
    textAlign: "left",
    fontSize: 20
  },
  td_text_highlight: {
    color: "#feb75a"
  }
};
export default ListViewDemo;
