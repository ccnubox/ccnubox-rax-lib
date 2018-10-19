// demo
import { createElement, Component, render } from "rax";
import View from "rax-view";
import Text from "rax-text";
import ListView from "rax-listview";
import Image from "rax-image";
import BookService from "../services/Books";
import icon from "./assets/book_icon.png";
import emptyIcon from "./assets/blank3X.png";
import { parseSearchString } from "./box-ui/util";
const native = require("@weex-module/test");
import Touchable from "rax-touchable";

// TODO: 将 item 定义成组件
class ListViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      keywords: "",
      page: 1,
      noMore: false
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

    const keywords = qd.keyword[0];
    this.setState({
      keywords
    });
    this._getBook(keywords);
  }

  nav = id => {
    native.push(`ccnubox://lib.search.detail?id=${id}`);
  };

  // 路由拉取书籍数据
  _getBook(keywords) {
    let option = {};
    option.page = this.state.page;
    option.keywords = keywords || this.state.keywords;
    BookService.getBook(option).then(
      res => {
        native.reportInsightApiEvent("searchLib", "success", "null");
        let data = res.result;
        this.setState({ data });
        native.changeLoadingStatus(true);
      },
      err => {
        native.reportInsightApiEvent("searchLib", "error", JSON.stringify(err));
        alert("服务端错误");
        native.back();
      }
    );
  }
  listLoading = () => {
    return (
      <View style={styles.loading}>
        {this.state.noMore ? (
          <View>没有更多</View>
        ) : (
          <Text style={styles.text}>加载中...</Text>
        )}
      </View>
    );
  };
  listItem = (item, index) => {
    let title = `${item.book}`;
    return (
      <View
        style={[
          styles.book_content_containner,
          index === 0 ? styles.first_item : {}
        ]}
      >
        <Touchable
          onPress={() => {
            this.nav(item.id);
          }}
        >
          <View style={styles.book_item_container}>
            <View style={styles.icon_containner}>
              <Image source={icon} style={styles.book_icon} />
            </View>
            <View style={styles.book_info_containner}>
              <Text style={styles.book_title} numberOfLines={1}>
                {title}
              </Text>
              <View style={styles.book_owner_containner}>
                <Text style={styles.book_author} numberOfLines={1}>
                  {item.author}
                </Text>
                <Text
                  style={styles.book_publisher_containner}
                  numberOfLines={1}
                >
                  {item.publisher}
                </Text>
              </View>
            </View>
          </View>
        </Touchable>
      </View>
    );
  };
  handleLoadMore = () => {
    if (!this.state.noMore) {
      let page = ++this.state.page;
      this.setState({ page });
      let option = {};
      option.page = page;
      option.keywords = this.state.keywords;
      BookService.getBook(option).then((res, err) => {
        if (res) {
          if (res.result.length) {
            let data = this.state.data;
            res.result.forEach(element => {
              data.push(element);
            });

            this.setState({ data });
          } else {
            this.setState({ noMore: true });
          }
        }
        if (err) {
          this.setState({ noMore: true });
        }
      });
    }
  };

  render() {
    const isEmpty = this.state.data.length === 0;
    return (
      <View style={[styles.App, isEmpty ? styles.center : {}]}>
        {isEmpty ? (
          <View style={styles.empty}>
            <Image source={emptyIcon} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>未搜索到相关图书，换个姿势？</Text>
          </View>
        ) : (
          <ListView
            renderFooter={this.listLoading}
            renderRow={this.listItem}
            dataSource={this.state.data}
            onEndReached={this.handleLoadMore}
          />
        )}
      </View>
    );
  }
}

const styles = {
  empty: {
    marginTop: 154,
    alignItems: "center"
  },
  center: {
    alignItems: "center"
  },
  emptyText: {
    fontSize: 30,
    color: "#ccccff"
  },
  App: {
    backgroundColor: "#efeff4",
    flex: 1,
    display: "flex"
  },

  first_item: {
    marginTop: 40
  },

  book_item_container: {
    width: 630,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  last_item: {},

  book_content_containner: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 242,
    marginBottom: 20
  },
  icon_containner: {
    display: "flex",
    width: 90,
    height: 60,
    marginRight: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  book_icon: {
    width: 90,
    height: 60
  },
  book_info_containner: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "nowrap"
  },

  book_title: {
    color: "#434343",
    width: 400,
    fontSize: 30,
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: 35
  },
  book_owner_containner: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden"
  },

  book_author: {
    width: 200,
    fontSize: 28,
    flex: 1,
    color: "#434343",
    flexWrap: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  book_publisher_containner: {
    flex: 1,
    width: 200,
    textAlign: "right",
    fontSize: 28,
    color: "#434343",
    flexWrap: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};
export default ListViewDemo;
